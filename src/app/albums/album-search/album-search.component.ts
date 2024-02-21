import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressBarComponent } from '@/shared/ui/progress-bar.component';
import { SortOrder } from '@/shared/models/sort-order.model';
import { Album } from '@/albums/album.model';
import { AlbumFilterComponent } from './album-filter/album-filter.component';
import { AlbumListComponent } from './album-list/album-list.component';

@Component({
  selector: 'ngrx-album-search',
  standalone: true,
  imports: [ProgressBarComponent, AlbumFilterComponent, AlbumListComponent],
  template: `
    <ngrx-progress-bar [showProgress]="showProgress" />

    <div class="container">
      <h1>Albums ({{ totalAlbums }})</h1>

      <ngrx-album-filter
        [query]="query"
        [order]="order"
        (queryChange)="updateQuery($event)"
        (orderChange)="updateOrder($event)"
      />

      <ngrx-album-list [albums]="albums" [showSpinner]="showSpinner" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlbumSearchComponent {
  readonly albums: Album[] = [
    {
      id: 1,
      title: 'Album 1',
      artist: 'Artist 1',
      releaseDate: '2023-01-01',
      genre: 'Genre 1',
      coverImage: '/assets/album-covers/unplugged.jpg',
    },
    {
      id: 2,
      title: 'Album 2',
      artist: 'Artist 2',
      releaseDate: '2024-01-01',
      genre: 'Genre 2',
      coverImage: '/assets/album-covers/are-you-experienced.jpg',
    },
  ];
  readonly query = '';
  readonly order: SortOrder = 'asc';
  readonly showSpinner = false;
  readonly showProgress = false;
  readonly totalAlbums = this.albums.length;

  updateQuery(query: string): void {}

  updateOrder(order: SortOrder): void {}
}
