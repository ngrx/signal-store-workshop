import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from './album.model';

const API_URL = 'http://localhost:3000/albums';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  readonly #http = inject(HttpClient);

  getAll(): Observable<Album[]> {
    return this.#http.get<Album[]>(API_URL);
  }

  getById(id: number): Observable<Album> {
    return this.#http.get<Album>(`${API_URL}/${id}`);
  }
}
