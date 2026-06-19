import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';

type LangCode = 'en' | 'cs';

interface LocalizedText {
  label?: string;
  description?: string;
  title?: string;
  subtitle?: string;
  bullets?: string[];
}

interface TimelineEvent {
  id: string;
  type: 'education' | 'work' | string;
  startDate: number;
  endDate: number | null;
  badge: {
    icon: string;
    themeColor: string;
    en: LocalizedText;
    cs: LocalizedText;
  };
  card: {
    en: LocalizedText;
    cs: LocalizedText;
  };
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TimelineModule],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.css']
})


export class Timeline {
  // Set default language
  public currentLang = signal<LangCode>('en');
  // Toggle language function for testing
  public toggleLanguage() {
    // 2. Update the signal using .set()
    this.currentLang.set(this.currentLang() === 'en' ? 'cs' : 'en');
  }

  // Paste your flattened JSON here
  public timelineEvents: TimelineEvent[] = [
    {
      "type": "education",
      "title_en": "Fontys University of Applied Sciences",
      "title_cs": "Univerzita aplikovaných věd Fontys",
      "subtitle_en": "Bachelor of Science in Mechatronics",
      "subtitle_cs": "Bakalář věd v oboru mechatroniky",
      "startYear": 2026,
      "startMonth": 9,
      "endYear": null,
      "endMonth": null,
      "upcoming": true,
      "icon": "school",
      "bullets_en": [
        "Status: conditionally accepted awaiting IBDP results on July 6th. ",
        "The programme is focused on practical knowledge, requiring mandatory internships at companies"
      ],
      "bullets_cs": [
        "Status: podmíněně přijat, čekám na výsledky IBDP 6. července. ",
        "Program se zaměřuje na praktické znalosti a vyžaduje povinné stáže ve firmách"
      ]
    },
    {
      "type": "work",
      "title_en": "Stadion Viktoria Plzeň",
      "title_cs": "Stadion Viktoria Plzeň",
      "subtitle_en": "Fast-food Stall",
      "subtitle_cs": "Obsluha Fast-food stánku",
      "startYear": 2025,
      "startMonth": 6,
      "endYear": 2025,
      "endMonth": 12,
      "icon": "sports_soccer",
      "bullets_en": [
        "The nature of the work consisted of selling, preparing food and interacting with customersat a fast pace, during a football match."
      ],
      "bullets_cs": [
        "Práce spočívala v prodeji, přípravě jídel a komunikaci se zákazníky ve vysokém tempu, během fotbalového utkání."
      ]
    },
    {
      "type": "work",
      "title_en": "PPA Arena",
      "title_cs": "PPA Arena",
      "subtitle_en": "Cashier & Paintball Event Organizer",
      "subtitle_cs": "Pokladní & organizátor paintballových akcí",
      "startYear": 2023,
      "startMonth": 2,
      "endYear": 2024,
      "endMonth": 6,
      "icon": "groups",
      "bullets_en": [
        "Managed daily logistics, safety briefs, and client relations for paintball groups ranging from 6 to 90 participants per day.",
        "Communicated event rules, handled fee collection, and guided foreign visitors (providing instructions in English and sometimes in German)."
      ],
      "bullets_cs": [
        "Správa denní logistiky, bezpečnostních školení a klientských vztahů pro paintballové skupiny od 6 do 90 účastníků denně.",
        "Vysvětlování pravidel, výběr poplatků a navigace zahraničních návštěvníků (poskytování instrukcí v angličtině a někdy v němčině)."
      ]
    },
    {
      "type": "education",
      "title_en": "Gymnázium Rokycany",
      "title_cs": "Gymnázium Rokycany",
      "subtitle_en": "International Baccalaureate (IB) Diploma Programme",
      "subtitle_cs": "Program International Baccalaureate (IB) Diploma",
      "startYear": 2022,
      "startMonth": 9,
      "endYear": 2026,
      "endMonth": 6,
      "ongoing": true,
      "icon": "school",
      "bullets_en": [
        "Have taken these courses: Mathematics Analysis and Approaches HL, Physics HL, English B HL, Chemistry SL, Geography SL, and Czech A: Literature SL."
      ],
      "bullets_cs": [
        "Navštěvoval jsem tyto předměty: Mathematics Analysis and Approaches HL, Physics HL, English B HL, Chemistry SL, Geography SL, and Czech A: Literature SL.",
        "IB program, obshajue 2 roky studia kompletně v angličtině."
      ]
    },
    {
      "type": "education",
      "title_en": "Primary school T.G.M Rokycany",
      "title_cs": "Základní škola T.G.M Rokycany",
      "subtitle_en": "International Baccalaureate (IB) Diploma Programme",
      "subtitle_cs": "Program International Baccalaureate (IB) Diploma",
      "startYear": 2013,
      "startMonth": 9,
      "endYear": 2022,
      "endMonth": 6,
      "ongoing": false,
      "icon": "school",
      "bullets_en": [
        "Have taken these courses: Mathematics Analysis and Approaches HL, Physics HL, English B HL, Chemistry SL, Geography SL, and Czech A: Literature SL."
      ],
      "bullets_cs": [
        "Navštěvoval jsem tyto předměty: Mathematics Analysis and Approaches HL, Physics HL, English B HL, Chemistry SL, Geography SL, and Czech A: Literature SL.",
        "IB program, obshajue 2 roky studia kompletně v angličtině."
      ]
    },
    {
      "type": "activity",
      "title_en": "Art Club",
      "title_cs": "Výtvarný kroužek ",
      "icon": "palette",
      "color": "#ff006e",
      "startYear": 2022,
      "startMonth": 9,
      "endYear": 2026,
      "endMonth": 6,
      "desc_en": "Attended an art club",
      "desc_cs": "Navštěvoval výtvarný kroužek"
    },
    {
      "type": "activity",
      "id": "physics",
      "icon": "bug_report",
      "color": "#3a86ff",
      "startYear": 2024,
      "startMonth": 6,
      "endYear": 2024,
      "endMonth": 11,
      "title_en": "Aerospace & Physics Research",
      "title_cs": "Výzkum v oblasti letectví a fyziky",
      "desc_en": "Designed and simulated a mathematical shadow projection model for convex 3D shapes using coordinate geometry, vector analysis, and Python.",
      "desc_cs": "Návrh a simulace matematického modelu stínové projekce pro konvexní 3D tvary s využitím analytické geometrie, vektorové analýzy a Pythonu."
    },
    {
      "type": "activity",
      "id": "sports",
      "icon": "sports_soccer",
      "color": "#ffbe0b",
      "startYear": 2025,
      "startMonth": 4,
      "endYear": 2025,
      "endMonth": 6,
      "title_en": "Rugby",
      "title_cs": "Rugby",
      "desc_en": "Briefly attended a rugby club",
      "desc_cs": "Krátce navštěvoval rugby"
    }
  ]
}
