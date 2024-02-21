import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard } from '@angular/material/card';
import { Song } from '@/songs/song.model';

@Component({
  selector: 'ngrx-album-songs',
  standalone: true,
  imports: [MatProgressSpinner, MatCard],
  template: `
    @if (isPending) {
      <mat-spinner />
    } @else {
      @for (song of songs; track song.id) {
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
  readonly isPending = false;
  readonly songs: Song[] = [
    { id: 1, title: 'Song 1', duration: '3:00', albumId: 1 },
    { id: 2, title: 'Song 2', duration: '3:20', albumId: 1 },
    { id: 3, title: 'Song 3', duration: '3:40', albumId: 1 },
    { id: 4, title: 'Song 4', duration: '3:60', albumId: 1 },
  ];
}
