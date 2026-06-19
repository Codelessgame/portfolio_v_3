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
  personalActivities: PersonalActivity[];
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
  activeActivityId: string | null = null;
  hoveredIndex: number | null = null;
  isDesktop = false;
  maxActivities = 5;

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

    // Map the basic properties of all items
    const mapped = timelineData.timelineItems.map(item => {
      return {
        type: item.type as 'work' | 'education',
        title: lang === 'en' ? item.title_en : item.title_cs,
        subtitle: lang === 'en' ? item.subtitle_en : item.subtitle_cs,
        date: lang === 'en' ? item.date_en : item.date_cs,
        icon: item.icon,
        bullets: lang === 'en' ? item.bullets_en : item.bullets_cs,
        startYear: item.startYear || 0,
        startMonth: item.startMonth || 0,
        personalActivities: []
      } as TimelineItem;
    });

    // Helper to get raw dates from original timelineItems configuration
    activities.forEach(act => {
      const actStart = act.startYear * 12 + act.startMonth;
      
      const candidates = mapped.map((item, idx) => ({
        item,
        rawStart: (timelineData.timelineItems[idx].startYear || 0) * 12 + (timelineData.timelineItems[idx].startMonth || 0),
        rawEnd: (timelineData.timelineItems[idx].endYear || 2026) * 12 + (timelineData.timelineItems[idx].endMonth || 6)
      })).filter(c => actStart >= c.rawStart && actStart <= c.rawEnd);

      if (candidates.length > 0) {
        // Pick best candidate: 'work' takes precedence over 'education'
        let bestCandidate = candidates[0];
        for (const cand of candidates) {
          if (cand.item.type === 'work' && bestCandidate.item.type === 'education') {
            bestCandidate = cand;
          }
        }
        bestCandidate.item.personalActivities.push(act);
      }
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

  toggleActivity(index: number, activityId?: string) {
    if (this.activeActivityIndex === index && (!activityId || this.activeActivityId === activityId)) {
      this.activeActivityIndex = null;
      this.activeActivityId = null;
    } else {
      this.activeActivityIndex = index;
      this.activeActivityId = activityId || null;
    }
    // Re-draw lines to align with dynamic card states if active state changes sizes
    this.scheduleUpdateLines(100);
  }

  scrollToStart(index: number, activityId?: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const startEl = document.getElementById(`activity-start-${index}`);
    if (startEl) {
      startEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.activeActivityIndex = index;
      this.activeActivityId = activityId || null;
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

    // Reset styles to defaults first so we get clean, unadjusted offsets
    this.personalActivities().forEach((act, idx) => {
      const startEl = document.getElementById(`activity-start-${idx}`);
      const endEl = document.getElementById(`activity-end-${idx}`);
      if (startEl) startEl.style.top = `${act.startPercent}%`;
      if (endEl) endEl.style.top = `${act.endPercent}%`;
    });

    const activitiesCount = this.personalActivities().length;

    // Adjust start bubbles to avoid overlap in pixels
    const bubbles = Array.from({ length: activitiesCount }, (_, idx) => document.getElementById(`activity-start-${idx}`))
      .filter(el => el !== null) as HTMLElement[];
    
    // Sort bubbles by offsetTop ascending
    bubbles.sort((a, b) => a.offsetTop - b.offsetTop);

    const minBubbleGap = 42; // Bubble height (~36px) + 6px gap
    for (let i = 1; i < bubbles.length; i++) {
      const prev = bubbles[i - 1];
      const curr = bubbles[i];
      if (curr.offsetTop - prev.offsetTop < minBubbleGap) {
        curr.style.top = `${prev.offsetTop + minBubbleGap}px`;
      }
    }

    // Adjust end dots to avoid overlap in pixels
    const dots = Array.from({ length: activitiesCount }, (_, idx) => document.getElementById(`activity-end-${idx}`))
      .filter(el => el !== null) as HTMLElement[];

    // Sort dots by offsetTop ascending
    dots.sort((a, b) => a.offsetTop - b.offsetTop);

    const minDotGap = 28; // Dot height (~24px) + 4px gap
    for (let i = 1; i < dots.length; i++) {
      const prev = dots[i - 1];
      const curr = dots[i];
      if (curr.offsetTop - prev.offsetTop < minDotGap) {
        curr.style.top = `${prev.offsetTop + minDotGap}px`;
      }
    }

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

      const isSameHeight = (act.startYear === act.endYear && act.startMonth === act.endMonth) || 
                           Math.abs(startEl.offsetTop - endEl.offsetTop) < 2;

      let endX: number;
      let horizontalPath: string;
      let verticalPath: string;

      const endY = endEl.offsetTop;

      if (isSameHeight) {
        endEl.style.left = '41.5px';
        endX = centerX;
        horizontalPath = `M ${startX} ${startY} H ${centerX}`;
        verticalPath = '';
      } else {
        endEl.style.left = '20px';
        endX = 20;
        horizontalPath = `M ${startX} ${startY} H ${centerX} M ${centerX} ${endY} H ${endX}`;
        verticalPath = `M ${centerX} ${startY} V ${endY}`;
      }

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
