import { createFileRoute, getRouteApi, notFound } from '@tanstack/react-router';
import MediaUploader from '@/components/MediaUploader';
import type { Project } from '@/interfaces/project.interface';
import axios, { AxiosError } from 'axios';

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

export const Route = createFileRoute('/admin/$projectId')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/$projectId');
  const project = routeApi.useLoaderData();

  return (
    <div className="bg-white p-16">
      <div className="font-bold text-2xl pt-4 pb-4 mb-4">
        <h1>{project.name}</h1>
      </div>
      <div className="font-bold text-xl pt-4 pb-4 mb-2">
        <h2>Cover</h2>
      </div>
      <div className="mb-4">
        <MediaUploader projectId={project.id} />
      </div>
      <button type="button" className="cursor-pointer text-fangchunjia-pink">
        + Add another
      </button>
    </div>
  );
}
