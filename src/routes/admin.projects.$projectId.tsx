import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';
import TiptapRenderer from '@/components/TiptapRenderer';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import Pane from '@/components/admin/Pane';

export const Route = createFileRoute('/admin/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params, context }) =>
    fetchProject(context as { portfolioApi: string }, params.projectId),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.name || 'Project',
      },
    ],
  }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/$projectId');
  const project = routeApi.useLoaderData();

  return (
    <>
      <Pane>
        <div className="border-b">
          <Link
            to="/admin/projects/$projectId/info"
            params={{ projectId: project.id }}
            className="flex justify-between px-3 py-2 hover:bg-fangchunjia-pink/20"
            activeOptions={{ exact: false }}
            activeProps={{ className: 'bg-fangchunjia-pink/20' }}
          >
            Info
          </Link>
          <div className="px-3 py-2">
            <div>
              <div>ID</div>
              <div>{project.id}</div>
            </div>
            <div>
              <div>Name</div>
              <div>{project.name}</div>
            </div>
            <div>
              <div>Category</div>
              <div>{project.categoryId}</div>
            </div>
            <div>
              <div>Year</div>
              <div>{project.year}</div>
            </div>
            <div>
              <div>Link</div>
              <div>{project.link}</div>
            </div>
          </div>
        </div>

        <div className="border-b">
          <Link
            to="/admin/projects/$projectId/description"
            params={{ projectId: project.id }}
            className="flex justify-between px-3 py-2 hover:bg-fangchunjia-pink/20"
            activeOptions={{ exact: false }}
            activeProps={{ className: 'bg-fangchunjia-pink/20' }}
          >
            Description
          </Link>
          <div className="px-3 py-2">
            <TiptapRenderer content={parseJsonContent(project.description)} />
          </div>
        </div>

        <div className="border-b">
          <Link
            to="/admin/projects/$projectId/medias"
            params={{ projectId: project.id }}
            className="flex justify-between px-3 py-2 hover:bg-fangchunjia-pink/20"
            activeOptions={{ exact: false }}
            activeProps={{ className: 'bg-fangchunjia-pink/20' }}
          >
            Medias
          </Link>
        </div>
      </Pane>
      <Outlet />
    </>
  );
}
