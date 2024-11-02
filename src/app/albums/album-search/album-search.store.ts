import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, pipe, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SortOrder } from '@/shared/models/sort-order.model';
import { searchAlbums, sortAlbums } from '@/albums/album.model';
import { AlbumsStore } from '@/albums/albums.store';

export const AlbumSearchStore = signalStore(
  withState({
    query: '',
    order: 'asc' as SortOrder,
  }),
  withComputed(({ query, order }, albumsStore = inject(AlbumsStore)) => {
    const filteredAlbums = computed(() => {
      const searchedAlbums = searchAlbums(albumsStore.entities(), query());
      return sortAlbums(searchedAlbums, order());
    });

    return {
      filteredAlbums,
      showProgress: albumsStore.isPending,
      showSpinner: computed(
        () => albumsStore.isPending() && albumsStore.entities().length === 0,
      ),
      totalAlbums: computed(() => filteredAlbums().length),
    };
  }),
  withMethods((store, snackBar = inject(MatSnackBar)) => ({
    updateQuery(query: string): void {
      patchState(store, { query });
    },
    updateOrder(order: SortOrder): void {
      patchState(store, { order });
    },
    _notifyOnError: rxMethod<string | null>(
      pipe(
        filter(Boolean),
        tap((error) => snackBar.open(error, 'Close', { duration: 5_000 })),
      ),
    ),
  })),
  withHooks({
    onInit(store, albumsStore = inject(AlbumsStore)) {
      albumsStore.loadAllAlbums();
      store._notifyOnError(albumsStore.error);
    },
  }),
);
