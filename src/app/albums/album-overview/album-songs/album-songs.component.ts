import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard } from '@angular/material/card';
import { AlbumSongsStore } from './album-songs.store';

@Component({
  selector: 'ngrx-album-songs',
  standalone: true,
  imports: [MatProgressSpinner, MatCard],
  template: `
    @if (store.isPending()) {
      <mat-spinner />
    } @else {
      @for (song of store.entities(); track song.id) {
        <mat-card class="song">
          <p class="song-title">{{ song.title }}</p>
          <p>{{ song.duration }}</p>
        </mat-card>
      }
    }
  `,
  styleUrl: './album-songs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumSongsComponent {
  readonly store = inject(AlbumSongsStore);
}
