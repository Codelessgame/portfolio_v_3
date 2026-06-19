import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener, inject, computed, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../translation.service';
import timelineData from './timeline.json';

interface PersonalActivity {
  id: string;
  label: string;
  icon: string;
  description: string;
  color: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  startDateLabel: string;
  endDateLabel: string;
  startPercent?: number;
  endPercent?: number;
}

interface TimelineItem {
  type: 'work' | 'education';
  title: string;
  subtitle: string;
  date: string;
  icon: string;
  bullets: string[];
  startYear: number;
  startMonth: number;
  personalActivity?: {
    label: string;
    icon: string;
    description: string;
    color: string;
    startDateLabel: string;
    endDateLabel: string;
  };
}

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, MatIconModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline implements OnInit, AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private pendingTimeouts: ReturnType<typeof setTimeout>[] = [];
  private scrollHandler: (() => void) | null = null;
  private destroyed = false;

  activeActivityIndex: number | null = null;
  hoveredIndex: number | null = null;
  isDesktop = false;
  maxActivities = 3;

  private ts = inject(TranslationService);
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  currentLang = this.ts.currentLang;

  t(key: string): string {
    return this.ts.t()(key);
  }

  personalActivities = computed<PersonalActivity[]>(() => {
    const lang = this.currentLang();
    const list = timelineData.personalActivities.map(act => ({
      id: act.id,
      label: lang === 'en' ? act.label_en : act.label_cs,
      icon: act.icon,
      description: lang === 'en' ? act.desc_en : act.desc_cs,
      color: act.color,
      startYear: act.startYear,
      startMonth: act.startMonth,
      endYear: act.endYear,
      endMonth: act.endMonth,
      startDateLabel: lang === 'en' ? act.startDateLabel_en : act.startDateLabel_cs,
      endDateLabel: lang === 'en' ? act.endDateLabel_en : act.endDateLabel_cs
    } as PersonalActivity));

    // Compute relative vertical percentages
    list.forEach(act => {
      act.startPercent = this.getPercentFromTop(act.startYear, act.startMonth);
      act.endPercent = this.getPercentFromTop(act.endYear, act.endMonth);
    });

    return list;
  });

  timelineItems = computed<TimelineItem[]>(() => {
    const lang = this.currentLang();
    const activities = this.personalActivities();

    const mapped = timelineData.timelineItems.map(item => {
      const personalActivity = item.personalActivityId
        ? activities.find(a => a.id === item.personalActivityId)
        : undefined;

      return {
        type: item.type as 'work' | 'education',
        title: lang === 'en' ? item.title_en : item.title_cs,
        subtitle: lang === 'en' ? item.subtitle_en : item.subtitle_cs,
        date: lang === 'en' ? item.date_en : item.date_cs,
        icon: item.icon,
        bullets: lang === 'en' ? item.bullets_en : item.bullets_cs,
        startYear: item.startYear || 0,
        startMonth: item.startMonth || 0,
        personalActivity: personalActivity ? {
          label: personalActivity.label,
          icon: personalActivity.icon,
          description: personalActivity.description,
          color: personalActivity.color,
          startDateLabel: personalActivity.startDateLabel,
          endDateLabel: personalActivity.endDateLabel
        } : undefined
      } as TimelineItem;
    });

    // Sort reverse-chronologically (newest first)
    return mapped.sort((a, b) => {
      const aVal = a.startYear * 12 + a.startMonth;
      const bVal = b.startYear * 12 + b.startMonth;
      return bVal - aVal;
    });
  });

  activityLines: Array<{ index: number; horizontalPath: string; verticalPath: string; color: string }> = [];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth > 768;
    }
  }

  getPercentFromTop(year: number, month: number): number {
    const startYear = 2013;
    const startMonth = 9; // Sept 2013
    const totalMonths = 156; // Sept 2013 to Sept 2026

    const currentMonths = (year - startYear) * 12 + (month - startMonth);
    const clamped = Math.max(0, Math.min(totalMonths, currentMonths));
    return 100 - (clamped / totalMonths) * 100;
  }

  toggleActivity(index: number) {
    if (this.activeActivityIndex === index) {
      this.activeActivityIndex = null;
    } else {
      this.activeActivityIndex = index;
    }
    // Re-draw lines to align with dynamic card states if active state changes sizes
    this.scheduleUpdateLines(100);
  }

  scrollToStart(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const startEl = document.getElementById(`activity-start-${index}`);
    if (startEl) {
      startEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.activeActivityIndex = index;
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth > 768;
      this.scheduleUpdateLines(100);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Observer for main timeline cards animation
      this.observer = new IntersectionObserver((entries) => {
        let hasIntersected = false;
        entries.forEach(entry => {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add('active');
            hasIntersected = true;
          }
        });
        if (hasIntersected) {
          this.scheduleUpdateLines(50);
          this.scheduleUpdateLines(400);
        }
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      });

      const items = this.el.nativeElement.querySelectorAll('.timeline-item');
      items.forEach((item: Element) => this.observer?.observe(item));

      // Activate items already scrolled past & draw lines — run outside Angular
      // to avoid NG0100. We schedule the first view update for after hydration.
      this.zone.runOutsideAngular(() => {
        this.activateScrolledPastItems();

        // Register scroll listener outside Angular zone to avoid triggering
        // change detection on every scroll event
        this.scrollHandler = () => {
          if (!this.destroyed) {
            this.activateScrolledPastItems();
          }
        };
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
      });

      // Schedule line calculations after DOM stabilizes, outside Angular zone.
      // The final one runs inside the zone to trigger a single CD cycle.
      this.scheduleUpdateLines(100);
      this.scheduleUpdateLines(300);
      this.scheduleUpdateLines(600);
      this.scheduleUpdateLines(1200);
    }
  }

  /** Activate items whose top is above the bottom of the viewport.
   *  Pure DOM manipulation (classList.add) — no Angular bindings touched. */
  private activateScrolledPastItems() {
    const items = this.el.nativeElement.querySelectorAll('.timeline-item');
    const viewportHeight = window.innerHeight;
    items.forEach((item: Element) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < viewportHeight - 100) {
        item.classList.add('active');
      }
    });
  }

  /** Schedule an updateLines call. Runs outside Angular zone, then
   *  enters the zone only if lines actually changed. */
  private scheduleUpdateLines(delayMs: number) {
    const id = setTimeout(() => {
      if (this.destroyed) return;
      this.updateLines();
    }, delayMs);
    this.pendingTimeouts.push(id);
  }

  updateLines() {
    if (!isPlatformBrowser(this.platformId) || !this.isDesktop) return;

    const container = this.el.nativeElement.querySelector('.timeline-container');
    if (!container) return;

    // The central vertical line is absolute positioned at left: 40px, width: 3px
    // Center point of this vertical line is 41.5px from container's left edge
    const centerX = 41.5;

    const newLines = this.personalActivities().slice(0, this.maxActivities).map((act, idx) => {
      const startEl = document.getElementById(`activity-start-${idx}`);
      const endEl = document.getElementById(`activity-end-${idx}`);
      if (!startEl || !endEl) return null;

      // Right edge of the start bubble relative to the container
      const startX = startEl.offsetLeft + startEl.offsetWidth;
      const startY = startEl.offsetTop;

      // Left edge of the end dot relative to the container (accounting for translateX(-50%))
      const endX = endEl.offsetLeft - endEl.offsetWidth / 2;
      const endY = endEl.offsetTop;

      // Path layout: Starts at startX,startY -> horizontally to centerX, then jumps (Move) to centerX,endY -> horizontally to endX
      const horizontalPath = `M ${startX} ${startY} H ${centerX} M ${centerX} ${endY} H ${endX}`;
      const verticalPath = `M ${centerX} ${startY} V ${endY}`;

      return {
        index: idx,
        horizontalPath,
        verticalPath,
        color: act.color
      };
    }).filter(line => line !== null) as any[];

    // Only update the binding (and trigger CD) if the paths actually changed
    const oldSerialized = JSON.stringify(this.activityLines);
    const newSerialized = JSON.stringify(newLines);
    if (oldSerialized !== newSerialized) {
      this.zone.run(() => {
        this.activityLines = newLines;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    this.destroyed = true;

    // Clear all pending timeouts
    this.pendingTimeouts.forEach(id => clearTimeout(id));
    this.pendingTimeouts = [];

    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Remove scroll listener
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
  }
}
