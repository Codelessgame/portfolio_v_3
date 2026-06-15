import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header'; // 1. Import the Header class
import { SplitSection } from './split-section/split-section';
import { FeaturedCards } from './featured-cards/featured-cards';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SplitSection, FeaturedCards], // 2. Add Header, SplitSection, and FeaturedCards to the imports array
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio_v_3');
}
