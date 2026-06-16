import { Component, inject } from '@angular/core';
import { SplitSection } from '../split-section/split-section';
import { FeaturedCards } from '../featured-cards/featured-cards';
import { Timeline } from '../timeline/timeline';
import { TranslationService } from '../translation.service';

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
}
