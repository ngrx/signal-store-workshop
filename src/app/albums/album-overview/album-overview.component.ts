import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProgressBarComponent } from '@/shared/ui/progress-bar.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumDetailsStore } from './album-details/album-details.store';
import { AlbumSongsComponent } from './album-songs/album-songs.component';
import { AlbumSongsStore } from './album-songs/album-songs.store';

@Component({
  selector: 'ngrx-album-overview',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    ProgressBarComponent,
    AlbumDetailsComponent,
    AlbumSongsComponent,
  ],
  template: `
    <ngrx-progress-bar [showProgress]="showProgress()" />

    <div class="container">
      <h1>Album Overview</h1>

      <div class="album-shell">
        <button mat-fab color="primary" (click)="goToPreviousAlbum()">
          <mat-icon>arrow_left</mat-icon>
        </button>

        <ngrx-album-details />
        <ngrx-album-songs />

        <button mat-fab color="primary" (click)="goToNextAlbum()">
          <mat-icon>arrow_right</mat-icon>
        </button>
      </div>
    </div>
  `,
  providers: [AlbumDetailsStore, AlbumSongsStore],
  styleUrl: './album-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlbumOverviewComponent {
  readonly #router = inject(Router);
  readonly #detailsStore = inject(AlbumDetailsStore);
  readonly #songsStore = inject(AlbumSongsStore);

  readonly showProgress = computed(
    () => this.#detailsStore.isPending() || this.#songsStore.isPending(),
  );

  goToNextAlbum(): void {
    this.#router.navigate(['albums', this.#detailsStore.albumId() + 1]);
  }

  goToPreviousAlbum(): void {
    this.#router.navigate(['albums', this.#detailsStore.albumId() - 1]);
  }
}
