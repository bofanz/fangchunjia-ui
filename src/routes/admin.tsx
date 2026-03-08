import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import clsx from 'clsx';

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

function SidebarItem({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to}
      className="w-full px-3 py-2 border-b hover:hover:bg-fangchunjia-pink/20 transition"
      activeOptions={{ exact: false }}
      activeProps={{ className: 'bg-fangchunjia-pink/20' }}
    >
      {label}
    </Link>
  );
}

function RouteComponent() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="header border-b flex justify-between">
        <Breadcrumbs />
        <div className="px-3 py-2">
          <button>Log out</button>
        </div>
      </div>
      <div className="body flex flex-1 min-h-0">
        <div className="sidebar w-80 border-r flex flex-col">
          <SidebarItem label="Projects" to="/admin/projects" />
          <SidebarItem label="About" to="/admin/about" />
        </div>
        <div className={clsx('main flex-1 flex')}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
