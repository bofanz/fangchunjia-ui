import type { About } from '@/interfaces/about.interface';
import type { MediaLayoutItem } from '@/interfaces/media.interface';
import type {
  Category,
  Project,
  ProjectInfo,
} from '@/interfaces/project.interface';
import { notFound } from '@tanstack/react-router';
import axios, { AxiosError } from 'axios';

export interface QueryContext {
  fangchunjiaApiOrigin: string;
  fangchunjiaFilesApiOrigin: string;
  fangchunjiaAdminApiOrigin: string;
  // queryClient: QueryClient;
}

// Public endpoints

export const fetchAbout = async (context: QueryContext) => {
  try {
    return await axios
      .get<About>(`${context.fangchunjiaApiOrigin}/about`)
      .then((r) => r.data);
  } catch (e) {
    throw e;
  }
};

export const fetchProjects = async (context: QueryContext) => {
  const categories = await axios
    .get<Category[]>(`${context.fangchunjiaApiOrigin}/project-categories`)
    .then((r) => r.data);
  const projects = await axios
    .get<ProjectInfo[]>(`${context.fangchunjiaApiOrigin}/projects`)
    .then((r) => r.data);
  return {
    categories: categories,
    projects: projects,
  };
};

export const fetchProject = async (
  context: QueryContext,
  projectId: string,
) => {
  try {
    const project = await axios
      .get<Project>(`${context.fangchunjiaApiOrigin}/projects/${projectId}`)
      .then((r) => r.data);
    return project;
  } catch (e) {
    const res = (e as AxiosError).response;
    if (res) {
      if (res.status === 404) {
        throw notFound();
      }
    }
    throw e;
  }
};

// Admin endpoints

export async function updateAbout(about: About, token: string) {
  try {
    return axios.post<null>(
      `https://admin.fangchunjia.com/about`,
      {
        ...(about.text && { text: about.text }),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (e) {
    console.error(e);
  }
}

export async function createProject(project: Partial<Project>, token: string) {
  return axios.post<null>(
    'https://admin.fangchunjia.com/projects',
    {
      id: project.id,
      name: project.name,
      categoryId: project.categoryId,
      year: project.year,
      // description: project.description,
      link: project.link,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function updateProject(project: Partial<Project>, token: string) {
  return axios.post<null>(
    `https://admin.fangchunjia.com/projects/${project.id}`,
    {
      ...(project.name && { name: project.name }),
      ...(project.categoryId && { categoryId: project.categoryId }),
      ...(project.year && { year: project.year }),
      ...(project.description && { description: project.description }),
      ...(project.link && { link: project.link }),
      ...(project.cover?.key && { coverKey: project.cover.key }),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function uploadProjectMedia(
  data: {
    file: File;
    projectId: string;
  },
  token: string,
) {
  const getPresignedUrl = async (fileName: string) => {
    const res = await axios.post<{ uploadUrl: string; key: string }>(
      `https://admin.fangchunjia.com/projects/${data.projectId}/gen-file-upload-url`,
      null,
      {
        params: {
          filename: fileName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  const uploadToS3 = async ({
    presignedUrl,
    file,
  }: {
    presignedUrl: string;
    file: File;
  }) => {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  };

  const { uploadUrl } = await getPresignedUrl(data.file.name);

  await uploadToS3({ presignedUrl: uploadUrl, file: data.file });

  return { success: true, fileName: data.file.name };
}

export async function createOrUpdateProjectMediaLayout(
  data: {
    projectId: string;
    mediaLayout: MediaLayoutItem[];
  },
  token: string,
) {
  return axios.post<null>(
    `https://admin.fangchunjia.com/projects/${data.projectId}/media-layout`,
    { mediaLayout: data.mediaLayout },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
