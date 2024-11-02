import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { tapResponse } from '@ngrx/operators';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@/shared/state/request-status.feature';
import { withRouteParams } from '@/shared/state/route-params.feature';
import { Song } from '@/songs/song.model';
import { SongsService } from '@/songs/songs.service';

export const AlbumSongsStore = signalStore(
  withEntities<Song>(),
  withRequestStatus(),
  withRouteParams({ albumId: (param) => Number(param) }),
  withMethods(
    (
      store,
      songsService = inject(SongsService),
      snackBar = inject(MatSnackBar),
    ) => ({
      loadSongsByAlbumId: rxMethod<number>(
        pipe(
          filter(Boolean),
          tap(() => patchState(store, setPending())),
          switchMap((albumId) => {
            return songsService.getByAlbumId(albumId).pipe(
              tapResponse({
                next: (songs) => {
                  patchState(store, setAllEntities(songs), setFulfilled());
                },
                error: (error: { message: string }) => {
                  patchState(store, setError(error.message));
                  snackBar.open(error.message, 'Close', { duration: 5_000 });
                },
              }),
            );
          }),
        ),
      ),
    }),
  ),
  withHooks({
    onInit({ loadSongsByAlbumId, albumId }) {
      loadSongsByAlbumId(albumId);
    },
  }),
);
