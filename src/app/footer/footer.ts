import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private ts = inject(TranslationService);
  emailCopied = signal(false);

  copyEmail() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('stanik.ruzicka@gmail.com').then(() => {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2000);
      }).catch(() => {});
    }
  }

  t(key: string): string {
    return this.ts.t()(key);
  }
}

