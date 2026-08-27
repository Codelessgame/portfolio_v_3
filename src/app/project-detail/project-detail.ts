import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslationService } from '../translation.service';
import projectsData from './projects-data.json';

export interface ProjectSpec {
  label_en: string;
  label_cs: string;
  value: string;
}

export interface ChallengeItem {
  title: string;
  desc: string;
}

export interface GalleryItem {
  src: string;
  caption_en: string;
  caption_cs: string;
}

export interface CaseStudyProject {
  id: string;
  category: 'embedded' | 'ai';
  icon: string;
  title_en: string;
  title_cs: string;
  subtitle_en: string;
  subtitle_cs: string;
  date_en: string;
  date_cs: string;
  status: 'finished' | 'ongoing';
  github?: string;
  demo?: string;
  tags: string[];
  heroImage: string;
  specs: ProjectSpec[];
  story: {
    problem_en: string;
    problem_cs: string;
    architecture_en: string;
    architecture_cs: string;
    challenges_en: ChallengeItem[];
    challenges_cs: ChallengeItem[];
    results_en: string;
    results_cs: string;
  };
  gallery: GalleryItem[];
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ts = inject(TranslationService);
  currentLang = this.ts.currentLang;

  allProjects: CaseStudyProject[] = projectsData as CaseStudyProject[];
  projectId = signal<string>('');
  activeLightbox = signal<GalleryItem | null>(null);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      this.projectId.set(id);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  project = computed(() => {
    const id = this.projectId();
    return this.allProjects.find(p => p.id === id) || this.allProjects[0];
  });

  prevProject = computed(() => {
    const idx = this.allProjects.findIndex(p => p.id === this.project().id);
    if (idx <= 0) return null;
    return this.allProjects[idx - 1];
  });

  nextProject = computed(() => {
    const idx = this.allProjects.findIndex(p => p.id === this.project().id);
    if (idx < 0 || idx >= this.allProjects.length - 1) return null;
    return this.allProjects[idx + 1];
  });

  openLightbox(item: GalleryItem) {
    this.activeLightbox.set(item);
  }

  closeLightbox() {
    this.activeLightbox.set(null);
  }

  t(key: string): string {
    return this.ts.t()(key);
  }
}
