import { Component, inject, computed, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../translation.service';
import timelineData from './timeline.json';

export interface RoadmapItem {
  id: string;
  type: 'education' | 'work' | 'activity';
  title: string;
  subtitle: string;
  date: string;
  icon: string;
  color: string;
  status: 'upcoming' | 'ongoing' | 'finished';
  tags: string[];
  bullets: string[];
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  lane: number;
  leftPercent: number;
  widthPercent: number;
  fitsInPill: boolean;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline implements AfterViewInit {
  private ts = inject(TranslationService);
  currentLang = this.ts.currentLang;

  @ViewChild('roadmapScroll') roadmapScrollRef?: ElementRef<HTMLDivElement>;

  // Scale covers from Primary School start (Sept 2013) to University Graduation (July 2030)
  readonly scaleMin = 2013.7;
  readonly scaleMax = 2030.0;
  readonly canvasPixelWidth = 3500;

  // Year markers to display along the horizontal axis
  readonly yearMarkers = [
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030
  ];

  // Quarterly markers for the high-resolution dense era (Q1 represented by the year label)
  readonly quarterMarkers = [
    { year: 2025, month: 4, label: 'Q2' },
    { year: 2025, month: 7, label: 'Q3' },
    { year: 2025, month: 10, label: 'Q4' },
    { year: 2026, month: 4, label: 'Q2' },
    { year: 2026, month: 7, label: 'Q3' },
    { year: 2026, month: 10, label: 'Q4' },
  ];

  // Card display controls: show all cards by default, highlight and jump on pill click
  showAllCards = signal<boolean>(true);
  activeCardId = signal<string>('fontys');

  // Tip badge state
  hasScrolled = signal<boolean>(false);
  isFading = signal<boolean>(false);
  private autoDismissTimer?: ReturnType<typeof setTimeout>;
  private hoverDismissTimer?: ReturnType<typeof setTimeout>;

  t(key: string): string {
    return this.ts.t()(key);
  }

  // Piece-wise continuous virtual scale granting ~3.2x resolution to the dense 2024.5–2027 era
  private readonly totalVirtualUnits = 23.9;

  private getVirtualUnits(t: number): number {
    if (t <= 2013.7) return 0;
    if (t <= 2022.0) return (t - 2013.7) * 1.0;
    if (t <= 2024.5) return 8.3 + (t - 2022.0) * 1.6;
    if (t <= 2027.0) return 12.3 + (t - 2024.5) * 3.2;
    if (t <= 2030.0) return 20.3 + (t - 2027.0) * 1.2;
    return 23.9;
  }

  // Calculate left offset percentage for a date
  calcLeft(year: number, month: number): number {
    const t = year + (month - 1) / 12;
    return (this.getVirtualUnits(t) / this.totalVirtualUnits) * 100;
  }

  // Calculate width percentage for a date range
  calcWidth(startYear: number, startMonth: number, endYear: number, endMonth: number): number {
    const startT = startYear + (startMonth - 1) / 12;
    const endT = endYear + endMonth / 12;
    const startPct = (this.getVirtualUnits(startT) / this.totalVirtualUnits) * 100;
    const endPct = (this.getVirtualUnits(endT) / this.totalVirtualUnits) * 100;
    return Math.max(0.9, endPct - startPct);
  }

  // Check whether the title string fits fully inside the pill width
  calcFitsInPill(title: string, startYear: number, startMonth: number, endYear: number, endMonth: number): boolean {
    const widthPct = this.calcWidth(startYear, startMonth, endYear, endMonth);
    const widthPx = (widthPct / 100) * this.canvasPixelWidth;
    const estimatedNeededPx = (title.length * 8.5) + 24;
    return widthPx >= estimatedNeededPx;
  }

  // "Now" vertical indicator line percentage (September 2026)
  nowPercent = computed(() => {
    return this.calcLeft(2026, 9);
  });

  // Education Track Items (Row 1)
  educationItems = computed<RoadmapItem[]>(() => {
    const lang = this.currentLang();
    return timelineData.timelineItems
      .filter(item => item.type === 'education')
      .map(item => {
        const title = lang === 'en' ? item.title_en : item.title_cs;
        return {
          id: item.id,
          type: 'education',
          title,
          subtitle: lang === 'en' ? item.subtitle_en : item.subtitle_cs,
          date: lang === 'en' ? item.date_en : item.date_cs,
          icon: item.icon,
          color: item.color || '#1bc198',
          status: (item.status || (item.ongoing ? 'ongoing' : 'finished')) as 'upcoming' | 'ongoing' | 'finished',
          tags: item.tags || [],
          bullets: lang === 'en' ? item.bullets_en : item.bullets_cs,
          startYear: item.startYear,
          startMonth: item.startMonth,
          endYear: item.endYear,
          endMonth: item.endMonth,
          lane: 0,
          leftPercent: this.calcLeft(item.startYear, item.startMonth),
          widthPercent: this.calcWidth(item.startYear, item.startMonth, item.endYear, item.endMonth),
          fitsInPill: this.calcFitsInPill(title, item.startYear, item.startMonth, item.endYear, item.endMonth)
        };
      });
  });

  // Work Track Items (Row 2)
  workItems = computed<RoadmapItem[]>(() => {
    const lang = this.currentLang();
    return timelineData.timelineItems
      .filter(item => item.type === 'work')
      .map(item => {
        const title = lang === 'en' ? item.title_en : item.title_cs;
        return {
          id: item.id,
          type: 'work',
          title,
          subtitle: lang === 'en' ? item.subtitle_en : item.subtitle_cs,
          date: lang === 'en' ? item.date_en : item.date_cs,
          icon: item.icon,
          color: item.color || '#3a86ff',
          status: (item.status || 'finished') as 'upcoming' | 'ongoing' | 'finished',
          tags: item.tags || [],
          bullets: lang === 'en' ? item.bullets_en : item.bullets_cs,
          startYear: item.startYear,
          startMonth: item.startMonth,
          endYear: item.endYear,
          endMonth: item.endMonth,
          lane: 0,
          leftPercent: this.calcLeft(item.startYear, item.startMonth),
          widthPercent: this.calcWidth(item.startYear, item.startMonth, item.endYear, item.endMonth),
          fitsInPill: this.calcFitsInPill(title, item.startYear, item.startMonth, item.endYear, item.endMonth)
        };
      });
  });

  // Extracurricular / Clubs / Sports Items (Row 3+)
  activityItems = computed<RoadmapItem[]>(() => {
    const lang = this.currentLang();
    return timelineData.personalActivities.map(act => {
      const title = lang === 'en' ? act.label_en : act.label_cs;
      return {
        id: act.id,
        type: 'activity',
        title,
        subtitle: lang === 'en' ? 'Extracurricular & Projects' : 'Mimoškolní aktivity a projekty',
        date: (lang === 'en' ? act.startDateLabel_en : act.startDateLabel_cs) + ' – ' + (lang === 'en' ? act.endDateLabel_en : act.endDateLabel_cs),
        icon: act.icon,
        color: act.color,
        status: (act.status || 'finished') as 'upcoming' | 'ongoing' | 'finished',
        tags: act.tags || [],
        bullets: [lang === 'en' ? act.desc_en : act.desc_cs],
        startYear: act.startYear,
        startMonth: act.startMonth,
        endYear: act.endYear,
        endMonth: act.endMonth,
        lane: act.lane ?? 0,
        leftPercent: this.calcLeft(act.startYear, act.startMonth),
        widthPercent: this.calcWidth(act.startYear, act.startMonth, act.endYear, act.endMonth),
        fitsInPill: this.calcFitsInPill(title, act.startYear, act.startMonth, act.endYear, act.endMonth)
      };
    });
  });

  // All Items Combined: Education on top, Work second, Extracurriculars third
  allItems = computed<RoadmapItem[]>(() => {
    return [
      ...this.educationItems(),
      ...this.workItems(),
      ...this.activityItems()
    ];
  });

  // Displayed items depending on view mode (all or single focused)
  displayedItems = computed<RoadmapItem[]>(() => {
    if (this.showAllCards()) {
      return this.allItems();
    }
    const current = this.allItems().find(item => item.id === this.activeCardId());
    return current ? [current] : [this.allItems()[0]];
  });

  isActive(id: string): boolean {
    return this.activeCardId() === id;
  }

  // Handle pill click: update active selection and smoothly scroll to the card
  selectPill(id: string) {
    this.activeCardId.set(id);
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById('card-' + id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 60);
    }
  }

  // Toggle between showing all cards and focusing single card
  toggleShowAll() {
    this.showAllCards.update(show => !show);
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById('card-' + this.activeCardId());
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 60);
    }
  }


  // Dismiss the tip badge immediately without delay
  dismissImmediately() {
    this.clearTipTimers();
    this.isFading.set(true);
    this.hasScrolled.set(true);
  }

  // Dismiss the tip badge with a smooth fade
  dismissTip() {
    if (this.hasScrolled() || this.isFading()) return;
    this.clearTipTimers();
    this.isFading.set(true);
    setTimeout(() => {
      this.hasScrolled.set(true);
    }, 500);
  }

  // When hovered over, dismiss after 0.5 seconds (500ms)
  onTipMouseEnter() {
    if (this.hasScrolled() || this.isFading()) return;
    this.hoverDismissTimer = setTimeout(() => {
      this.dismissTip();
    }, 500);
  }

  // Cancel hover timer if cursor leaves before 0.5 seconds
  onTipMouseLeave() {
    if (this.hoverDismissTimer) {
      clearTimeout(this.hoverDismissTimer);
      this.hoverDismissTimer = undefined;
    }
  }

  private clearTipTimers() {
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
      this.autoDismissTimer = undefined;
    }
    if (this.hoverDismissTimer) {
      clearTimeout(this.hoverDismissTimer);
      this.hoverDismissTimer = undefined;
    }
  }

  // Focus roadmap view on the 2024–2027 window on page load
  centerOnCurrentEra() {
    if (!this.roadmapScrollRef) return;
    const el = this.roadmapScrollRef.nativeElement;
    if (!el || typeof el.scrollTo !== 'function') return;
    const leftPercent = this.calcLeft(2024, 6) / 100;
    const scrollTarget = el.scrollWidth * leftPercent;
    el.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.centerOnCurrentEra();
      }, 150);

      // Auto-disappear after 5s of user looking at the timeline
      this.autoDismissTimer = setTimeout(() => {
        this.dismissTip();
      }, 5000);

      // Setup Shift + Wheel horizontal scroll handler
      const el = this.roadmapScrollRef?.nativeElement;
      if (el) {
        el.addEventListener(
          'wheel',
          (e: WheelEvent) => {
            if (e.shiftKey) {
              e.preventDefault();
              el.scrollLeft += e.deltaY;
            }
          },
          { passive: false }
        );
      }
    }
  }
}
