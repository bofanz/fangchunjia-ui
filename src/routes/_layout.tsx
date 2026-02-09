import Carousel from '@/components/Carousel';
import { LayoutContext } from '@/contexts/LayoutContext';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);

  return (
    <>
      <LayoutContext value={{ isHeaderHidden, setIsHeaderHidden }}>
        <Carousel
          items={[
            { title: '(Home)', to: '/home' },
            { title: '(About)', to: '/about' },
            { title: '(Projects)', to: '/projects' },
          ]}
          hidden={isHeaderHidden}
        />
        <Outlet />
      </LayoutContext>
    </>
  );
}
