import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'cs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private _lang = signal<Lang>('en');

  currentLang = this._lang.asReadonly();

  toggleLanguage() {
    this._lang.update(l => l === 'en' ? 'cs' : 'en');
  }

  // A global lookup helper
  t = computed(() => {
    const l = this._lang();
    return (key: string): string => {
      return translations[l]?.[key] || key;
    };
  });
}

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navigation / Header
    'nav.home': 'Home',
    'nav.projects': 'Showcase',
    'header.title': 'STANISLAV RŮŽIČKA',

    'about.title': 'About Me',

    // Showcase / Creative Space Section
    'creative.title': 'My Creative Space',
    'creative.subtitle': 'A collection of code, art, and engineering projects',
    'creative.view_code': 'View Code',
    'creative.view_art': 'View Art',
    'creative.view_prints': 'View Prints',
    'creative.github_desc': 'Explore my open-source repositories, web apps, and coding projects.',
    'creative.art_desc': 'Check out my 2D art, designs, sketches, and creative works.',
    'creative.printables_desc': 'Browse my 3D printing designs, CAD models, and engineering parts.',

    // Timeline Section
    'timeline.title': 'My Journey',
    'timeline.subtitle': 'A timeline of my professional experience and education',
    'timeline.work': 'Work Experience',
    'timeline.edu': 'Education',
    'timeline.upcoming': 'Upcoming',
    'timeline.ongoing': 'Ongoing',

    'act.trace': 'Click to trace back to: ',

    'projects.title': 'Showcase & Library',
    'projects.subtitle': 'A curated collection of my engineering projects, books I read, and YouTube channels I watch.',
    'projects.featured_showcase': 'Featured Showcase',
    'projects.library_resources': 'Resources Library',
    'projects.search_placeholder': 'Search projects, books, or channels by name, author, tech...',
    'projects.filter_all': 'All Resources',
    'projects.filter_embedded': 'Embedded / Engineering',
    'projects.filter_ai': 'AI Models',
    'projects.filter_project': 'Projects',
    'projects.filter_book': 'Books',
    'projects.filter_youtube': 'YouTube Channels',
    'projects.filter_podcast': 'Podcasts',
    'projects.ban_media_label': 'Hide Media',
    'projects.ban_media_tooltip': 'Hide YouTube channels and Podcasts',
    'projects.status_all': 'All Statuses',
    'projects.status_finished': 'Finished',
    'projects.status_ongoing': 'Ongoing',

    // Footer Section
    'footer.contact': 'Contact Me',
    'footer.rights': 'All rights reserved.',
    'footer.designed_by': 'Designed & Built by Stanislav Růžička'
  },
  cs: {
    // Navigation / Header
    'nav.home': 'Domů',
    'nav.projects': 'Showcase',
    'header.title': 'STANISLAV RŮŽIČKA',

    'about.title': 'O mně',

    // Showcase / Creative Space Section
    'creative.title': 'Můj kreativní prostor',
    'creative.subtitle': 'Sbírka mých programovacích, uměleckých a strojírenských projektů',
    'creative.view_code': 'Zobrazit kód',
    'creative.view_art': 'Zobrazit umění',
    'creative.view_prints': 'Zobrazit tisky',
    'creative.github_desc': 'Prozkoumejte mé open-source repozitáře, webové aplikace a programátorské projekty.',
    'creative.art_desc': 'Podívejte se na mé 2D umění, designy, skici a kreativní tvorbu.',
    'creative.printables_desc': 'Procházejte mé 3D tištěné designy, CAD modely a inženýrské díly.',

    // Timeline Section
    'timeline.title': 'Moje cesta',
    'timeline.subtitle': 'Časová osa mého vzdělání a pracovních zkušeností',
    'timeline.work': 'Pracovní zkušenosti',
    'timeline.edu': 'Vzdělání',
    'timeline.upcoming': 'Budoucí',
    'timeline.ongoing': 'Probíhá',


    'act.trace': 'Klikněte pro návrat k: ',

    'projects.title': 'Showcase & Knihovna',
    'projects.subtitle': 'Vybraná sbírka mých inženýrských projektů, knih, které čtu, a YouTube kanálů, které doporučuji.',
    'projects.featured_showcase': 'Vybrané projekty',
    'projects.library_resources': 'Knihovna a zdroje',
    'projects.search_placeholder': 'Hledat projekty, knihy nebo kanály podle názvu, autora, technologií...',
    'projects.filter_all': 'Všechny zdroje',
    'projects.filter_embedded': 'Vestavěné systémy / Inženýrství',
    'projects.filter_ai': 'AI Modely',
    'projects.filter_project': 'Projekty',
    'projects.filter_book': 'Knihy',
    'projects.filter_youtube': 'YouTube kanály',
    'projects.filter_podcast': 'Podcasty',
    'projects.ban_media_label': 'Skrýt média',
    'projects.ban_media_tooltip': 'Skrýt YouTube kanály a Podcasty',
    'projects.status_all': 'Všechny stavy',
    'projects.status_finished': 'Dokončeno',
    'projects.status_ongoing': 'Probíhá',

    // Footer Section
    'footer.contact': 'Kontaktujte mě',
    'footer.rights': 'Všechna práva vyhrazena.',
    'footer.designed_by': 'Navrhl a vytvořil Stanislav Růžička'
  }
};
