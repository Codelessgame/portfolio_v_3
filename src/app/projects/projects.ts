import { Component, inject, signal, computed, ViewChild, ElementRef, AfterViewInit, OnDestroy, effect, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../translation.service';
import { LibraryNavigationService } from '../library-navigation.service';
import verifiedLinks from './verified_links.json';

interface VerifiedLinkItem {
  category: string;
  name: string;
  link: string;
  author: string;
  image?: string;
  status?: 'finished' | 'ongoing';
  tags?: string[];
  pinned?: boolean;
  hasAnalysis?: boolean;
  projectCategory?: 'embedded' | 'ai';
  title_en: string;
  title_cs: string;
  desc_en: string;
  desc_cs: string;
  date_en: string;
  date_cs: string;
}

export interface LibraryItem {
  id: string;
  type: 'project' | 'book' | 'youtube' | 'podcast';
  image: string;
  category?: 'embedded' | 'ai'; // for projects
  status?: 'finished' | 'ongoing';
  hasAnalysis?: boolean; // for books
  link?: string; // external link for youtube channels, or projects
  extraKey?: string; // tech stack, author name, creator
  tags: string[];
  pinned?: boolean;
  title_en: string;
  title_cs: string;
  desc_en: string;
  desc_cs: string;
  date_en: string;
  date_cs: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements AfterViewInit, OnDestroy {
  @ViewChild('librarySearchSection') librarySearchSection?: ElementRef<HTMLElement>;
  @ViewChild('searchBarWrapper') searchBarWrapper?: ElementRef<HTMLElement>;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  private ts = inject(TranslationService);
  private router = inject(Router);
  private libraryNav = inject(LibraryNavigationService);

  searchQuery = signal<string>('');
  selectedTags = signal<string[]>([]);
  selectedCategories = signal<string[]>([]);
  excludedCategories = signal<string[]>([]);
  currentLang = this.ts.currentLang;

  private activeScrollAnimationId: number | null = null;
  private viewInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.libraryNav.registerLibraryScrollCallback(() => {
        this.scrollToSearchFromCurrentPosition();
      });
    }

    // Watch for scroll requests when the user re-clicks "Library" while already on the page
    effect(() => {
      const trigger = this.libraryNav.scrollToSearchTrigger();
      if (trigger > 0 && this.viewInitialized) {
        this.scrollToSearchFromCurrentPosition();
      }
    });
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    if (isPlatformBrowser(this.platformId)) {
      const shouldScrollFromService = this.libraryNav.consumeScrollRequest();
      const shouldScrollFromState = history.state && history.state.scrollToSearch;

      if (shouldScrollFromService || shouldScrollFromState) {
        if (history.state && history.state.scrollToSearch) {
          try {
            history.replaceState({ ...history.state, scrollToSearch: undefined }, '');
          } catch (_) {}
        }
        setTimeout(() => {
          this.performScrollAnimationFromTop();
        }, 80);
      }
    }
  }

  performScrollAnimationFromTop() {
    if (!isPlatformBrowser(this.platformId)) return;

    // 1. Immediately position the viewport at the very top of the page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    this.cancelActiveScrollAnimation();

    // 2. Allow a short pause for the layout to settle, then glide smoothly to center the search text box
    setTimeout(() => {
      const el = (document.querySelector('.search-input') ||
                  document.querySelector('.search-wrapper') ||
                  this.searchInput?.nativeElement ||
                  this.searchBarWrapper?.nativeElement ||
                  this.librarySearchSection?.nativeElement) as HTMLElement;
      if (!el) return;

      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      // Position the search text box in the vertical center of the viewport
      const targetY = Math.max(0, Math.round(rect.top + currentScroll - (viewportHeight / 2) + (rect.height / 2)));

      this.animateScroll(0, targetY, 800);
    }, 120);
  }

  private animateScroll(startY: number, targetY: number, duration: number) {
    this.cancelActiveScrollAnimation();

    const distance = targetY - startY;
    if (Math.abs(distance) < 5) return;

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
        this.activeScrollAnimationId = requestAnimationFrame(step);
      } else {
        this.cancelActiveScrollAnimation();
        window.scrollTo(0, targetY);
        document.documentElement.scrollTop = targetY;
        document.body.scrollTop = targetY;
      }
    };

    this.activeScrollAnimationId = requestAnimationFrame(step);
  }

  private cancelActiveScrollAnimation() {
    if (this.activeScrollAnimationId !== null) {
      cancelAnimationFrame(this.activeScrollAnimationId);
      this.activeScrollAnimationId = null;
    }
  }

  scrollToSearchFromCurrentPosition() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.cancelActiveScrollAnimation();

    const el = (document.querySelector('.search-input') ||
                document.querySelector('.search-wrapper') ||
                this.searchInput?.nativeElement ||
                this.searchBarWrapper?.nativeElement ||
                this.librarySearchSection?.nativeElement) as HTMLElement;
    if (!el) return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

    // Position the search text box in the vertical center of the viewport
    const targetY = Math.max(0, Math.round(rect.top + currentScroll - (viewportHeight / 2) + (rect.height / 2)));

    this.animateScroll(currentScroll, targetY, 800);
  }

  scrollToSearch() {
    this.scrollToSearchFromCurrentPosition();
  }

  ngOnDestroy() {
    this.cancelActiveScrollAnimation();
    this.libraryNav.unregisterLibraryScrollCallback();
  }

  /** Check if a category is currently included in selected filters */
  isCategorySelected(cat: string): boolean {
    return this.selectedCategories().includes(cat);
  }

  /** Check if a category is currently excluded */
  isCategoryExcluded(cat: string): boolean {
    return this.excludedCategories().includes(cat);
  }

  /** Whether the "All" category is actively showing everything without exclusions */
  isAllActive(): boolean {
    return this.selectedCategories().length === 0 && this.excludedCategories().length === 0;
  }

  /**
   * Category button click cycle:
   * State 0: Neutral (unselected) -> Click -> State 1: Selected (Included)
   * State 1: Selected (Included)  -> Click -> State 2: Excluded (with canceling block icon)
   * State 2: Excluded             -> Click -> State 0: Neutral (unselected)
   */
  onCategoryClick(cat: string) {
    if (cat === 'all') {
      this.selectedCategories.set([]);
      this.excludedCategories.set([]);
      return;
    }

    if (this.isCategorySelected(cat)) {
      // Step: Included -> Excluded
      this.selectedCategories.set(this.selectedCategories().filter(c => c !== cat));
      this.excludedCategories.set([...this.excludedCategories(), cat]);
      return;
    }

    if (this.isCategoryExcluded(cat)) {
      // Step: Excluded -> Neutral
      this.excludedCategories.set(this.excludedCategories().filter(c => c !== cat));
      return;
    }

    // Step: Neutral -> Included
    this.selectedCategories.set([...this.selectedCategories(), cat]);
  }

  /** Tags that match what the user has typed in the search box */
  suggestedTags = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return [];
    const active = this.selectedTags().map(t => t.toLowerCase());
    return this.allKnownTags().filter(tag =>
      tag.toLowerCase().includes(query) && !active.includes(tag.toLowerCase())
    );
  });

  /** All unique tags across all library items */
  allKnownTags = computed(() => {
    const tagSet = new Set<string>();
    this.libraryItems.forEach(item => {
      this.getItemTags(item).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  });

  toggleTag(tag: string) {
    const current = this.selectedTags();
    if (current.includes(tag)) {
      this.selectedTags.set(current.filter(t => t !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }
  }

  removeTag(tag: string) {
    this.selectedTags.set(this.selectedTags().filter(t => t !== tag));
  }

  promoteToTag(tag: string) {
    if (!this.selectedTags().includes(tag)) {
      this.selectedTags.set([...this.selectedTags(), tag]);
    }
    this.searchQuery.set('');
  }

  isTagActive(tag: string): boolean {
    return this.selectedTags().some(t => t.toLowerCase() === tag.toLowerCase());
  }

  clearAll() {
    this.searchQuery.set('');
    this.selectedTags.set([]);
    this.selectedCategories.set([]);
    this.excludedCategories.set([]);
  }

  // The searchable & filterable collection of ALL items
  libraryItems: LibraryItem[] = Object.entries(verifiedLinks as Record<string, VerifiedLinkItem>).map(([id, item]) => {
    const type = item.category as 'project' | 'book' | 'youtube' | 'podcast';
    return {
      id,
      type,
      image: item.image || (type === 'book' ? 'book_placeholder.png' : `${id}_logo.png`),
      category: item.projectCategory,
      status: item.status || (type === 'youtube' ? 'ongoing' : 'finished'),
      hasAnalysis: !!item.hasAnalysis,
      link: item.link || undefined,
      extraKey: item.author || undefined,
      tags: item.tags || [],
      pinned: !!item.pinned,
      title_en: item.title_en || item.name || '',
      title_cs: item.title_cs || item.name || '',
      desc_en: item.desc_en || '',
      desc_cs: item.desc_cs || '',
      date_en: item.date_en || '',
      date_cs: item.date_cs || ''
    } as LibraryItem;
  });

  sortMode = signal<'default' | 'default-rev' | 'alpha-asc' | 'alpha-desc' | 'date-desc' | 'date-asc'>('default');

  isDateSortActive = computed(() => {
    return this.sortMode() === 'date-desc' || this.sortMode() === 'date-asc';
  });

  cycleSort() {
    const modes: ('default' | 'default-rev' | 'alpha-asc' | 'alpha-desc' | 'date-desc' | 'date-asc')[] = [
      'default',
      'default-rev',
      'alpha-asc',
      'alpha-desc',
      'date-desc',
      'date-asc'
    ];
    const currentIndex = modes.indexOf(this.sortMode());
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    this.sortMode.set(nextMode);

    if ((nextMode === 'date-desc' || nextMode === 'date-asc') &&
        (this.selectedCategories().includes('youtube') || this.selectedCategories().includes('podcast'))) {
      this.selectedCategories.set(this.selectedCategories().filter(c => c !== 'youtube' && c !== 'podcast'));
    }
  }

  getSortIcon(): string {
    switch (this.sortMode()) {
      case 'alpha-asc': return 'sort_by_alpha';
      case 'alpha-desc': return 'sort_by_alpha';
      case 'date-desc': return 'event';
      case 'date-asc': return 'event';
      case 'default-rev': return 'swap_vert';
      default: return 'sort';
    }
  }

  getSortLabel(): string {
    const lang = this.currentLang();
    switch (this.sortMode()) {
      case 'alpha-asc': return lang === 'en' ? 'A-Z' : 'A-Z';
      case 'alpha-desc': return lang === 'en' ? 'Z-A' : 'Z-A';
      case 'date-desc': return lang === 'en' ? 'Newest' : 'Nejnovější';
      case 'date-asc': return lang === 'en' ? 'Oldest' : 'Nejstarší';
      case 'default-rev': return lang === 'en' ? 'Reversed' : 'Obráceně';
      default: return lang === 'en' ? 'Default' : 'Výchozí';
    }
  }

  getSortTooltip(): string {
    const lang = this.currentLang();
    switch (this.sortMode()) {
      case 'alpha-asc': return lang === 'en' ? 'Sort: Alphabetical (A-Z)' : 'Řadit: Abecedně (A-Z)';
      case 'alpha-desc': return lang === 'en' ? 'Sort: Alphabetical (Z-A)' : 'Řadit: Abecedně (Z-A)';
      case 'date-desc': return lang === 'en' ? 'Sort: Date (Newest First)' : 'Řadit: Podle data (nejnovější)';
      case 'date-asc': return lang === 'en' ? 'Sort: Date (Oldest First)' : 'Řadit: Podle data (nejstarší)';
      case 'default-rev': return lang === 'en' ? 'Sort: Default (Reversed)' : 'Řadit: Výchozí (obráceně)';
      default: return lang === 'en' ? 'Sort: Default Order' : 'Řadit: Výchozí pořadí';
    }
  }

  getItemTags(item: LibraryItem): string[] {
    return item.tags || [];
  }

  getVisibleTags(item: LibraryItem): string[] {
    return (item.tags || []).slice(0, 5);
  }

  getYear(item: LibraryItem): number {
    if (item.type === 'youtube') return 2026;
    const dateStr = this.currentLang() === 'en' ? item.date_en : item.date_cs;
    if (!dateStr || dateStr.toLowerCase().includes('reading') || dateStr.toLowerCase().includes('ongoing') || dateStr.toLowerCase().includes('future')) {
      return 2026;
    }
    const matches = dateStr.match(/\d{4}/g);
    if (matches && matches.length > 0) {
      return Math.max(...matches.map(m => parseInt(m, 10)));
    }
    return 0;
  }

  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const activeCategories = this.selectedCategories();
    const excludedCategories = this.excludedCategories();
    const activeTags = this.selectedTags();
    const lang = this.currentLang();
    const translator = this.ts.t();

    let items = this.libraryItems.filter(item => {
      // Exclude Media Filter when sorting by date (youtube/podcast don't have time associated)
      if (this.isDateSortActive() && (item.type === 'youtube' || item.type === 'podcast')) {
        return false;
      }

      // Excluded Categories (multi-exclusion support)
      if (excludedCategories.includes(item.type)) {
        return false;
      }

      // Selected Categories Filter (multi-selection support):
      // If any categories are selected, item must belong to one of them
      if (activeCategories.length > 0 && !activeCategories.includes(item.type)) {
        return false;
      }

      // Tag Filter — item must have ALL selected tags
      if (activeTags.length > 0) {
        const itemTags = this.getItemTags(item).map(t => t.toLowerCase());
        const allTagsMatch = activeTags.every(tag =>
          itemTags.some(it => it.toLowerCase() === tag.toLowerCase())
        );
        if (!allTagsMatch) return false;
      }

      // Text Search Filter
      if (query) {
        const title = (lang === 'en' ? (item.title_en || '') : (item.title_cs || '')).toLowerCase();
        const desc = (lang === 'en' ? (item.desc_en || '') : (item.desc_cs || '')).toLowerCase();
        const extra = item.extraKey ? item.extraKey.toLowerCase() : '';
        const tags = this.getItemTags(item).map(t => (t || '').toLowerCase());
        const typeLabel = (translator(`projects.filter_${item.type}`) || '').toLowerCase();
        const searchable = `${title} ${desc} ${extra} ${tags.join(' ')} ${typeLabel}`;

        if (!searchable.includes(query)) return false;
      }

      return true;
    });

    const mode = this.sortMode();
    if (mode === 'default-rev') {
      return [...items].reverse();
    } else if (mode === 'alpha-asc') {
      return [...items].sort((a, b) => {
        const titleA = (lang === 'en' ? (a.title_en || '') : (a.title_cs || '')).toLowerCase();
        const titleB = (lang === 'en' ? (b.title_en || '') : (b.title_cs || '')).toLowerCase();
        return titleA.localeCompare(titleB, lang);
      });
    } else if (mode === 'alpha-desc') {
      return [...items].sort((a, b) => {
        const titleA = (lang === 'en' ? (a.title_en || '') : (a.title_cs || '')).toLowerCase();
        const titleB = (lang === 'en' ? (b.title_en || '') : (b.title_cs || '')).toLowerCase();
        return titleB.localeCompare(titleA, lang);
      });
    } else if (mode === 'date-desc') {
      return [...items].sort((a, b) => {
        return this.getYear(b) - this.getYear(a);
      });
    } else if (mode === 'date-asc') {
      return [...items].sort((a, b) => {
        return this.getYear(a) - this.getYear(b);
      });
    }

    return items;
  });

  t(key: string): string {
    return this.ts.t()(key);
  }

  setCategory(category: string) {
    this.onCategoryClick(category);
  }
}
