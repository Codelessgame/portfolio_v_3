import { Component, inject, computed } from '@angular/core';
import { TranslationService } from '../translation.service';
import creativeCards from './creative.json';

interface CardItem {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  linkText: string;
}

@Component({
  selector: 'app-featured-cards',
  imports: [],
  templateUrl: './featured-cards.html',
  styleUrl: './featured-cards.css',
})
export class FeaturedCards {
  private ts = inject(TranslationService);

  t(key: string): string {
    return this.ts.t()(key);
  }

  cards = computed<CardItem[]>(() => {
    const lang = this.ts.currentLang();
    return creativeCards.map(card => ({
      title: card.title,
      description: lang === 'en' ? card.desc_en : card.desc_cs,
      link: card.link,
      imageUrl: card.imageUrl,
      linkText: lang === 'en' ? card.linkText_en : card.linkText_cs
    }));
  });
}
