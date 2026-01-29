import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import axios from 'redaxios';
import type { Project } from './projects';

export const fetchProject = async (projectId: string) => {
  const project = await axios
    .get<Project>(`https://api.fangchunjia.com/projects/${projectId}`)
    .then((r) => r.data);
  return project;
};

export const Route = createFileRoute('/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params }) => fetchProject(params.projectId),
});

function RouteComponent() {
  const routeApi = getRouteApi('/projects/$projectId');
  const project = routeApi.useLoaderData();

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-overlay-bg">
      <div className="pl-[400px]">
        <div className="basis-1/3 px-16 pt-16 pb-8">
          <h1 className="text-xl">{project.name}</h1>
          <h2 className="text-lg">{project.year}</h2>
          <div>{project.link}</div>
          <div>{project.description}</div>
        </div>
      </div>
    </div>
  );
}
