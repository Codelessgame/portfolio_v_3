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
    'nav.projects': 'Library',
    'header.title': 'STANISLAV RŮŽIČKA',

    'about.title': 'About Me',

    // Skills Network Section
    'skills.title': 'Skills & Tools',
    'skills.subtitle': 'Interactive mind map of programming languages, engineering software, and daily tools',
    'skills.drag_hint': 'Hover over any icon to reveal details • Click categories to fold branches',
    'skills.cat_programming': 'Programming & Frameworks',
    'skills.cat_hardware': '3D & Hardware',
    'skills.cat_office': 'Productivity & Office',
    'skills.cat_tools': 'Developer Tools',
    'skills.cat_other': 'Other',

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
    'timeline.subtitle': 'Interactive roadmap of education, work experience, and extracurriculars',
    'timeline.upcoming': 'Upcoming',
    'timeline.ongoing': 'Ongoing',
    'timeline.finished': 'Finished',
    'timeline.now': 'NOW',
    'timeline.select_item_hint': 'Click any milestone to jump directly to its details',
    'timeline.scroll_hint': '← Scroll or swipe horizontally to explore the roadmap →',
    'timeline.key_skills': 'Key Highlights & Skills',
    'timeline.all_milestones': 'All Milestones',
    'timeline.focused_milestone': 'Selected Milestone',
    'timeline.show_all': 'Show All Milestones',
    'timeline.focus_selected': 'Focus Selected Only',
    'timeline.shift_scroll_tip': 'Tip:',
    'timeline.scroll_action': 'Scroll to pan',

    'act.trace': 'Click to trace back to: ',

    'projects.title': 'Library',
    'projects.subtitle': 'A curated collection of my engineering projects, books I read, podcasts I listen to, and YouTube channels I watch.',
    'projects.featured_showcase': 'Featured Projects',
    'projects.library_resources': 'Library Search',
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
    'nav.projects': 'Knihovna',
    'header.title': 'STANISLAV RŮŽIČKA',

    'about.title': 'O mně',

    // Skills Network Section
    'skills.title': 'Dovednosti a nástroje',
    'skills.subtitle': 'Interaktivní myšlenková mapa programovacích jazyků, inženýrského softwaru a nástrojů',
    'skills.drag_hint': 'Přejeďte myší přes ikonu pro název • Kliknutím sbalíte větve',
    'skills.cat_programming': 'Programování a frameworky',
    'skills.cat_hardware': '3D a hardware',
    'skills.cat_office': 'Kancelář a produktivita',
    'skills.cat_tools': 'Vývojářské nástroje',
    'skills.cat_other': 'Ostatní',

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
    'timeline.subtitle': 'Interaktivní časová osa vzdělání, pracovních zkušeností a mimoškolních aktivit',
    'timeline.upcoming': 'Budoucí',
    'timeline.ongoing': 'Probíhá',
    'timeline.finished': 'Dokončeno',
    'timeline.now': 'NYNÍ',
    'timeline.select_item_hint': 'Klikněte na milník pro přímý přechod na podrobnosti',
    'timeline.scroll_hint': '← Posuňte vodorovně pro procházení časové osy →',
    'timeline.key_skills': 'Klíčové dovednosti a body',
    'timeline.all_milestones': 'Všechny milníky',
    'timeline.focused_milestone': 'Vybraný milník',
    'timeline.show_all': 'Zobrazit všechny milníky',
    'timeline.focus_selected': 'Zobrazit pouze vybraný',
    'timeline.shift_scroll_tip': 'Tip:',
    'timeline.scroll_action': 'Kolečko myši pro posun',


    'act.trace': 'Klikněte pro návrat k: ',

    'projects.title': 'Knihovna',
    'projects.subtitle': 'Vybraná sbírka mých inženýrských projektů, knih, které čtu, podcastů, které poslouchám, a YouTube kanálů, které doporučuji.',
    'projects.featured_showcase': 'Vybrané projekty',
    'projects.library_resources': 'Vyhledávání v knihovně',
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
