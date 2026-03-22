import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_adminLayout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const adminNavItems = [
    { label: 'Projects', to: '/admin/projects' },
    { label: 'About', to: '/admin/about' },
  ];
  return (
    <div className="flex h-full">
      {adminNavItems.map((n) => (
        <Link
          to={n.to}
          className="w-full px-3 py-2 hover:hover:bg-fangchunjia-pink/20 transition not-last:border-r not-last:border-r-fangchunjia-lightgray"
          activeOptions={{ exact: false }}
          activeProps={{ className: 'bg-fangchunjia-pink/20' }}
        >
          {n.label}
        </Link>
      ))}
    </div>
  );
}
