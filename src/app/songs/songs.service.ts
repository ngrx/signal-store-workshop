import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './song.model';

const API_URL = 'http://localhost:3000/songs';

@Injectable({ providedIn: 'root' })
export class SongsService {
  readonly #http = inject(HttpClient);

  getByAlbumId(albumId: number): Observable<Song[]> {
    return this.#http.get<Song[]>(API_URL, { params: { albumId } });
  }
}
