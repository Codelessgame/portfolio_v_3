import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { SplitSection } from './split-section/split-section';
import { FeaturedCards } from './featured-cards/featured-cards';
import { Timeline } from './timeline/timeline';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SplitSection, FeaturedCards, Timeline],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio_v_3');
  private ts = inject(TranslationService);

  t(key: string): string {
    return this.ts.t()(key);
  }
}
