import type { About } from '@/interfaces/about.interface';
import type {
  Category,
  Project,
  ProjectInfo,
} from '@/interfaces/project.interface';
import { notFound } from '@tanstack/react-router';
import axios, { AxiosError } from 'axios';

export const fetchAboutMd = async (context: { filesApi: string }) => {
  const aboutMd = await axios
    .get(`${context.filesApi}/about/about.md`)
    .then((r) => r.data);
  return aboutMd;
};

export const fetchAbout = async (context: { portfolioApi: string }) => {
  try {
    return await axios
      .get<About>(`${context.portfolioApi}/about`)
      .then((r) => r.data);
  } catch (e) {
    throw e;
  }
};

export async function updateAbout(about: About) {
  return axios.post<null>(`https://api.fangchunjia.com/about`, {
    ...(about.text && { text: about.text }),
  });
}

export const fetchProjects = async (context: { portfolioApi: string }) => {
  const categories = await axios
    .get<Category[]>(`${context.portfolioApi}/project-categories`)
    .then((r) => r.data);
  const projects = await axios
    .get<ProjectInfo[]>(`${context.portfolioApi}/projects`)
    .then((r) => r.data);
  return {
    categories: categories,
    projects: projects,
  };
};

export const fetchProject = async (
  context: { portfolioApi: string },
  projectId: string,
) => {
  try {
    const project = await axios
      .get<Project>(`${context.portfolioApi}/projects/${projectId}`)
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

export async function createProject(project: Partial<Project>) {
  return axios.post<null>('https://api.fangchunjia.com/projects', {
    id: project.id,
    name: project.name,
    categoryId: project.categoryId,
    year: project.year,
    // description: project.description,
    link: project.link,
  });
}

export async function updateProject(project: Partial<Project>) {
  return axios.post<null>(
    `https://api.fangchunjia.com/projects/${project.id}`,
    {
      ...(project.name && { name: project.name }),
      ...(project.categoryId && { categoryId: project.categoryId }),
      ...(project.year && { year: project.year }),
      ...(project.description && { description: project.description }),
      ...(project.link && { link: project.link }),
    },
  );
}

export async function uploadProjectMedia(data: {
  file: File;
  // fileTitle: string;
  projectId: string;
}) {
  console.log(data.file);
  console.log('====');
  const getPresignedUrl = async (fileName: string) => {
    const { data } = await axios.post<{ uploadUrl: string; key: string }>(
      'https://api.fangchunjia.com/projects/arinoroom/gen-file-upload-url',
      null,
      {
        params: {
          filename: fileName,
        },
      },
    );
    return data;
  };

  const uploadToS3 = async ({
    presignedUrl,
    file,
  }: {
    presignedUrl: string;
    file: File;
  }) => {
    console.log(presignedUrl);
    console.log(file);

    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
        'x-amz-meta-size': 's',
        'x-amz-meta-seq': 0,
      },
    });

    // const res = await fetch(presignedUrl, {
    //   method: 'PUT',
    //   body: file,
    //   headers: { 'Content-Type': file.type },
    // });
    // if (!res.ok) throw new Error('S3 upload failed');
    // return res;
  };

  const { uploadUrl, key } = await getPresignedUrl(data.file.name);

  await uploadToS3({ presignedUrl: uploadUrl, file: data.file });

  return { success: true, fileName: data.file.name };
}
