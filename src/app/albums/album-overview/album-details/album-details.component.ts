import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlbumDetailsStore } from './album-details.store';

@Component({
  selector: 'ngrx-album-details',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe, MatProgressSpinner],
  template: `
    @if (store.album(); as album) {
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
    } @else if (store.isPending()) {
      <mat-spinner />
    }
  `,
  styleUrl: './album-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumDetailsComponent {
  readonly store = inject(AlbumDetailsStore);
}
