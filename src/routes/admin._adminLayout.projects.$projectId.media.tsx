import MediaLayoutEditor from '@/components/admin/MediaLayoutEditor';
import MediaUploader from '@/components/admin/MediaUploader';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import { Panel } from 'react-resizable-panels';

export const Route = createFileRoute(
  '/admin/_adminLayout/projects/$projectId/media',
)({
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
  const routeApi = getRouteApi('/admin/_adminLayout/projects/$projectId/media');
  const project = routeApi.useLoaderData();
  return (
    <>
      <Panel>
        <div className="flex h-full">
          <div className="overflow-y-auto h-full grow">
            <MediaLayoutEditor
              projectId={project.id}
              media={project.media}
              initialMediaLayout={project.mediaLayout}
            />
          </div>
        </div>
      </Panel>
      <Panel>
        <div className="flex gap-4 p-4">
          <MediaUploader projectId={project.id} />
        </div>
      </Panel>
    </>
  );
}
