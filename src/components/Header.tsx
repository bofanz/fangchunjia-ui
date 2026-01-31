import { Link } from '@tanstack/react-router';

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
            <div className="grow-1 px-24 pt-40 pb-4" key={hL.label}>
              <Link to={hL.to} className="text-black hover:text-white">
                {hL.label}
              </Link>
            </div>
          ))}
        </nav>
      </header>
    </>
  );
}
