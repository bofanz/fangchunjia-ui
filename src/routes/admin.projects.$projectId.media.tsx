import MediaGridEditor from '@/components/admin/MediaGridEditor';
import MediaUploader from '@/components/admin/MediaUploader';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import Pane from '@/components/admin/Pane';

export const Route = createFileRoute('/admin/projects/$projectId/media')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
  head: () => ({
    meta: [
      {
        title: 'Media',
      },
    ],
  }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/$projectId/media');
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
                media={project.media}
                initialMediaLayout={project.mediaLayout}
              />
            </div>
          </div>
        </div>
      </Pane>
    </>
  );
}
