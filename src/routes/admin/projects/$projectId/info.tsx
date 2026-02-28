import AdminHeader from '@/components/admin/AdminHeader';
import ProjectForm from '@/components/admin/ProjectForm';
import Body from '@/components/Body';
import { fetchProject } from '@/utils/queries';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/projects/$projectId/info')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/$projectId/info');
  const project = routeApi.useLoaderData();
  return (
    <>
      <AdminHeader label={`Edit: ${project.name} - Info`} />
      <Body>
        <ProjectForm project={project} update={true} />
      </Body>
    </>
  );
}
