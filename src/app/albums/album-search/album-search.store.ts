import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, pipe, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { SortOrder } from '@/shared/models/sort-order.model';
import { Album, searchAlbums, sortAlbums } from '@/albums/album.model';
import { AlbumsService } from '@/albums/albums.service';

export const AlbumSearchStore = signalStore(
  withState({
    albums: [] as Album[],
    showProgress: false,
    query: '',
    order: 'asc' as SortOrder,
  }),
  withComputed(({ albums, query, order, showProgress }) => {
    const filteredAlbums = computed(() => {
      const searchedAlbums = searchAlbums(albums(), query());

      return sortAlbums(searchedAlbums, order());
    });

    return {
      filteredAlbums,
      showSpinner: computed(() => showProgress() && albums().length === 0),
      totalAlbums: computed(() => filteredAlbums().length),
    };
  }),
  withMethods(
    (
      store,
      albumsService = inject(AlbumsService),
      snackBar = inject(MatSnackBar),
    ) => ({
      updateQuery(query: string): void {
        patchState(store, { query });
      },
      updateOrder(order: SortOrder): void {
        patchState(store, { order });
      },
      _loadAllAlbums: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { showProgress: true })),
          exhaustMap(() => {
            return albumsService.getAll().pipe(
              tapResponse({
                next: (albums) => {
                  patchState(store, { albums, showProgress: false });
                },
                error: (error: { message: string }) => {
                  snackBar.open(error.message, 'Close', { duration: 5_000 });
                  patchState(store, { showProgress: false });
                },
              }),
            );
          }),
        ),
      ),
    }),
  ),
  withHooks({
    onInit({ _loadAllAlbums }) {
      _loadAllAlbums();
    },
  }),
);
