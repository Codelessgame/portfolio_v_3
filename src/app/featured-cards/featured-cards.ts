import { Component, inject, computed } from '@angular/core';
import { TranslationService } from '../translation.service';

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

  cards = computed<CardItem[]>(() => [
    {
      title: 'GitHub',
      description: this.ts.t()('creative.github_desc'),
      link: 'https://github.com/Codelessgame',
      imageUrl: '/home/code_img.jpg',
      linkText: this.ts.t()('creative.view_code')
    },
    {
      title: 'Instagram',
      description: this.ts.t()('creative.art_desc'),
      link: 'https://www.instagram.com/stanislav_ruza/profilecard/?igsh=enEzZHc2aGIxemk0',
      imageUrl: '/home/art_img.jpg',
      linkText: this.ts.t()('creative.view_art')
    },
    {
      title: 'Printables',
      description: this.ts.t()('creative.printables_desc'),
      link: 'https://www.printables.com/',
      imageUrl: '/home/3D_art.jpg',
      linkText: this.ts.t()('creative.view_prints')
    }
  ]);
}
