import type { Media } from './media.interface';

export interface ProjectInfo {
  id: string;
  name: string;
  year: number;
  categoryId: string;
  coverKey?: string;
  highlighted?: boolean;
}

export interface Project extends ProjectInfo {
  link?: string;
  description: string;
  files: Media[];
}

export interface Category {
  id: string;
  name: string;
}
