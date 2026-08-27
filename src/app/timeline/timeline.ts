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

  // Comprehensive scale from Primary School (Sept 2013) to University Graduation (July 2030)
  readonly scaleMin = 2013.7;
  readonly scaleMax = 2030.0;
  readonly canvasPixelWidth = 2900;

  // Year markers to display along the horizontal axis
  readonly yearMarkers = [
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030
  ];

  // Currently selected item IDs for the Inspector pane (supports Shift+click multi-selection)
  selectedItemIds = signal<string[]>(['gymnazium']);

  t(key: string): string {
    return this.ts.t()(key);
  }

  // Calculate left offset percentage for a date
  calcLeft(year: number, month: number): number {
    const val = year + (month - 1) / 12;
    const clamped = Math.max(this.scaleMin, Math.min(this.scaleMax, val));
    return ((clamped - this.scaleMin) / (this.scaleMax - this.scaleMin)) * 100;
  }

  // Calculate width percentage for a date range
  calcWidth(startYear: number, startMonth: number, endYear: number, endMonth: number): number {
    const startVal = Math.max(this.scaleMin, startYear + (startMonth - 1) / 12);
    const endVal = Math.min(this.scaleMax, endYear + endMonth / 12);
    const rawWidth = ((endVal - startVal) / (this.scaleMax - this.scaleMin)) * 100;
    return Math.max(1.8, rawWidth);
  }

  // Check whether the title string fits fully inside the pill width
  calcFitsInPill(title: string, startYear: number, startMonth: number, endYear: number, endMonth: number): boolean {
    const startVal = Math.max(this.scaleMin, startYear + (startMonth - 1) / 12);
    const endVal = Math.min(this.scaleMax, endYear + endMonth / 12);
    const fraction = (endVal - startVal) / (this.scaleMax - this.scaleMin);
    const widthPx = fraction * this.canvasPixelWidth;
    const estimatedNeededPx = (title.length * 8.8) + 26; // character width + padding
    return widthPx >= estimatedNeededPx;
  }

  // "Now" vertical indicator line percentage (August 2026)
  nowPercent = computed(() => {
    return this.calcLeft(2026, 8);
  });

  // Education Track Items
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

  // Work Track Items
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

  // Activity & Extracurricular Track Items
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

  // All Items Combined
  allItems = computed<RoadmapItem[]>(() => {
    return [
      ...this.educationItems(),
      ...this.workItems(),
      ...this.activityItems()
    ];
  });

  // Currently Selected Items Array for Inspector Pane (1 or more items)
  selectedItems = computed<RoadmapItem[]>(() => {
    const all = this.allItems();
    const ids = this.selectedItemIds();
    const matches = all.filter(item => ids.includes(item.id));
    return matches.length > 0 ? matches : [all[0]];
  });

  isSelected(id: string): boolean {
    return this.selectedItemIds().includes(id);
  }

  // Toggle selection: regular click selects single; Shift+click multi-selects/toggles
  toggleSelect(id: string, event: MouseEvent) {
    if (event.shiftKey) {
      const current = this.selectedItemIds();
      if (current.includes(id)) {
        if (current.length > 1) {
          this.selectedItemIds.set(current.filter(i => i !== id));
        }
      } else {
        this.selectedItemIds.set([...current, id]);
      }
    } else {
      this.selectedItemIds.set([id]);
    }
  }

  // Scroll buttons for roadmap container
  scrollRoadmap(direction: 'left' | 'right') {
    if (!this.roadmapScrollRef) return;
    const el = this.roadmapScrollRef.nativeElement;
    const offset = direction === 'left' ? -420 : 420;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  }

  // Focus roadmap view on the 2022 to 2027 window on page load
  centerOn2022() {
    if (!this.roadmapScrollRef) return;
    const el = this.roadmapScrollRef.nativeElement;
    const leftPercent2022 = (2022.0 - this.scaleMin) / (this.scaleMax - this.scaleMin);
    const scrollTarget = (el.scrollWidth - 150) * leftPercent2022;
    el.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.centerOn2022();
    }, 150);
  }
}
