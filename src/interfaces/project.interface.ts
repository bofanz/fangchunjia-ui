export interface ProjectInfo {
  id: string;
  name: string;
  year: number;
  categoryId: string;
  coverKey?: string;
}

export interface Project extends ProjectInfo {
  link?: string;
  description: string;
  files: {
    seq: number;
    key: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
}
