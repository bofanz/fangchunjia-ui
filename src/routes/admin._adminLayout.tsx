import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';

export const Route = createFileRoute('/admin/_adminLayout')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Admin' }],
  }),
  beforeLoad: async ({ context }) => {
    // @ts-ignore
    if (!context.auth.isAuthenticated) {
      // Auth0 handles login redirects, so just trigger login
      // @ts-ignore
      context.auth.login();
      return;
    }
  },
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col w-full h-full bg-fangchunjia-lightgray">
        <div className="header flex justify-between px-5 py-2">
          <Breadcrumbs />
          <div className="text-sm hover:text-fangchunjia-pink transition">
            <button>Log out</button>
          </div>
        </div>
        <div className="flex flex-1 min-h-0 p-4 pt-0 w-full">
          <div className="bg-white rounded-lg w-full">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
