import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import Pane from '@/components/admin/Pane';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Admin',
      },
    ],
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
  const adminNavItems = [
    { label: 'Projects', to: '/admin/projects' },
    { label: 'About', to: '/admin/about' },
  ];
  return (
    <div className="flex flex-col w-full h-full">
      <div className="header border-b flex justify-between">
        <Breadcrumbs />
        <div className="px-3 py-2">
          <button>Log out</button>
        </div>
      </div>
      <div className="body flex flex-1 min-h-0">
        <Pane>
          {adminNavItems.map((n) => (
            <Link
              to={n.to}
              className="w-full px-3 py-2 border-b hover:hover:bg-fangchunjia-pink/20 transition"
              activeOptions={{ exact: false }}
              activeProps={{ className: 'bg-fangchunjia-pink/20' }}
            >
              {n.label}
            </Link>
          ))}
        </Pane>

        <Outlet />
      </div>
    </div>
  );
}
