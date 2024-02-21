import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./album-search/album-search.component'),
    title: 'Album Search',
  },
  {
    path: ':albumId',
    loadComponent: () =>
      import('@/albums/album-overview/album-overview.component'),
    title: 'Album Overview',
  },
];

export default routes;
