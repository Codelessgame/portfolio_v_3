import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Projects } from './projects/projects';
import { BookAnalysis } from './projects/book-analysis/book-analysis';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'projects', component: Projects },
  { path: 'projects/analysis/:id', component: BookAnalysis },
  { path: '**', redirectTo: '' }
];
