import Carousel from '@/components/Carousel';
import CompactHeader from '@/components/CompactHeader';
import { LayoutContext } from '@/contexts/LayoutContext';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);

  const headerItems = [
    { title: '(Home)', to: '/home', id: 'home' },
    { title: '(About)', to: '/about', id: 'about' },
    { title: '(Projects)', to: '/projects', id: 'projects' },
  ];

  return (
    <>
      <LayoutContext value={{ isHeaderHidden, setIsHeaderHidden }}>
        <Carousel items={headerItems} hidden={isHeaderHidden} />
        <CompactHeader items={headerItems} hidden={isHeaderHidden} />
        <Outlet />
      </LayoutContext>
    </>
  );
}
