import { Component, inject } from '@angular/core';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private ts = inject(TranslationService);

  t(key: string): string {
    return this.ts.t()(key);
  }
}

