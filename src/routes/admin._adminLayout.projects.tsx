import { fetchProjects, type QueryContext } from '@/utils/queries';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { Group, Panel } from 'react-resizable-panels';

export const Route = createFileRoute('/admin/_adminLayout/projects')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as QueryContext),
  head: () => ({
    meta: [
      {
        title: 'Projects',
      },
    ],
  }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/_adminLayout/projects');

  const { projects } = routeApi.useLoaderData();

  return (
    <>
      <div className="flex h-full">
        <Group className="panel-group">
          <Panel defaultSize="240px">
            <div className="h-full overflow-auto text-sm">
              <div>
                <Link
                  to="/admin/projects/publish"
                  className="cursor-pointer w-full block px-3 py-2 hover:bg-fangchunjia-pink/20 font-bold"
                >
                  <span className="">Publish new project</span>
                </Link>
              </div>
              <div>
                <ul>
                  {projects.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={'/admin/projects/$projectId'}
                        className="cursor-pointer h-full w-full block px-3 py-1 hover:bg-fangchunjia-pink/20"
                        params={{
                          projectId: p.id,
                        }}
                        activeOptions={{ exact: false }}
                        activeProps={{ className: 'bg-fangchunjia-pink/20' }}
                      >
                        <div className="flex gap-2 transition">
                          <span className="inline-block">{p.name}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
          <Outlet />
          <Panel className="" minSize="8px" />
        </Group>
      </div>
    </>
  );
}
