import MediaGridEditor from '@/components/admin/MediaGridEditor';
import MediaUploader from '@/components/admin/MediaUploader';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import Pane from '@/components/admin/Pane';

export const Route = createFileRoute('/admin/projects/$projectId/medias')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
  head: () => ({
    meta: [
      {
        title: 'Medias',
      },
    ],
  }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/$projectId/medias');
  const project = routeApi.useLoaderData();
  return (
    <>
      <Pane>
        <div className="flex h-full overflow-hidden">
          <div className="flex gap-4 p-4 border-r">
            <MediaUploader projectId={project.id} />
          </div>
          <div className="flex w-full">
            <div className="overflow-y-auto h-full grow">
              <MediaGridEditor
                projectId={project.id}
                initialMedias={project.mediaLayout}
              />
            </div>
          </div>
        </div>
      </Pane>
    </>
  );
}
