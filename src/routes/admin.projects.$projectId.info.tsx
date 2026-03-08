import ProjectForm from '@/components/admin/ProjectForm';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import Pane from '@/components/admin/Pane';

export const Route = createFileRoute('/admin/projects/$projectId/info')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
  head: () => ({
    meta: [
      {
        title: 'Info',
      },
    ],
  }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/$projectId/info');
  const project = routeApi.useLoaderData();
  return (
    <>
      <Pane>
        <div className="p-4">
          <ProjectForm project={project} update={true} />
        </div>
      </Pane>
    </>
  );
}
