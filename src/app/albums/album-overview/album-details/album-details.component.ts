import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Album } from '@/albums/album.model';

@Component({
  selector: 'ngrx-album-details',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe, MatProgressSpinner],
  template: `
    @if (album) {
      <h2>{{ album.title }}</h2>
      <h3>by {{ album.artist }}</h3>

      <img
        [ngSrc]="album.coverImage"
        [alt]="album.title + ' Cover Image'"
        priority="high"
        height="250"
        width="250"
      />

      <div class="album-info">
        <p>
          <strong>Release Date: </strong>
          {{ album.releaseDate | date }}
        </p>
        <p><strong>Genre:</strong> {{ album.genre }}</p>
      </div>
    } @else if (isPending) {
      <mat-spinner />
    }
  `,
  styleUrl: './album-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumDetailsComponent {
  readonly isPending = false;
  readonly album: Album = {
    id: 1,
    title: 'Album 1',
    artist: 'Artist 1',
    genre: 'Genre 1',
    releaseDate: '2024-01-01',
    coverImage: '/assets/album-covers/unplugged.jpg',
  };
}
