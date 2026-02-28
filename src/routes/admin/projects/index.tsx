import Body from '@/components/Body';
import { createFileRoute, getRouteApi, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { fetchProjects } from '@/utils/queries';
import ProjectForm from '@/components/admin/ProjectForm';
import AdminHeader from '@/components/admin/AdminHeader';

export const Route = createFileRoute('/admin/projects/')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as { portfolioApi: string }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/');

  const { projects } = routeApi.useLoaderData();

  // const [isOpen, setIsOpen] = useState(false);

  // function open() {
  //   setIsOpen(true);
  // }

  // function close() {
  //   setIsOpen(false);
  // }

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

      {/* <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h2" className="font-bold text-lg">
                Add Project
              </DialogTitle>
              <div className="pt-4">
                <ProjectForm />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog> */}
    </>
  );
}
