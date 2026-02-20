import { Link, useLocation } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useState } from 'react';
import type { NavItem } from './Header';
import AboutGraphic from './graphics/AboutGraphic';
import HomeGraphic from './graphics/HomeGraphic';
import ProjectsGraphic from './graphics/ProjectsGraphic';
import Branding from './Branding';

export interface HeaderProps {
  items: NavItem[];
  hidden: boolean;
}

function CompactHeaderItem({
  isClickable,
  item,
  setIsNavHidden,
}: {
  isClickable: boolean;
  item: NavItem;
  setIsNavHidden?: Function;
}) {
  return (
    <Link
      className={`flex p-4 h-16 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
      to={item.to}
      onClick={() => isClickable && setIsNavHidden && setIsNavHidden(true)}
    >
      <div
        className={`w-full h-full *:h-full ${isClickable && 'text-zinc-300 hover:text-black transition'}`}
      >
        {item.title === 'Home' ? (
          <HomeGraphic />
        ) : item.title === 'About' ? (
          <AboutGraphic />
        ) : item.title === 'Projects' ? (
          <ProjectsGraphic />
        ) : (
          <></>
        )}
      </div>
    </Link>

    // className={`block w-fit ${!isCurrent && '*:fill-fangchunjia-gray hover:*:fill-black active:*:fill-black'} *:transition`}
  );
}

export default function CompactHeader({ items, hidden }: HeaderProps) {
  const location = useLocation();
  const currentItem = items.find((h) => location.pathname.startsWith(h.to));
  const [isNavHidden, setIsNavHidden] = useState<boolean>(true);

  return (
    <div className="fixed sm:hidden z-300 w-full">
      <motion.div
        className="flex-col justify-between"
        animate={{
          opacity: hidden ? 0 : 1,
          display: hidden ? 'none' : 'flex',
          backgroundColor: isNavHidden ? '' : '#ffffff',
          height: isNavHidden ? '' : '100vh',
        }}
      >
        <header>
          <div className="flex">
            <div className="grow">
              {currentItem && (
                <CompactHeaderItem isClickable={false} item={currentItem} />
              )}
            </div>

            <div className="p-4 flex flex-col">
              <motion.button
                className="h-6 w-8 m-auto bg-fangchunjia-pink cursor-pointer rounded-[50%]"
                onClick={() => setIsNavHidden(!isNavHidden)}
                animate={{
                  rotate: isNavHidden ? 0 : 90,
                }}
              />
            </div>
          </div>
          <motion.nav
            animate={{
              opacity: isNavHidden ? 0 : 1,
              display: isNavHidden ? 'none' : 'block',
            }}
          >
            {items
              .filter((h) => h.id !== currentItem?.id)
              .map((h) => (
                <CompactHeaderItem
                  isClickable={true}
                  item={h}
                  key={h.id}
                  setIsNavHidden={setIsNavHidden}
                />
              ))}
          </motion.nav>
        </header>
        <motion.div
          animate={{
            opacity: isNavHidden ? 0 : 1,
            display: isNavHidden ? 'none' : 'block',
          }}
        >
          <Branding />
        </motion.div>
      </motion.div>
    </div>
  );
}
