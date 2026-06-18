import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
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
