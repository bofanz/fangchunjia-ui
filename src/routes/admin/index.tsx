import Body from '@/components/Body';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
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
    <Body>
      <div className="flex flex-col gap-4">
        <Link to="/admin/projects">Edit projects</Link>
        <Link to="/admin/about">Edit about</Link>
      </div>
    </Body>
  );
}
