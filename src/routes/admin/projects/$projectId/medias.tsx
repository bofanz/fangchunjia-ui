import AdminHeader from '@/components/admin/AdminHeader';
import MediaGridEditor from '@/components/admin/MediaGridEditor';
import MediaUploader from '@/components/admin/MediaUploader';
import Body from '@/components/Body';
import { fetchProject } from '@/utils/queries';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/projects/$projectId/medias')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/$projectId/medias');
  const project = routeApi.useLoaderData();
  return (
    <>
      <AdminHeader label={`Edit: ${project.name} - Medias`} />
      <Body fullWidth={true}>
        <div className="flex gap-4">
          <MediaUploader />
          <div className="overflow-y-auto h-full grow">
            <MediaGridEditor initialMedias={project.files} />
          </div>
        </div>
      </Body>
    </>
  );
}
