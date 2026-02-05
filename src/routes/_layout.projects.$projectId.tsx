import MediaGrid from '@/components/MediaGrid';
import type { Project } from '@/interfaces/project.interface';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import axios from 'redaxios';
import { ScrollWrapper } from '@/components/ScrollWrapper';
import Overlay from '@/components/Overlay';

export const fetchProject = async (
  context: { portfolioApi: string },
  projectId: string,
) => {
  const project = await axios
    .get<Project>(`${context.portfolioApi}/projects/${projectId}`)
    .then((r) => r.data);
  return project;
};

export const Route = createFileRoute('/_layout/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params, context }) =>
    fetchProject(context as { portfolioApi: string }, params.projectId),
});

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/projects/$projectId');
  const project = routeApi.useLoaderData();

  return (
    <ScrollWrapper>
      <Overlay>
        <div className="pl-40 flex flex-col min-h-screen">
          <div>
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
    </ScrollWrapper>
  );
}
