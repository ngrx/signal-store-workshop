import { inject } from '@angular/core';
import { exhaustMap, pipe, tap } from 'rxjs';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { tapResponse } from '@ngrx/operators';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@/shared/state/request-status.feature';
import { Album } from '@/albums/album.model';
import { AlbumsService } from '@/albums/albums.service';

export const AlbumsStore = signalStore(
  { providedIn: 'root' },
  withEntities<Album>(),
  withRequestStatus(),
  withMethods((store, albumsService = inject(AlbumsService)) => ({
    loadAllAlbums: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        exhaustMap(() => {
          return albumsService.getAll().pipe(
            tapResponse({
              next: (albums) => {
                patchState(store, setAllEntities(albums), setFulfilled());
              },
              error: (error: { message: string }) => {
                patchState(store, setError(error.message));
              },
            }),
          );
        }),
      ),
    ),
  })),
);
