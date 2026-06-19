import { Component, inject, computed } from '@angular/core';
import { SplitSection } from '../split-section/split-section';
import { FeaturedCards } from '../featured-cards/featured-cards';
import { Timeline } from '../timeline/timeline';
import { TranslationService } from '../translation.service';
import aboutParagraphs from './about.json';

@Component({
  selector: 'app-home',
  imports: [SplitSection, FeaturedCards, Timeline],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private ts = inject(TranslationService);

  t(key: string): string {
    return this.ts.t()(key);
  }

  paragraphs = computed<string[]>(() => {
    const lang = this.ts.currentLang();
    return aboutParagraphs.map(p => lang === 'en' ? p.en : p.cs);
  });
}
