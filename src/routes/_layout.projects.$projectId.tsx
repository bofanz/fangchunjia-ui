import MediaGrid from '@/components/MediaGrid';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import Layer from '@/components/Layer';
import TiptapRenderer from '@/components/TiptapRenderer';
import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';

export const Route = createFileRoute('/_layout/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params, context }) =>
    fetchProject(context as { portfolioApi: string }, params.projectId),
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
  return (
    <>
      <Layer>
        <div className="overflow-y-auto h-full [scrollbar-width:none]">
          <div className="min-h-screen flex justify-start pt-24">
            <div>
              <div className="pb-4">Fetching project...</div>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

function NotFoundComponent() {
  return (
    <>
      <Layer>
        <div className="overflow-y-auto h-full [scrollbar-width:none]">
          <div className="min-h-screen flex justify-start pt-24">
            <div>
              <div className="pt-16 pb-4">Project not found</div>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <>
      <Layer>
        <div className="overflow-y-auto h-full [scrollbar-width:none]">
          <div className="min-h-screen flex justify-start pt-24">
            <div>
              <div className="pt-16 pb-4">
                An error occurred when fetching the project: {error.message}
              </div>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/projects/$projectId');
  const project = routeApi.useLoaderData();
  return (
    <Layer>
      <div className="overflow-y-auto h-full [scrollbar-width:none]">
        <div className="min-h-screen flex justify-start pt-24">
          <div className="flex flex-col p-8 w-full sm:w-4/5">
            <div className="">
              <h1 className="text-xl font-bold">{project.name}</h1>
              <h2 className="text-lg">{project.year}</h2>
              <div>{project.link}</div>
              <div>
                <TiptapRenderer
                  content={parseJsonContent(project.description)}
                />
              </div>
            </div>

            <div className="pt-4 pb-8">
              <MediaGrid items={project.mediaLayout} />
            </div>
          </div>
        </div>
      </div>
    </Layer>
  );
}
