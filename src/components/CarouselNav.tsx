import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, type Transition } from 'motion/react';
import { Link, useLocation } from '@tanstack/react-router';
import AboutGraphic from './graphics/AboutGraphic';
import HomeGraphic from './graphics/HomeGraphic';
import ProjectsGraphic from './graphics/ProjectsGraphic';
import type { NavItem } from './Header';

export interface CarouselProps {
  items: NavItem[];
  hidden?: boolean;
}

const TRANSITION_SETTINGS: Transition = { type: 'tween', duration: 0.4 };

interface CarouselItemProps {
  item: NavItem;
  index: number;
  x: any;
  transition: any;
  onClick: () => void;
  isClickable: boolean;
  isCurrent: boolean;
  itemCount: number;
}

function CarouselNavItem({
  item,
  index,
  transition,
  onClick,
  isClickable,
  isCurrent,
  itemCount,
}: CarouselItemProps) {
  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative shrink-0 flex flex-col items-start px-8 py-0 overflow-hidden w-1/3 h-full`}
      style={{
        width: `calc(100% / ${itemCount})`,
      }}
      transition={transition}
    >
      <Link
        to={item.to}
        onClick={onClick}
        className={`block w-fit ${!isCurrent && '*:fill-fangchunjia-gray hover:*:fill-black active:*:fill-black'} *:transition`}
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
      </Link>
    </motion.div>
  );
}

export default function CarouselNav({ items, hidden = false }: CarouselProps) {
  const location = useLocation();
  const initialPosition = items.findIndex((e) =>
    location.pathname.startsWith(e.to),
  );

  // Calculate item width based on how many items we have
  const itemCount = items.length || 1;

  // E.g., for 3 items show [a, b, c, a, b, c, a]
  // This makes sure that when its jumping from the 1st c to the 2nd b,
  // there are still (just) enough items to show when the 2nd b goes to position 0
  const itemsForRender = useMemo(() => {
    if (items.length === 0) return [];

    return items.concat(items).concat(items.slice(0, -2));
  }, [items]);

  const [position, setPosition] = useState<number>(
    initialPosition >= 0 ? initialPosition : 0,
  );
  const x = useMotionValue('0%');
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize position at 0
  useEffect(() => {
    const startingPosition = initialPosition;
    setPosition(startingPosition);
    x.set(`calc(-100% / ${itemCount} * ${startingPosition})`);
  }, [items.length, x]);

  const effectiveTransition = isJumping ? { duration: 0 } : TRANSITION_SETTINGS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    // Jump back when we've scrolled past the original items
    if (position >= items.length) {
      const normalizedPosition = position % items.length;
      setIsJumping(true);
      setPosition(normalizedPosition);
      x.set(`calc(-100% / ${itemCount} * ${normalizedPosition})`);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  // Always scroll right-to-left (forward direction)
  const handleItemClick = (clickedIndex: number) => {
    // Ignore if already animating or clicking first item
    if (isAnimating || clickedIndex === 0) return;

    const newPosition = position + clickedIndex;

    setPosition(newPosition);
  };

  // Calculate active index for pagination dots
  // const activeIndex = items.length === 0 ? 0 : position % items.length;

  return (
    <>
      <div className="p-4 hidden sm:block">
        <motion.div
          ref={containerRef}
          className="w-108 overflow-hidden flex"
          // animate={{
          //   opacity: hidden ? 0 : 1,
          //   display: hidden ? 'none' : 'block',
          // }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.div
            className="flex"
            style={{
              x,
            }}
            animate={{ x: `calc(-100% / ${itemCount} * ${position})` }}
            transition={effectiveTransition}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
          >
            {itemsForRender.map((item, index) => {
              // Determine which items are currently visible (clickable)
              const isInView =
                index >= position && index < position + itemCount;
              const relativeIndex = index - position; // Position within visible items (0, 1, 2, etc.)

              return (
                <CarouselNavItem
                  key={`${item?.id ?? index}-${index}`}
                  item={item}
                  index={index}
                  x={x}
                  transition={effectiveTransition}
                  onClick={() => isInView && handleItemClick(relativeIndex)}
                  isClickable={isInView && relativeIndex > 0} // First item not clickable
                  isCurrent={relativeIndex === 0}
                  itemCount={itemCount}
                />
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
