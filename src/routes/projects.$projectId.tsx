import MediaGrid from '@/components/MediaGrid';
import Overlay from '@/components/Overlay';
import type { Project } from '@/interfaces/project.interface';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import axios from 'redaxios';

export const fetchProject = async (
  context: { portfolioApi: string },
  projectId: string,
) => {
  const project = await axios
    .get<Project>(`${context.portfolioApi}/projects/${projectId}`)
    .then((r) => r.data);
  return project;
};

export const Route = createFileRoute('/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params, context }) =>
    fetchProject(context as { portfolioApi: string }, params.projectId),
});

function RouteComponent() {
  const routeApi = getRouteApi('/projects/$projectId');
  const project = routeApi.useLoaderData();

  return (
    <Overlay>
      <div className="">
        <div className="">
          <div className="basis-2/5 pl-4 pr-24 pt-16 pb-4">
            <h1 className="text-xl">{project.name}</h1>
            <h2 className="text-lg">{project.year}</h2>
            <div>{project.link}</div>
            <div>{project.description}</div>
          </div>
        </div>

        <div className="pl-4 pr-64 pt-4 pb-8">
          <MediaGrid items={project.files} />
        </div>
      </div>
    </Overlay>
  );
}
