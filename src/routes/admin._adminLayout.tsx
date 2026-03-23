import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { useAuth0 } from '@auth0/auth0-react';
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
  const { logout } = useAuth0();
  return (
    <>
      <div className="flex flex-col w-full h-full bg-fangchunjia-lightgray admin">
        <div className="header flex justify-between px-5 py-2">
          <Breadcrumbs />
          <div className="text-sm hover:text-fangchunjia-pink transition">
            <button onClick={() => logout()}>Log out</button>
          </div>
        </div>
        <div className="flex flex-1 min-h-0 p-4 pt-0 w-full">
          <div className="bg-white rounded-lg w-full overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
