import Body from '@/components/Body';
import { createFileRoute, getRouteApi, Link } from '@tanstack/react-router';
import { fetchProjects } from '@/utils/queries';
import AdminHeader from '@/components/admin/AdminHeader';

export const Route = createFileRoute('/admin/projects/')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as { portfolioApi: string }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/');

  const { projects } = routeApi.useLoaderData();

  return (
    <>
      <AdminHeader label="Edit Projects" />
      <Body>
        <div className="flex flex-col gap-4">
          <div>
            <ul>
              {projects.map((p) => (
                <li key={p.id}>
                  <Link
                    to={'/admin/projects/$projectId'}
                    className="cursor-pointer h-full w-fit block"
                    params={{
                      projectId: p.id,
                    }}
                  >
                    <div className="flex gap-2 active:text-fangchunjia-pink hover:text-fangchunjia-pink transition font-medium">
                      <span className="inline-block leading-[22px]">
                        {p.name}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link to="/admin/projects/publish">
              <span className="font-bold">Publish new project</span>
            </Link>
          </div>
        </div>
      </Body>
    </>
  );
}
