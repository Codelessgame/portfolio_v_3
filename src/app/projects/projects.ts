import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../translation.service';

export interface ProjectItem {
  id: string;
  image: string;
  category: 'embedded' | 'ai';
  status: 'finished' | 'ongoing';
  translationPrefix: string;
}

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  private ts = inject(TranslationService);

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');
  selectedStatus = signal<string>('all');

  projects: ProjectItem[] = [
    {
      id: 'rc_car',
      image: 'rc_car_project.png',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.rc_car'
    },
    {
      id: 'railway',
      image: 'railway_switches_project.png',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.railway'
    },
    {
      id: 'digit',
      image: 'digit_recognizer_project.png',
      category: 'ai',
      status: 'finished',
      translationPrefix: 'projects.digit'
    },
    {
      id: 'music',
      image: 'music_attention_project.png',
      category: 'ai',
      status: 'finished',
      translationPrefix: 'projects.music'
    },
    {
      id: 'slm',
      image: 'small_language_model_project.png',
      category: 'ai',
      status: 'ongoing',
      translationPrefix: 'projects.slm'
    }
  ];

  filteredProjects = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const stat = this.selectedStatus();
    const translator = this.ts.t();

    return this.projects.filter(p => {
      // Category Filter
      if (cat !== 'all' && p.category !== cat) return false;

      // Status Filter
      if (stat !== 'all' && p.status !== stat) return false;

      // Search Filter
      if (query) {
        const title = translator(`${p.translationPrefix}.title`).toLowerCase();
        const desc = translator(`${p.translationPrefix}.desc`).toLowerCase();
        const date = translator(`${p.translationPrefix}.date`).toLowerCase();
        const catName = translator(`projects.filter_${p.category}`).toLowerCase();
        const statName = translator(`projects.status_${p.status}`).toLowerCase();

        return (
          title.includes(query) ||
          desc.includes(query) ||
          date.includes(query) ||
          catName.includes(query) ||
          statName.includes(query)
        );
      }

      return true;
    });
  });

  t(key: string): string {
    return this.ts.t()(key);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  setStatus(status: string) {
    this.selectedStatus.set(status);
  }
}
