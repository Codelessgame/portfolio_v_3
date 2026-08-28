import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslationService } from '../translation.service';
import projectsData from './projects-data.json';

export interface StepItem {
  stepNumber: number;
  title_en: string;
  title_cs: string;
  desc_en: string;
  desc_cs: string;
  image?: string;
  imageCaption_en?: string;
  imageCaption_cs?: string;
}

export interface AssetItem {
  type: 'image' | 'audio';
  src: string;
  title_en?: string;
  title_cs?: string;
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
  tags: string[];
  heroImage: string;
  overview_en: string;
  overview_cs: string;
  steps: StepItem[];
  assets: AssetItem[];
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
  private ts = inject(TranslationService);
  currentLang = this.ts.currentLang;

  allProjects: CaseStudyProject[] = projectsData as CaseStudyProject[];
  projectId = signal<string>('');
  activeAssetIndex = signal<number | null>(null);

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

  currentAsset = computed<AssetItem | null>(() => {
    const idx = this.activeAssetIndex();
    if (idx === null) return null;
    const p = this.project();
    if (!p.assets || p.assets.length === 0) return null;
    return p.assets[idx] || p.assets[0];
  });

  openAssetLibrary(startIndex = 0) {
    this.activeAssetIndex.set(startIndex);
  }

  openAssetBySrc(src: string) {
    const p = this.project();
    if (!p.assets || p.assets.length === 0) return;
    let idx = p.assets.findIndex(a => a.src === src);
    if (idx === -1) idx = 0;
    this.activeAssetIndex.set(idx);
  }

  selectAsset(idx: number) {
    this.activeAssetIndex.set(idx);
  }

  closeAssetLibrary() {
    this.activeAssetIndex.set(null);
  }

  nextAsset() {
    const curr = this.activeAssetIndex();
    if (curr === null) return;
    const len = this.project().assets?.length || 0;
    if (len === 0) return;
    this.activeAssetIndex.set((curr + 1) % len);
  }

  prevAsset() {
    const curr = this.activeAssetIndex();
    if (curr === null) return;
    const len = this.project().assets?.length || 0;
    if (len === 0) return;
    this.activeAssetIndex.set((curr - 1 + len) % len);
  }

  t(key: string): string {
    return this.ts.t()(key);
  }
}
