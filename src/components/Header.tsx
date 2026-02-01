import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

export type HeaderItem = 'toStart' | 'about' | 'projects';

export interface HeaderLink {
  label: string;
  to: string;
}

export default function Header() {
  const headerLinks = [
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
      <header>
        <nav className="flex justify-between font-bold text-2xl">
          {headerLinks.map((hL) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grow-1 px-24 pt-40 pb-4"
              key={hL.label}
            >
              <motion.div>
                <Link to={hL.to} className="text-fangchunjia-pink">
                  <motion.span
                    whileHover={{
                      color: '#FFFFFF',
                      transition: { duration: 0.1 },
                    }}
                    className="w-fit h-fit"
                  >
                    {hL.label}
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </nav>
      </header>
    </>
  );
}
