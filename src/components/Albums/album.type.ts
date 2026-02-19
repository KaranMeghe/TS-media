/** @format */

import type { USER } from '../../redux/features/users/users.types';

export interface AlbumsProps {
  user: USER;
}

export interface AlbumTitleProps {
  user: USER;
}

export interface AlbumData {
  id: string;
  title: string;
  userId: string;
}
export interface AlbumItemProps {
  album: AlbumData;
}
