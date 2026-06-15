import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface TimelineItem {
  type: 'work' | 'education';
  title: string;
  subtitle: string;
  date: string;
  icon: string;
  bullets: string[];
}

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, MatIconModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
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
      ]
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
      ]
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
      ]
    }
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, {
        threshold: 0.15, // Trigger when 15% of the item is in viewport
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before the item enters the lower section of the screen
      });

      const items = this.el.nativeElement.querySelectorAll('.timeline-item');
      items.forEach((item: Element) => this.observer?.observe(item));
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
