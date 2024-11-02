import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { withRouteParams } from '@/shared/state/route-params.feature';
import {
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@/shared/state/request-status.feature';
import { AlbumsStore } from '@/albums/albums.store';
import { AlbumsService } from '@/albums/albums.service';

export const AlbumDetailsStore = signalStore(
  withRequestStatus(),
  withRouteParams({ albumId: (param) => Number(param) }),
  withComputed(({ albumId }, albumsStore = inject(AlbumsStore)) => ({
    album: computed(() =>
      albumId() ? albumsStore.entityMap()[albumId()] : null,
    ),
  })),
  withMethods(
    (
      albumDetailsStore,
      albumsStore = inject(AlbumsStore),
      albumsService = inject(AlbumsService),
      router = inject(Router),
    ) => ({
      loadAlbumIfNotLoaded: rxMethod<number>(
        pipe(
          filter((id) => !albumsStore.entityMap()[id]),
          tap(() => patchState(albumDetailsStore, setPending())),
          switchMap((id) => {
            return albumsService.getById(id).pipe(
              tapResponse({
                next: (album) => {
                  patchState(albumDetailsStore, setFulfilled());
                  albumsStore.setAlbum(album);
                },
                error: () => router.navigateByUrl('/not-found'),
              }),
            );
          }),
        ),
      ),
    }),
  ),
  withHooks({
    onInit({ loadAlbumIfNotLoaded, albumId }) {
      loadAlbumIfNotLoaded(albumId);
    },
  }),
);
