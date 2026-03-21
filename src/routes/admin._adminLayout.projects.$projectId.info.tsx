import ProjectForm from '@/components/admin/ProjectForm';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import { Panel } from 'react-resizable-panels';

export const Route = createFileRoute(
  '/admin/_adminLayout/projects/$projectId/info',
)({
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
  const routeApi = getRouteApi('/admin/_adminLayout/projects/$projectId/info');
  const project = routeApi.useLoaderData();
  return (
    <>
      <Panel>
        <ProjectForm project={project} update={true} />
      </Panel>
    </>
  );
}
