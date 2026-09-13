import { RenderMode, ServerRoute } from '@angular/ssr';

const projectParams = async () => [
  { id: 'railway' },
  { id: 'digit' }
];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'project/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: projectParams
  },
  {
    path: 'projects/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: projectParams
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

