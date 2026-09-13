import { Component, inject, computed, AfterViewInit, OnDestroy, HostListener, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SplitSection } from '../split-section/split-section';
import { SkillsNetwork } from '../skills-network/skills-network';
import { FeaturedCards } from '../featured-cards/featured-cards';
import { Timeline } from '../timeline/timeline';
import { TranslationService } from '../translation.service';
import { HomeNavigationService } from '../home-navigation.service';
import aboutParagraphs from './about.json';

@Component({
  selector: 'app-home',
  imports: [SplitSection, SkillsNetwork, FeaturedCards, Timeline],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit, OnDestroy {
  private ts = inject(TranslationService);
  private homeNav = inject(HomeNavigationService);

  private viewInitialized = false;
  private isAnimating = false;
  private activeAnimationId: number | null = null;
  private isDestroying = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Watch for clicks on "Home" nav link while already on the Home page
    effect(() => {
      const trigger = this.homeNav.scrollToHomeTrigger();
      if (trigger > 0 && this.viewInitialized) {
        this.performScrollAnimationFromTop();
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId) || this.isAnimating || this.isDestroying || this.homeNav.isLeavingHome) {
      return;
    }
    const pos = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.homeNav.setLastHomeScrollPosition(pos);
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    if (isPlatformBrowser(this.platformId)) {
      const shouldScroll = this.homeNav.consumeScrollRequest();
      if (shouldScroll) {
        setTimeout(() => {
          this.performScrollAnimationFromTop();
        }, 80);
      }
    }
  }

  performScrollAnimationFromTop() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.cancelActiveScrollAnimation();

    const lastPos = this.homeNav.getLastHomeScrollPosition();
    const targetY = (lastPos && lastPos > 50) ? Math.round(lastPos) : 0;

    // 1. Immediately reset viewport to the very top landing section
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // If target is top 0 (no position saved or user was at the landing section), stay at top
    if (targetY <= 10) {
      return;
    }

    // Honor user preference for reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, targetY);
      document.documentElement.scrollTop = targetY;
      document.body.scrollTop = targetY;
      return;
    }

    // 2. Allow layout to settle, then smoothly glide down from 0 to the remembered position in 800ms
    setTimeout(() => {
      this.animateScroll(0, targetY, 800);
    }, 100);
  }

  private cancelActiveScrollAnimation() {
    if (this.activeAnimationId !== null) {
      cancelAnimationFrame(this.activeAnimationId);
      this.activeAnimationId = null;
    }
    this.isAnimating = false;
  }

  private animateScroll(startY: number, targetY: number, duration: number) {
    this.cancelActiveScrollAnimation();

    const distance = targetY - startY;
    if (Math.abs(distance) < 5) return;

    this.isAnimating = true;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeInOutCubic curve
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const newY = Math.round(startY + distance * ease);
      window.scrollTo(0, newY);
      document.documentElement.scrollTop = newY;
      document.body.scrollTop = newY;

      if (progress < 1) {
        this.activeAnimationId = requestAnimationFrame(step);
      } else {
        this.activeAnimationId = null;
        window.scrollTo(0, targetY);
        document.documentElement.scrollTop = targetY;
        document.body.scrollTop = targetY;
        this.isAnimating = false;
      }
    };

    this.activeAnimationId = requestAnimationFrame(step);
  }

  t(key: string): string {
    return this.ts.t()(key);
  }

  paragraphs = computed<string[]>(() => {
    const lang = this.ts.currentLang();
    return aboutParagraphs.map(p => lang === 'en' ? p.en : p.cs);
  });

  ngOnDestroy() {
    this.isDestroying = true;
    this.cancelActiveScrollAnimation();
  }
}
