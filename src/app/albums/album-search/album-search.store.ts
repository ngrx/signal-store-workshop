import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, filter, pipe, tap } from 'rxjs';
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
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@/shared/state/request-status.feature';
import { Album, searchAlbums, sortAlbums } from '@/albums/album.model';
import { AlbumsService } from '@/albums/albums.service';

export const AlbumSearchStore = signalStore(
  withState({
    albums: [] as Album[],
    query: '',
    order: 'asc' as SortOrder,
  }),
  withRequestStatus(),
  withComputed(({ albums, query, order, isPending }) => {
    const filteredAlbums = computed(() => {
      const searchedAlbums = searchAlbums(albums(), query());

      return sortAlbums(searchedAlbums, order());
    });

    return {
      filteredAlbums,
      showProgress: isPending,
      showSpinner: computed(() => isPending() && albums().length === 0),
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
          tap(() => patchState(store, setPending())),
          exhaustMap(() => {
            return albumsService.getAll().pipe(
              tapResponse({
                next: (albums) => patchState(store, { albums }, setFulfilled()),
                error: (error: { message: string }) => {
                  patchState(store, setError(error.message));
                },
              }),
            );
          }),
        ),
      ),
      _notifyOnError: rxMethod<string | null>(
        pipe(
          filter(Boolean),
          tap((error) => snackBar.open(error, 'Close', { duration: 5_000 })),
        ),
      ),
    }),
  ),
  withHooks({
    onInit(store) {
      store._loadAllAlbums();
      store._notifyOnError(store.error);
    },
  }),
);
