import MediaGrid from '@/components/MediaGrid';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject, type QueryContext } from '@/utils/queries';
import TiptapRenderer from '@/components/TiptapRenderer';
import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';

export const Route = createFileRoute('/_layout/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params, context }) =>
    fetchProject(context as QueryContext, params.projectId),
  pendingComponent: PendingComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Chunjia Fang (${loaderData?.name || 'Project'})`,
      },
    ],
  }),
  pendingMs: 0,
});

function PendingComponent() {
  return <div className="project">Fetching project...</div>;
}

function NotFoundComponent() {
  return <div className="project">Project not found</div>;
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="project">
      An error occurred when fetching the project: {error.message}
    </div>
  );
}

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/projects/$projectId');
  const project = routeApi.useLoaderData();
  return (
    <div className="content project">
      <div className="">
        <div>
          <h1 className="text-xl font-bold">{project.name}</h1>
          <h2 className="text-lg">{project.year}</h2>
          <div>{project.link}</div>
          <div>
            <TiptapRenderer content={parseJsonContent(project.description)} />
          </div>
        </div>
        <div className="pt-4 pb-8">
          <MediaGrid media={project.media} mediaLayout={project.mediaLayout} />
        </div>
      </div>
    </div>
  );
}
