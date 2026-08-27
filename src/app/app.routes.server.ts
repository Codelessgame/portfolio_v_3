import { RenderMode, ServerRoute } from '@angular/ssr';

const projectParams = async () => [
  { id: 'rc_car' },
  { id: 'railway' },
  { id: 'digit' },
  { id: 'music' },
  { id: 'slm' }
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

