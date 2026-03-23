import type { Media, MediaLayoutItem } from './media.interface';

export interface ProjectInfo {
  id: string;
  name: string;
  year: number;
  categoryId: string;
  cover?: Media;
  highlighted?: boolean;
  isArchived?: boolean;
}

export interface Project extends ProjectInfo {
  link?: string;
  description: string;
  media: Media[];
  mediaLayout: MediaLayoutItem[];
}

export interface Category {
  id: string;
  name: string;
}
