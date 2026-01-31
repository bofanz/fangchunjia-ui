export interface Media {
  title?: string;
  key: string;
  size?: 's' | 'm' | 'l';
}

export enum MediaSize {
  S = 's',
  M = 'm',
  L = 'l',
}
