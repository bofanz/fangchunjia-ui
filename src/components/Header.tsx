import { Link, useRouterState } from '@tanstack/react-router';
import { motion } from 'motion/react';

export interface HeaderLink {
  label: string;
  to: string;
}

export default function Header() {
  const state = useRouterState();
  const pathname = state.location.pathname;
  const headerLinks = pathname.startsWith('/about')
    ? [
        {
          label: 'About',
          to: '/about',
        },
      ]
    : pathname.startsWith('/projects')
      ? [
          {
            label: 'Projects',
            to: '/projects',
          },
        ]
      : [
          {
            label: 'About',
            to: '/about',
          },
          {
            label: 'Projects',
            to: '/projects',
          },
        ];

  return (
    <>
      <header className="fixed w-full [view-transition-name:header]">
        <nav className="flex justify-between font-bold">
          {headerLinks.map((hL) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grow-1 px-8 pt-16"
              key={hL.label}
            >
              <Link
                to={hL.to}
                className="block w-fit"
                viewTransition={{ types: ['fade'] }}
              >
                <motion.div
                  whileHover={{
                    color: '#FFFFFF',
                    transition: { duration: 0.1 },
                  }}
                  className="w-fit h-fit p-20 pb-12 text-black text-3xl"
                >
                  {hL.label}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </nav>
      </header>
    </>
  );
}
