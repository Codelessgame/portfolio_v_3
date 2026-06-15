import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
  personalActivity?: {
    label: string;
    icon: string;
    description: string;
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
  activeActivityIndex: number | null = null;
  isDesktop = false;
  maxActivities = 3;

  personalActivities: PersonalActivity[] = [
    {
      id: 'art',
      label: 'Art Club & School Volunteering',
      icon: 'palette',
      description: 'Volunteered to coordinate custom physical/digital artwork commissions and designed school community farewell gifts, utilizing acrylic painting and pastels.',
      color: '#ff006e', // Hot Pink
      startYear: 2022,
      startMonth: 9,
      endYear: 2026,
      endMonth: 6,
      startDateLabel: 'Sept 2022',
      endDateLabel: 'June 2026'
    },
    {
      id: 'physics',
      label: 'Aerospace & Physics Research',
      icon: 'rocket_launch',
      description: 'Designed and simulated a mathematical shadow projection model for convex 3D shapes using coordinate geometry, vector analysis, and Python.',
      color: '#3a86ff', // Neon Blue
      startYear: 2024,
      startMonth: 6,
      endYear: 2024,
      endMonth: 11,
      startDateLabel: 'June 2024',
      endDateLabel: 'Nov 2024'
    },
    {
      id: 'sports',
      label: 'Team Sports (Football/Floorball)',
      icon: 'sports_soccer',
      description: 'Engaged in competitive team sports to build tactical cooperation, leadership, and quick decision-making under physical and mental pressure.',
      color: '#ffbe0b', // Neon Yellow
      startYear: 2025,
      startMonth: 1,
      endYear: 2025,
      endMonth: 12,
      startDateLabel: 'Jan 2025',
      endDateLabel: 'Dec 2025'
    }
  ];

  activityLines: Array<{ index: number; path: string; color: string }> = [];

  timelineItems: TimelineItem[] = [
    {
      type: 'education',
      title: 'Fontys University of Applied Sciences',
      subtitle: 'Bachelor of Science in Mechatronics',
      date: 'Sept 2026 – Future (Upcoming)',
      icon: 'upcoming',
      bullets: [
        'Enrolled in the Bachelor of Science in Mechatronics engineering program.',
        'Focusing on integrating mechanical engineering, electrical engineering, and computer systems.',
        'Applying practical CAD/CAM, software engineering, and hardware prototyping skills in a collaborative project-based curriculum.'
      ]
    },
    {
      type: 'work',
      title: 'Stadion Viktoria Plzeň',
      subtitle: 'Hospitality Server',
      date: '2025',
      icon: 'sports_soccer',
      bullets: [
        'Delivered rapid, high-quality customer service in high-pressure, fast-paced sports stadium environments.',
        'Prepared and sold food and concessions while managing inventory and cash transactions for large matchday crowds.',
        'Maintained a welcoming, organized, and efficient service atmosphere under pressure.'
      ],
      personalActivity: {
        label: 'Team Sports (Football/Floorball)',
        icon: 'sports_soccer',
        description: 'Engaged in competitive team sports to build tactical cooperation, leadership, and quick decision-making under physical and mental pressure.'
      }
    },
    {
      type: 'work',
      title: 'PPA Arena',
      subtitle: 'Cashier & Paintball Event Organizer',
      date: '2023 – 2024',
      icon: 'groups',
      bullets: [
        'Managed daily logistics, safety briefs, and client relations for paintball groups ranging from 6 to 90 participants per day.',
        'Communicated event rules, handled fee collection, and guided foreign visitors (providing instructions in English and German).',
        'Operated POS ticketing terminals, balancing concession sales and ticketing checkouts in high-energy environments.'
      ],
      personalActivity: {
        label: 'Aerospace & Physics Research',
        icon: 'rocket_launch',
        description: 'Designed and simulated a mathematical shadow projection model for convex 3D shapes using coordinate geometry, vector analysis, and Python.'
      }
    },
    {
      type: 'education',
      title: 'Gymnázium Rokycany',
      subtitle: 'International Baccalaureate (IB) Diploma Programme',
      date: 'Sept 2022 – June 2026 (ongoing)',
      icon: 'school',
      bullets: [
        'Advanced coursework: Mathematics Analysis and Approaches HL, Physics HL, English B HL, Chemistry SL, Geography SL, and Czech A: Literature SL.',
        'Developed an advanced computational physics/math model calculating the shadow areas of convex shapes using 3D vector analysis and the Shoelace formula (Math IA).',
        'Balanced rigorous academic work with self-taught engineering skills (CAD in Fusion 360, PCBs in KiCad, AI architectures in PyTorch).'
      ],
      personalActivity: {
        label: 'Art Club & School Volunteering',
        icon: 'palette',
        description: 'Volunteered to coordinate custom physical/digital artwork commissions and designed school community farewell gifts, utilizing acrylic painting and pastels.'
      }
    }
  ];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth > 768;
    }

    // Calculate vertical percentages based on dates early to prevent check warnings
    this.personalActivities.forEach(act => {
      act.startPercent = this.getPercentFromTop(act.startYear, act.startMonth);
      act.endPercent = this.getPercentFromTop(act.endYear, act.endMonth);
    });
  }

  getPercentFromTop(year: number, month: number): number {
    const startYear = 2022;
    const startMonth = 9; // Sept 2022
    const totalMonths = 48; // Sept 2022 to Sept 2026

    const currentMonths = (year - startYear) * 12 + (month - startMonth);
    const clamped = Math.max(0, Math.min(totalMonths, currentMonths));
    // Timeline grows bottom to top chronologically, so month 0 is 100% from top (bottom),
    // and month 48 is 0% from top (top).
    return 100 - (clamped / totalMonths) * 100;
  }

  toggleActivity(index: number) {
    if (this.activeActivityIndex === index) {
      this.activeActivityIndex = null;
    } else {
      this.activeActivityIndex = index;
    }
    // Re-draw lines to align with dynamic card states if active state changes sizes
    setTimeout(() => this.updateLines(), 100);
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
      setTimeout(() => this.updateLines(), 100);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Observer for main timeline cards animation
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      });

      const items = this.el.nativeElement.querySelectorAll('.timeline-item');
      items.forEach((item: Element) => this.observer?.observe(item));

      // Calculate path coordinates after DOM is fully rendered
      setTimeout(() => this.updateLines(), 250);
    }
  }

  updateLines() {
    if (!isPlatformBrowser(this.platformId) || !this.isDesktop) return;

    const container = this.el.nativeElement.querySelector('.timeline-container');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    // The central vertical line is absolute positioned at left: 40px, width: 3px
    // Center point of this vertical line is 41.5px from container's left edge
    const centerX = 41.5;

    this.activityLines = this.personalActivities.slice(0, this.maxActivities).map((act, idx) => {
      const startEl = document.getElementById(`activity-start-${idx}`);
      const endEl = document.getElementById(`activity-end-${idx}`);
      if (!startEl || !endEl) return null;

      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      // Right edge of the start bubble relative to the container
      const startX = startRect.left - containerRect.left + startRect.width;
      const startY = startRect.top - containerRect.top + startRect.height / 2;

      // Left edge of the end dot relative to the container
      const endX = endRect.left - containerRect.left;
      const endY = endRect.top - containerRect.top + endRect.height / 2;

      // Path layout: Starts at startX,startY -> horizontally to centerX, then jumps (Move) to centerX,endY -> horizontally to endX
      // This hides the vertical connecting lines running along the main timeline axis.
      const path = `M ${startX} ${startY} H ${centerX} M ${centerX} ${endY} H ${endX}`;

      return {
        index: idx,
        path,
        color: act.color
      };
    }).filter(line => line !== null) as any[];
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
