import Branding from '@/components/Branding';
import CompactHeader from '@/components/CompactHeader';
import Header from '@/components/Header';
import Purikura from '@/components/Purikura';
import Quote from '@/components/Quote';
import { LayoutContext } from '@/contexts/LayoutContext';
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const [isPurikuraVisible, setIsPurikuraVisible] = useState<boolean>(false);
  const router = useRouter();

  router.subscribe('onLoad', (evt) => {
    if (evt.pathChanged) {
      setIsHeaderHidden(false);
    }
  });

  const navItems = [
    { title: 'Home', to: '/home', id: 'home' },
    { title: 'About', to: '/about', id: 'about' },
    {
      title: 'Projects',
      to: '/projects',
      id: 'projects',
    },
  ];

  return (
    <>
      <LayoutContext value={{ isHeaderHidden, setIsHeaderHidden }}>
        <Header
          isNavHidden={isHeaderHidden}
          navItems={navItems}
          onClickBranding={() => setIsPurikuraVisible(!isPurikuraVisible)}
        />
        <CompactHeader items={navItems} hidden={isHeaderHidden} />
        <Outlet />
        {isPurikuraVisible && <Purikura />}
        <Quote />
      </LayoutContext>
    </>
  );
}
