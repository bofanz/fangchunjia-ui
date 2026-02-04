import Carousel from '@/components/Carousel';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Carousel
        items={[
          { title: '(Home)', to: '/home' },
          { title: '(About)', to: '/about' },
          { title: '(Projects)', to: '/projects' },
        ]}
      />
      <Outlet />
    </>
  );
}
