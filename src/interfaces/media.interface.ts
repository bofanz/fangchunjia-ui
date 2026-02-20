export interface Media {
  title?: string;
  key: string;
  size?: MediaSize;
}

export enum MediaSize {
  S = 's',
  M = 'm',
  L = 'l',
}
