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
        <div className="flex justify-end min-h-screen">
          <div className="flex flex-col p-8 w-full md:w-5/8">
            <div>
              <div className="basis-2/5 pt-16 pb-4">
                <h1 className="text-xl font-bold">{project.name}</h1>
                <h2 className="text-lg">{project.year}</h2>
                <div>{project.link}</div>
                <div>{project.description}</div>
              </div>
            </div>

            <div className="pt-4 pb-8 w-full sm:w-4/5">
              <MediaGrid items={project.files} />
            </div>
          </div>
        </div>
      </Overlay>
    </ScrollWrapper>
  );
}
