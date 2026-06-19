import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../translation.service';
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
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  private ts = inject(TranslationService);

  searchQuery = signal<string>('');
  selectedTags = signal<string[]>([]);
  selectedCategory = signal<string>('all');
  currentLang = this.ts.currentLang;

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
      title_en: item.title_en,
      title_cs: item.title_cs,
      desc_en: item.desc_en,
      desc_cs: item.desc_cs,
      date_en: item.date_en,
      date_cs: item.date_cs
    } as LibraryItem;
  });

  // Pinned/fixed items to showcase at the top
  pinnedItems: LibraryItem[] = [];

  constructor() {
    this.pinnedItems = this.libraryItems.filter(item => item.pinned);
  }

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
        (this.selectedCategory() === 'youtube' || this.selectedCategory() === 'podcast')) {
      this.selectedCategory.set('all');
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

  filteredPinnedItems = computed(() => {
    return this.pinnedItems;
  });

  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const activeTags = this.selectedTags();
    const lang = this.currentLang();
    const translator = this.ts.t();

    let items = this.libraryItems.filter(item => {
      // Exclude Media Filter when sorting by date (youtube/podcast don't have time associated)
      if (this.isDateSortActive() && (item.type === 'youtube' || item.type === 'podcast')) {
        return false;
      }

      // Category Filter
      if (cat !== 'all' && item.type !== cat) return false;

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
        const title = (lang === 'en' ? item.title_en : item.title_cs).toLowerCase();
        const desc = (lang === 'en' ? item.desc_en : item.desc_cs).toLowerCase();
        const extra = item.extraKey ? item.extraKey.toLowerCase() : '';
        const tags = this.getItemTags(item).map(t => t.toLowerCase());
        const typeLabel = translator(`projects.filter_${item.type}`).toLowerCase();
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
        const titleA = (lang === 'en' ? a.title_en : a.title_cs).toLowerCase();
        const titleB = (lang === 'en' ? b.title_en : b.title_cs).toLowerCase();
        return titleA.localeCompare(titleB, lang);
      });
    } else if (mode === 'alpha-desc') {
      return [...items].sort((a, b) => {
        const titleA = (lang === 'en' ? a.title_en : a.title_cs).toLowerCase();
        const titleB = (lang === 'en' ? b.title_en : b.title_cs).toLowerCase();
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
    this.selectedCategory.set(category);
  }
}
