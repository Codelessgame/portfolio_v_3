import { Component, Input, OnChanges, SimpleChanges, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Star } from './star/star';
import { TranslationService } from '../translation.service';

const letters = "AÁBCČDĎEÉĚFGHIÍJKLMNŇOÓPQRŘSŠTŤUÚŮVWXYZŽ0123456789";

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterLink, Star],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnChanges {
  @Input() value: string = '';
  currentValue = signal('');
  stars = Array.from({ length: 20 });
  interval: any;

  private ts = inject(TranslationService);
  currentLang = this.ts.currentLang;

  t(key: string): string {
    return this.ts.t()(key);
  }

  toggleLanguage() {
    this.ts.toggleLanguage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('value')) {
      this.currentValue.set(this.value);
    }
  }

  startAnimation() {
    clearInterval(this.interval)

    this.currentValue.set(this.value);
    let iteration = 0

    this.interval = setInterval(() => {
      const nextVal = this.value
        .split("")
        .map((char, index) =>
          index >= iteration
            ? letters[Math.floor(Math.random() * letters.length)]
            : char
        )
        .join("");
      
      this.currentValue.set(nextVal);

      if (iteration >= this.value.length) {
        clearInterval(this.interval)
      }

      iteration += 1 / 3
    }, 30)
  }

}