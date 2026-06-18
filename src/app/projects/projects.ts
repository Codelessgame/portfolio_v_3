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
}

export interface LibraryItem {
  id: string;
  type: 'project' | 'book' | 'youtube' | 'podcast';
  image: string;
  category?: 'embedded' | 'ai'; // for projects
  status?: 'finished' | 'ongoing';
  translationPrefix: string;
  hasAnalysis?: boolean; // for books
  link?: string; // external link for youtube channels, or projects
  extraKey?: string; // tech stack, author name, creator
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

  // Pinned/fixed items to showcase at the top
  pinnedItems: LibraryItem[] = [
    {
      id: 'rc_car',
      image: 'rc_car_project.png',
      type: 'project',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.rc_car',
      extraKey: 'Arduino, C++, Bluetooth, CAD'
    },
    {
      id: 'railway',
      image: 'railway_switches_project.png',
      type: 'project',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.railway',
      extraKey: 'ESP32, MicroPython, I2C'
    },
    {
      id: 'digit',
      image: 'digit_recognizer_project.png',
      type: 'project',
      category: 'ai',
      status: 'finished',
      translationPrefix: 'projects.digit',
      extraKey: 'TensorFlow, CNN, Python, JS'
    }
  ];

  // The searchable & filterable collection of ALL items
  libraryItems: LibraryItem[] = [
    // Projects (static)
    {
      id: 'rc_car',
      image: 'rc_car_project.png',
      type: 'project',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.rc_car',
      extraKey: 'Arduino, C++, Bluetooth, CAD'
    },
    {
      id: 'railway',
      image: 'railway_switches_project.png',
      type: 'project',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.railway',
      extraKey: 'ESP32, MicroPython, I2C'
    },
    {
      id: 'digit',
      image: 'digit_recognizer_project.png',
      type: 'project',
      category: 'ai',
      status: 'finished',
      translationPrefix: 'projects.digit',
      extraKey: 'TensorFlow, CNN, Python, JS'
    },
    {
      id: 'music',
      image: 'music_attention_project.png',
      type: 'project',
      category: 'ai',
      status: 'finished',
      translationPrefix: 'projects.music',
      extraKey: 'PyTorch, Transformers, Spectral Analysis'
    },
    {
      id: 'slm',
      image: 'small_language_model_project.png',
      type: 'project',
      category: 'ai',
      status: 'ongoing',
      translationPrefix: 'projects.slm',
      extraKey: 'PyTorch, Tokenization, Transformer'
    },
    // Dynamic books and channels from JSON
    ...Object.entries(verifiedLinks as Record<string, VerifiedLinkItem>).map(([id, item]) => {
      const type = item.category === 'youtube' ? 'youtube' : 'book';
      
      // Determine image cover
      let image = 'book_placeholder.png';
      if (type === 'book') {
        if (id === 'atomic-habits') image = 'atomic_habits_cover.png';
        else if (id === 'clean-code') image = 'clean_code_cover.png';
        else if (id === 'design-things') image = 'design_things_cover.png';
        else if (id === 'electrodynamics') image = 'electrodynamics_cover.png';
      } else {
        image = id === 'three_blue_one_brown' ? '3b1b_logo.png' : `${id}_logo.png`;
      }

      // Determine status
      const ongoingBookIds = ['electrodynamics', 'ai-modern-approach', 'rocket-propulsion-elements'];
      const status = (type === 'youtube' || ongoingBookIds.includes(id)) ? 'ongoing' : 'finished';

      // Determine hasAnalysis
      const hasAnalysis = id === 'atomic-habits' || id === 'clean-code';

      return {
        id,
        type,
        image,
        status,
        translationPrefix: `projects.${id.replace(/-/g, '_')}`,
        hasAnalysis,
        extraKey: item.author,
        link: item.link
      } as LibraryItem;
    })
  ];

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
    if (item.type === 'project') {
      return item.extraKey ? item.extraKey.split(',').map(s => s.trim()) : [];
    }

    if (item.type === 'youtube') {
      const defaultTags = ['YouTube'];
      const ytTags: Record<string, string[]> = {
        three_blue_one_brown: ['Math', 'Visualization'],
        veritasium: ['Science', 'Physics'],
        mark_rober: ['Engineering', 'Science'],
        stuff_made_here: ['Engineering', 'DIY'],
        nikhil_kamath: ['Business', 'Podcast'],
        ivysilani: ['TV', 'Czech'],
        andy_guitar: ['Music', 'Guitar'],
        herdyn: ['Gaming', 'Czech'],
        mit_ocw: ['Education', 'University'],
        revision_village: ['Math', 'IB'],
        cvutfel: ['Education', 'Czech'],
        jaderka: ['Education', 'Czech'],
        kapitalista: ['Finance', 'Czech'],
        steve_mould: ['Science', 'Physics'],
        online_ucitel: ['Education', 'Czech'],
        learntube: ['Education', 'Czech'],
        artem_kirsanov: ['Neuroscience', 'Biology'],
        real_engineering: ['Engineering', 'History'],
        scott_manley: ['Space', 'Astronomy'],
        gal_lahat: ['Tech', 'Coding'],
        alexander_amini: ['AI', 'MIT'],
        ai_explained: ['AI', 'Analysis'],
        aleph_zero: ['Math', 'Physics'],
        aleph_0: ['Math', 'Physics'],
        efficient_engineer: ['Engineering', 'Physics'],
        cgp_grey: ['Education', 'History'],
        quanta_magazine: ['Science', 'Math'],
        lemmino: ['Documentary', 'Mystery'],
        andrej_karpathy: ['AI', 'Deep Learning'],
        integza: ['Engineering', 'DIY'],
        bps_space: ['Aerospace', 'Engineering'],
        sebastian_lague: ['Coding', 'GameDev'],
        hyperplexed: ['Web Design', 'Coding'],
        jirka_vysvetluje: ['Education', 'Czech'],
        everyday_astronaut: ['Space', 'Aerospace'],
        vsauce: ['Science', 'Philosophy'],
        smarter_every_day: ['Science', 'Engineering'],
        bycloud: ['Tech', 'AI']
      };
      return ytTags[item.id] || defaultTags;
    }

    if (item.type === 'book') {
      const defaultTags = ['Book'];
      const bookTags: Record<string, string[]> = {
        'atomic-habits': ['Productivity', 'Self-Help'],
        'clean-code': ['Coding', 'Software'],
        'design-things': ['Design', 'UX'],
        electrodynamics: ['Physics', 'Electromagnetism'],
        'nineteen-eighty-four': ['Classic', 'Dystopian'],
        'bible-first-100-pages': ['Religion', 'History'],
        'surely-youre-joking-feynman': ['Biography', 'Physics'],
        'feynman-lectures-vol1': ['Physics', 'Science'],
        'white-disease': ['Classic', 'Drama', 'Czech'],
        'war-with-the-newts': ['Sci-Fi', 'Satire', 'Czech'],
        'mother-capek': ['Classic', 'Drama', 'Czech'],
        'hitchhikers-guide': ['Sci-Fi', 'Comedy'],
        'handmaids-tale': ['Fiction', 'Dystopian'],
        'to-kill-a-mockingbird': ['Classic', 'Fiction'],
        'ten-rules-for-life': ['Psychology', 'Self-Help'],
        'beyond-order': ['Psychology', 'Self-Help'],
        'why-we-sleep': ['Science', 'Health'],
        'structures-why-things-dont-fall': ['Engineering', 'Physics'],
        'stiff-cadavers': ['Science', 'Biology'],
        'rich-dad-poor-dad': ['Finance', 'Business'],
        'modern-computer-graphics': ['Graphics', 'Coding'],
        'fahrenheit-451': ['Classic', 'Dystopian'],
        antigone: ['Classic', 'Drama'],
        'divine-comedy': ['Classic', 'Poetry'],
        'day-of-the-jackal': ['Thriller', 'Fiction'],
        'diary-of-anne-frank': ['Biography', 'History'],
        'animal-farm': ['Classic', 'Satire'],
        ivanhoe: ['Classic', 'Historical'],
        'brave-new-world': ['Classic', 'Dystopian'],
        krakatit: ['Sci-Fi', 'Czech'],
        'ku-klux-klan': ['Non-Fiction', 'History'],
        butterball: ['Classic', 'Fiction'],
        'a-bouquet': ['Classic', 'Poetry', 'Czech'],
        'the-miser': ['Classic', 'Comedy'],
        'the-little-prince': ['Classic', 'Philosophy'],
        'prayer-for-katerina-horovitzova': ['Classic', 'Czech'],
        'all-quiet-on-western-front': ['Classic', 'Historical'],
        'lord-of-the-rings': ['Fantasy', 'Classic'],
        persepolis: ['Biography', 'Graphic Novel'],
        'hound-of-the-baskervilles': ['Mystery', 'Classic'],
        'tales-of-the-little-quarter': ['Classic', 'Czech'],
        'change-kafka': ['Classic', 'Czech'],
        'r-u-r': ['Sci-Fi', 'Drama', 'Czech'],
        'robinson-crusoe': ['Classic', 'Adventure'],
        'romeo-and-juliet': ['Classic', 'Drama'],
        saturnin: ['Classic', 'Comedy', 'Czech'],
        'great-gatsby': ['Classic', 'Fiction'],
        'merry-wives-of-windsor': ['Classic', 'Comedy'],
        'murder-on-orient-express': ['Mystery', 'Classic'],
        'cowards-skvorecky': ['Classic', 'Czech'],
        'crime-and-punishment': ['Classic', 'Psychology'],
        'i-robot': ['Sci-Fi', 'Classic'],
        'study-in-scarlet': ['Mystery', 'Classic'],
        'become-investor': ['Finance', 'Investing'],
        'sport-is-pain': ['Biography', 'Sport'],
        'fault-in-our-stars': ['Fiction', 'Drama'],
        'ai-modern-approach': ['AI', 'Computer Science'],
        'flowers-for-algernon': ['Classic', 'Drama'],
        'contact-sagan': ['Sci-Fi', 'Space'],
        'safehold-series': ['Sci-Fi', 'Space'],
        'children-of-time': ['Sci-Fi', 'Space'],
        'rocket-propulsion-elements': ['Aerospace', 'Engineering']
      };
      return bookTags[item.id] || defaultTags;
    }

    return [];
  }

  getYear(item: LibraryItem): number {
    if (item.type === 'youtube') return 2026;
    const translator = this.ts.t();
    const dateStr = translator(`${item.translationPrefix}.date`);
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
        const title = translator(`${item.translationPrefix}.title`).toLowerCase();
        const desc = translator(`${item.translationPrefix}.desc`).toLowerCase();
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
        const titleA = translator(`${a.translationPrefix}.title`).toLowerCase();
        const titleB = translator(`${b.translationPrefix}.title`).toLowerCase();
        return titleA.localeCompare(titleB, this.currentLang());
      });
    } else if (mode === 'alpha-desc') {
      return [...items].sort((a, b) => {
        const titleA = translator(`${a.translationPrefix}.title`).toLowerCase();
        const titleB = translator(`${b.translationPrefix}.title`).toLowerCase();
        return titleB.localeCompare(titleA, this.currentLang());
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
