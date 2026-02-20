import { createFileRoute, getRouteApi, notFound } from '@tanstack/react-router';
import type { Project } from '@/interfaces/project.interface';
import axios, { AxiosError } from 'axios';
import Body from '@/components/Body';
import MediaGridEditor from '@/components/admin/MediaGridEditor';

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
    <>
      <Body>
        <h1 className="text-lg font-bold mb-8">{project.name}</h1>
        {/* <div className="space-y-4">
          <MediaUploader projectId="a" />
        </div> */}
        <MediaGridEditor initialMedias={project.files} />
      </Body>
    </>
  );
}
