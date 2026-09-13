import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges, signal, inject, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Star } from './star/star';
import { TranslationService } from '../translation.service';
import { LibraryNavigationService } from '../library-navigation.service';
import { HomeNavigationService } from '../home-navigation.service';

const letters = "AÁBCČDĎEÉĚFGHIÍJKLMNŇOÓPQRŘSŠTŤUÚŮVWXYZŽ0123456789";

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, Star],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnChanges, OnInit, OnDestroy {
  @Input() value: string = '';
  currentValue = signal('');
  stars = Array.from({ length: 6 });
  interval: any;

  private ts = inject(TranslationService);
  private router = inject(Router);
  private libraryNav = inject(LibraryNavigationService);
  private homeNav = inject(HomeNavigationService);
  currentLang = this.ts.currentLang;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.updateStarCount();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateStarCount();
  }

  navigateToHome() {
    const currentUrl = this.router.url.split('?')[0].split('#')[0].replace(/\/$/, '');
    const isHome = currentUrl === '' || currentUrl === '/';
    if (isHome) {
      this.homeNav.triggerScrollToHome();
    } else {
      this.homeNav.requestScrollToLastPosition();
      this.router.navigate(['/']);
    }
  }

  navigateToLibrary() {
    const currentUrl = this.router.url.split('?')[0].split('#')[0].replace(/\/$/, '');
    if (currentUrl === '' || currentUrl === '/') {
      if (isPlatformBrowser(this.platformId)) {
        const pos = window.pageYOffset || document.documentElement.scrollTop || 0;
        this.homeNav.setLastHomeScrollPosition(pos);
      }
    }
    if (currentUrl === '/projects') {
      this.libraryNav.triggerScrollToSearch();
    } else {
      this.libraryNav.requestScrollToSearch();
      this.router.navigate(['/projects'], { state: { scrollToSearch: true } });
    }
  }

  private updateStarCount() {
    if (isPlatformBrowser(this.platformId)) {
      const w = window.innerWidth;
      let count = 6;
      if (w < 600) count = 3;
      else if (w < 900) count = 4;
      if (this.stars.length !== count) {
        this.stars = Array.from({ length: count });
      }
    }
  }

  t(key: string): string {
    return this.ts.t()(key);
  }

  toggleLanguage() {
    this.ts.toggleLanguage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('value')) {
      this.currentValue.set(this.value);
    }
  }

  startAnimation() {
    clearInterval(this.interval)

    this.currentValue.set(this.value);
    let iteration = 0

    this.interval = setInterval(() => {
      const nextVal = this.value
        .split("")
        .map((char, index) =>
          index >= iteration
            ? letters[Math.floor(Math.random() * letters.length)]
            : char
        )
        .join("");
      
      this.currentValue.set(nextVal);

      if (iteration >= this.value.length) {
        clearInterval(this.interval)
      }

      iteration += 1 / 3;
    }, 28);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}