import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { Album } from '@/albums/album.model';

@Component({
  selector: 'ngrx-album-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatProgressSpinner,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
  ],
  template: `
    @if (showSpinner()) {
      <mat-spinner />
    } @else {
      <div class="albums-container">
        @for (album of albums(); track album.id) {
          <a [routerLink]="[album.id]">
            <mat-card>
              <div class="album-content">
                <div>
                  <mat-card-title>{{ album.title }}</mat-card-title>
                  <mat-card-subtitle>by {{ album.artist }}</mat-card-subtitle>
                </div>

                <div class="album-info">
                  <p>
                    <strong>Release Date: </strong>
                    {{ album.releaseDate | date }}
                  </p>
                  <p><strong>Genre:</strong> {{ album.genre }}</p>
                </div>
              </div>

              <img
                [src]="album.coverImage"
                [alt]="album.title + ' Cover Image'"
                height="150"
                width="150"
              />
            </mat-card>
          </a>
        }
      </div>
    }
  `,
  styleUrl: './album-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumListComponent {
  readonly albums = input<Album[]>([]);
  readonly showSpinner = input(false);
}
