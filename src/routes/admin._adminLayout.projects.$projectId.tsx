import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';
import TiptapRenderer from '@/components/TiptapRenderer';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { fetchProject, type QueryContext } from '@/utils/queries';
import { Panel } from 'react-resizable-panels';
import {
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  useArchiveProjectMutation,
  useUnarchiveProjectMutation,
} from '@/utils/queryOptions';

export const Route = createFileRoute('/admin/_adminLayout/projects/$projectId')(
  {
    component: RouteComponent,
    loader: ({ params, context }) =>
      fetchProject(context as QueryContext, params.projectId),
    head: ({ loaderData }) => ({
      meta: [
        {
          title: loaderData?.name || 'Project',
        },
      ],
    }),
  },
);

function RouteComponent() {
  const routeApi = getRouteApi('/admin/_adminLayout/projects/$projectId');
  const project = routeApi.useLoaderData();
  const archiveProjectMutation = useArchiveProjectMutation();
  const unarchiveProjectMutation = useUnarchiveProjectMutation();

  return (
    <>
      <Panel defaultSize="240px">
        <div className="flex flex-col h-full">
          <div className="toolbar">
            <button title="Delete">
              <TrashIcon />
            </button>
            {!project.isArchived ? (
              <button
                title="Archive"
                onClick={() => archiveProjectMutation.mutate(project.id)}
              >
                <ArchiveBoxIcon />
              </button>
            ) : (
              <button
                title="Unarchive"
                onClick={() => unarchiveProjectMutation.mutate(project.id)}
              >
                <ArchiveBoxXMarkIcon />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-auto text-sm">
            <div className="border-b border-b-fangchunjia-lightgray">
              <Link
                to="/admin/projects/$projectId/info"
                params={{ projectId: project.id }}
                className="flex justify-between items-center px-3 py-2 hover:bg-fangchunjia-pink/20"
                activeOptions={{ exact: false }}
                activeProps={{ className: 'bg-fangchunjia-pink/20' }}
              >
                Info
              </Link>
              <div className="px-3 py-2">
                <table className="[&_th]:font-normal text-left border-spacing-2 w-full">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <td>{project.id}</td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>{project.name}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{project.categoryId}</td>
                    </tr>
                    <tr>
                      <th>Year</th>
                      <td>{project.year}</td>
                    </tr>
                    <tr>
                      <th>Link</th>
                      <td>{project.link || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-b border-b-fangchunjia-lightgray">
              <Link
                to="/admin/projects/$projectId/description"
                params={{ projectId: project.id }}
                className="flex justify-between items-center px-3 py-2 hover:bg-fangchunjia-pink/20"
                activeOptions={{ exact: false }}
                activeProps={{ className: 'bg-fangchunjia-pink/20' }}
              >
                Description
              </Link>
              <div className="px-3 py-2">
                <TiptapRenderer
                  content={parseJsonContent(project.description)}
                />
              </div>
            </div>

            <div className="border-b border-b-fangchunjia-lightgray">
              <Link
                to="/admin/projects/$projectId/media"
                params={{ projectId: project.id }}
                className="flex justify-between items-center px-3 py-2 hover:bg-fangchunjia-pink/20"
                activeOptions={{ exact: false }}
                activeProps={{ className: 'bg-fangchunjia-pink/20' }}
              >
                Media
              </Link>
            </div>
          </div>
        </div>
      </Panel>

      <Outlet />
    </>
  );
}
