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
    'nav.projects': 'My Projects',
    'header.title': 'STANISLAV RŮŽIČKA',

    // About Me Section
    'about.title': 'About me',
    'about.subtitle': 'Who I am',
    'about.p1': 'Hi, I’m Stanislav Růžička, a high school student studying the International Baccalaureate Diploma Programme (IBDP).',
    'about.p2': 'I am passionate about engineering, programming, and design. I enjoy creating both in the digital and physical world, from coding applications to designing and 3D-printing mechanical parts.',
    'about.p3': 'My technical background includes CAD design (Fusion 360, FreeCAD), circuit board design (KiCAD), and programming in Python, Angular, C, and TypeScript.',

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
    
    // Timeline Card 1: Fontys
    'timeline.fontys.title': 'Fontys University of Applied Sciences',
    'timeline.fontys.sub': 'Bachelor of Science in Mechatronics',
    'timeline.fontys.date': 'Sept 2026 – Future (Upcoming)',
    'timeline.fontys.b1': 'Enrolled in the Bachelor of Science in Mechatronics engineering program.',
    'timeline.fontys.b2': 'Focusing on integrating mechanical engineering, electrical engineering, and computer systems.',
    'timeline.fontys.b3': 'Applying practical CAD/CAM, software engineering, and hardware prototyping skills in a collaborative project-based curriculum.',

    // Timeline Card 2: Viktoria
    'timeline.viktoria.title': 'Stadion Viktoria Plzeň',
    'timeline.viktoria.sub': 'Hospitality Server',
    'timeline.viktoria.date': '2025',
    'timeline.viktoria.b1': 'Delivered rapid, high-quality customer service in high-pressure, fast-paced sports stadium environments.',
    'timeline.viktoria.b2': 'Prepared and sold food and concessions while managing inventory and cash transactions for large matchday crowds.',
    'timeline.viktoria.b3': 'Maintained a welcoming, organized, and efficient service atmosphere under pressure.',

    // Timeline Card 3: PPA Arena
    'timeline.ppa.title': 'PPA Arena',
    'timeline.ppa.sub': 'Cashier & Paintball Event Organizer',
    'timeline.ppa.date': '2023 – 2024',
    'timeline.ppa.b1': 'Managed daily logistics, safety briefs, and client relations for paintball groups ranging from 6 to 90 participants per day.',
    'timeline.ppa.b2': 'Communicated event rules, handled fee collection, and guided foreign visitors (providing instructions in English and German).',
    'timeline.ppa.b3': 'Operated POS ticketing terminals, balancing concession sales and ticketing checkouts in high-energy environments.',

    // Timeline Card 4: Rokycany
    'timeline.rokycany.title': 'Gymnázium Rokycany',
    'timeline.rokycany.sub': 'International Baccalaureate (IB) Diploma Programme',
    'timeline.rokycany.date': 'Sept 2022 – June 2026 (ongoing)',
    'timeline.rokycany.b1': 'Advanced coursework: Mathematics Analysis and Approaches HL, Physics HL, English B HL, Chemistry SL, Geography SL, and Czech A: Literature SL.',
    'timeline.rokycany.b2': 'Developed an advanced computational physics/math model calculating the shadow areas of convex shapes using 3D vector analysis and the Shoelace formula (Math IA).',
    'timeline.rokycany.b3': 'Balanced rigorous academic work with self-taught engineering skills (CAD in Fusion 360, PCBs in KiCad, AI architectures in PyTorch).',

    // Personal Activities
    'act.art.label': 'Art Club & School Volunteering',
    'act.art.desc': 'Volunteered to coordinate custom physical/digital artwork commissions and designed school community farewell gifts, utilizing acrylic painting and pastels.',
    'act.physics.label': 'Aerospace & Physics Research',
    'act.physics.desc': 'Designed and simulated a mathematical shadow projection model for convex 3D shapes using coordinate geometry, vector analysis, and Python.',
    'act.sports.label': 'Team Sports (Football/Floorball)',
    'act.sports.desc': 'Engaged in competitive team sports to build tactical cooperation, leadership, and quick decision-making under physical and mental pressure.',
    'act.trace': 'Click to trace back to: ',

    // Projects Page Translations
    'projects.title': 'My Projects',
    'projects.subtitle': 'A collection of my engineering, hardware, and AI projects',
    'projects.search_placeholder': 'Search projects by name, technology, status...',
    'projects.filter_all': 'All Categories',
    'projects.filter_embedded': 'Embedded / Engineering',
    'projects.filter_ai': 'AI Models',
    'projects.status_all': 'All Statuses',
    'projects.status_finished': 'Finished',
    'projects.status_ongoing': 'Ongoing',
    
    // Project 1: RC Car
    'projects.rc_car.title': 'Remote Controlled Car',
    'projects.rc_car.desc': 'A smart, custom-built remote-controlled vehicle designed with obstacle avoidance sensors, optimized chassis, and a dual-motor driver system.',
    'projects.rc_car.date': 'March 2024 – December 2024',
    
    // Project 2: Train switches
    'projects.railway.title': 'Model Railways Automatic Train Switches',
    'projects.railway.desc': 'An automated railway track switching system designed to direct trains dynamically based on route logic, sensor feedbacks, and integrated control microchips.',
    'projects.railway.date': 'November 2024 – June 2026',
    
    // Project 3: Digit recognizer
    'projects.digit.title': 'Digit Recognizer',
    'projects.digit.desc': 'A deep neural network (CNN) trained to classify handwritten digits with high accuracy, complete with a drawing canvas interface for real-time validation.',
    'projects.digit.date': 'June 9, 2026',
    
    // Project 4: Music attention
    'projects.music.title': 'Music Attention',
    'projects.music.desc': 'An audio analyzer utilizing self-attention mechanism layers in PyTorch to classify musical features and map spectral attention coefficients over time.',
    'projects.music.date': 'June 10, 2026 – June 11, 2026',
    
    // Project 5: Small language model
    'projects.slm.title': 'Small Language Model',
    'projects.slm.desc': 'An ongoing project building and pre-training a lightweight Transformer-based GPT style language model to understand structural text dependencies.',
    'projects.slm.date': 'June 14, 2026 – Ongoing'
  },
  cs: {
    // Navigation / Header
    'nav.home': 'Domů',
    'nav.projects': 'Mé projekty',
    'header.title': 'STANISLAV RŮŽIČKA',

    // About Me Section
    'about.title': 'O mně',
    'about.subtitle': 'Kdo jsem',
    'about.p1': 'Ahoj, jsem Stanislav Růžička, student středního studia v programu International Baccalaureate Diploma Programme (IBDP).',
    'about.p2': 'Mým nadšením je inženýrství, programování a design. Rád tvořím v digitálním i fyzickém světě, od kódování aplikací až po navrhování a 3D tisk mechanických dílů.',
    'about.p3': 'Mé technické zázemí zahrnuje CAD design (Fusion 360, FreeCAD), návrh plošných spojů (KiCAD) a programování v Pythonu, Angularu, C a TypeScriptu.',

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
    
    // Timeline Card 1: Fontys
    'timeline.fontys.title': 'Univerzita aplikovaných věd Fontys',
    'timeline.fontys.sub': 'Bakalář věd v oboru mechatroniky',
    'timeline.fontys.date': 'Září 2026 – Budoucnost (Následující)',
    'timeline.fontys.b1': 'Zapsán do programu bakaláře věd v oboru mechatroniky.',
    'timeline.fontys.b2': 'Zaměření na propojení strojírenství, elektrotechniky a počítačových systémů.',
    'timeline.fontys.b3': 'Uplatňování praktických dovedností v CAD/CAM, softwarovém inženýrství a prototypování hardwaru v týmových projektech.',

    // Timeline Card 2: Viktoria
    'timeline.viktoria.title': 'Stadion Viktoria Plzeň',
    'timeline.viktoria.sub': 'Obsluha v pohostinství',
    'timeline.viktoria.date': '2025',
    'timeline.viktoria.b1': 'Poskytování rychlého a kvalitního zákaznického servisu v dynamickém prostředí sportovního stadionu.',
    'timeline.viktoria.b2': 'Příprava a prodej občerstvení, správa zásob a zpracování plateb během zápasů pro velké davy fanoušků.',
    'timeline.viktoria.b3': 'Udržování příjemné a efektivní atmosféry servisu pod časovým a kapacitním tlakem.',

    // Timeline Card 3: PPA Arena
    'timeline.ppa.title': 'PPA Arena',
    'timeline.ppa.sub': 'Pokladní & organizátor paintballových akcí',
    'timeline.ppa.date': '2023 – 2024',
    'timeline.ppa.b1': 'Správa denní logistiky, bezpečnostních školení a klientských vztahů pro paintballové skupiny od 6 do 90 účastníků denně.',
    'timeline.ppa.b2': 'Vysvětlování pravidel, výběr poplatků a navigace zahraničních návštěvníků (poskytování instrukcí v angličtině a němčině).',
    'timeline.ppa.b3': 'Obsluha pokladních terminálů POS, prodej občerstvení a lístků v energickém prostředí.',

    // Timeline Card 4: Rokycany
    'timeline.rokycany.title': 'Gymnázium Rokycany',
    'timeline.rokycany.sub': 'Program International Baccalaureate (IB) Diploma',
    'timeline.rokycany.date': 'Září 2022 – Červen 2026 (probíhá)',
    'timeline.rokycany.b1': 'Pokročilé kurzy: Matematická analýza a přístupy HL, Fyzika HL, Angličtina B HL, Chemie SL, Geografie SL a Česká literatura SL.',
    'timeline.rokycany.b2': 'Vývoj pokročilého matematicko-fyzikálního modelu pro výpočet stínových ploch konvexních tvarů pomocí 3D vektorové analýzy a L\'Huilierova vzorce (Math IA).',
    'timeline.rokycany.b3': 'Vyvažování náročného akademického studia se samostudiem inženýrských dovedností (CAD ve Fusion 360, DPS v KiCadu, AI architektury v PyTorchi).',

    // Personal Activities
    'act.art.label': 'Výtvarný kroužek & školní dobrovolnictví',
    'act.art.desc': 'Dobrovolná koordinace zakázek na fyzické a digitální umění, tvorba rozlučkových dárků pro školní komunitu (akrylové malby, pastely).',
    'act.physics.label': 'Výzkum v oblasti letectví a fyziky',
    'act.physics.desc': 'Návrh a simulace matematického modelu stínové projekce pro konvexní 3D tvary s využitím analytické geometrie, vektorové analýzy a Pythonu.',
    'act.sports.label': 'Týmové sporty (Fotbal/Florbal)',
    'act.sports.desc': 'Účast v soutěžních týmových sportech s cílem rozvíjet taktickou spolupráci, vůdčí schopnosti a rychlé rozhodování pod fyzickým a psychickým tlakem.',
    'act.trace': 'Klikněte pro návrat k: ',

    // Projects Page Translations
    'projects.title': 'Mé projekty',
    'projects.subtitle': 'Sbírka mých inženýrských, hardwarových a AI projektů',
    'projects.search_placeholder': 'Hledat projekty podle názvu, technologie, stavu...',
    'projects.filter_all': 'Všechny kategorie',
    'projects.filter_embedded': 'Vestavěné systémy / Inženýrství',
    'projects.filter_ai': 'AI Modely',
    'projects.status_all': 'Všechny stavy',
    'projects.status_finished': 'Dokončeno',
    'projects.status_ongoing': 'Probíhá',
    
    // Project 1: RC Car
    'projects.rc_car.title': 'Dálkově ovládané auto',
    'projects.rc_car.desc': 'Chytré, na zakázku postavené dálkově ovládané vozidlo s integrovanými senzory pro vyhýbání se překážkám, optimalizovaným podvozkem a systémem pohonu se dvěma motory.',
    'projects.rc_car.date': 'Březen 2024 – Prosinec 2024',
    
    // Project 2: Train switches
    'projects.railway.title': 'Automatické výhybky pro modelovou železnici',
    'projects.railway.desc': 'Automatizovaný systém řízení a přepínání kolejí navržený k dynamickému směrování vlaků na základě logiky tras, zpětné vazby ze senzorů a integrovaných mikročipů.',
    'projects.railway.date': 'Listopad 2024 – Červen 2026',
    
    // Project 3: Digit recognizer
    'projects.digit.title': 'Rozpoznávání číslic',
    'projects.digit.desc': 'Hluboká neuronová síť (CNN) natrénovaná na klasifikaci ručně psaných číslic s vysokou přesností, doplněná o interaktivní kreslicí plátno pro okamžité rozpoznání.',
    'projects.digit.date': '9. června 2026',
    
    // Project 4: Music attention
    'projects.music.title': 'Hudební pozornost (Music Attention)',
    'projects.music.desc': 'Analyzátor zvuku využívající vrstvy mechanismu self-attention v PyTorch pro klasifikaci hudebních prvků a mapování spektrálních koeficientů pozornosti v čase.',
    'projects.music.date': '10. června 2026 – 11. června 2026',
    
    // Project 5: Small language model
    'projects.slm.title': 'Malý jazykový model',
    'projects.slm.desc': 'Probíhající projekt vývoje a předtrénování lehkého jazykového modelu založeného na architektuře Transformer (styl GPT) pro pochopení strukturních textových závislostí.',
    'projects.slm.date': '14. června 2026 – Probíhá'
  }
};
