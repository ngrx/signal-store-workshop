import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'albums', loadChildren: () => import('@/albums/albums.routes') },
  {
    path: '**',
    loadComponent: () => import('@/core/not-found/not-found.component'),
    title: 'Not Found',
  },
];
