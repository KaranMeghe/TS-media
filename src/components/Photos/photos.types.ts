/** @format */

import type { AlbumData } from '../Albums/album.type';

export interface PhotoData {
  id: string;
  albumId: string;
  url: string;
}
export interface PhotoListProps {
  album: AlbumData;
}

export interface PhotosProps {
  album: AlbumData;
}

export interface PhotoItemProps {
  photo: PhotoData;
}
