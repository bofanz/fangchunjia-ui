import { Link, useLocation } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useState } from 'react';

export interface HeaderItem {
  title: string;
  id: string;
  to: string;
}

export interface HeaderProps {
  items: HeaderItem[];
  hidden: boolean;
}

function CompactHeaderItem({
  isClickable,
  item,
  setIsNavHidden,
}: {
  isClickable: boolean;
  item: HeaderItem;
  setIsNavHidden?: Function;
}) {
  return (
    <Link
      className={`flex px-8 pt-8 pb-4 text-2xl font-bold ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
      to={item.to}
      onClick={() => isClickable && setIsNavHidden && setIsNavHidden(true)}
    >
      <div
        className={`${isClickable && 'text-zinc-300 hover:text-black transition'}`}
      >
        {item.title}
      </div>
    </Link>
  );
}

export default function CompactHeader({ items, hidden }: HeaderProps) {
  const location = useLocation();
  const currentItem = items.find((h) => location.pathname.startsWith(h.to));
  const [isNavHidden, setIsNavHidden] = useState<boolean>(true);

  return (
    <div className="fixed sm:hidden z-100 w-full">
      <motion.div
        animate={{
          opacity: hidden ? 0 : 1,
          display: hidden ? 'none' : 'block',
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

            <div className="px-8 pt-8 pb-4 flex flex-col">
              <motion.button
                className="h-6 w-8 bg-fangchunjia-pink cursor-pointer rounded-[50%]"
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
      </motion.div>
    </div>
  );
}
