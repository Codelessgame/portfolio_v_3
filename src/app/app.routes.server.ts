import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projects/analysis/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { id: 'atomic-habits' },
        { id: 'clean-code' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
