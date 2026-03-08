import Pane from '@/components/admin/Pane';
import { fetchProjects } from '@/utils/queries';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';

export const Route = createFileRoute('/admin/projects')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as { portfolioApi: string }),
  head: () => ({
    meta: [
      {
        title: 'Projects',
      },
    ],
  }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects');

  const { projects } = routeApi.useLoaderData();

  return (
    <>
      <Pane>
        <div>
          <Link
            to="/admin/projects/publish"
            className="cursor-pointer w-full block border-b px-3 py-2 bg-gray-200 hover:bg-fangchunjia-pink/20"
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
                  className="cursor-pointer h-full w-full block border-b px-3 py-2 hover:bg-fangchunjia-pink/20"
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
      </Pane>

      <Outlet />
    </>
  );
}
