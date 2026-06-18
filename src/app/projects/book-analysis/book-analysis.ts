import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-book-analysis',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './book-analysis.html',
  styleUrl: './book-analysis.css'
})
export class BookAnalysis implements OnInit {
  private route = inject(ActivatedRoute);
  private ts = inject(TranslationService);
  
  bookId = signal<string>('');
  currentLang = this.ts.currentLang;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.bookId.set(id);
      }
    });
  }

  t(key: string): string {
    return this.ts.t()(key);
  }
}
