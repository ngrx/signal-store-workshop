import { SortOrder } from '@/shared/models/sort-order.model';

export type Album = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  releaseDate: string;
  coverImage: string;
};

export function searchAlbums(albums: Album[], query: string): Album[] {
  return albums.filter(({ title }) => title.toLowerCase().includes(query));
}

export function sortAlbums(albums: Album[], order: SortOrder): Album[] {
  const direction = order === 'asc' ? 1 : -1;
  return [...albums].sort((a, b) => direction * a.title.localeCompare(b.title));
}
