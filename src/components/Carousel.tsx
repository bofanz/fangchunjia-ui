import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, type Transition } from 'motion/react';
import { Link, useLocation } from '@tanstack/react-router';

export interface CarouselItem {
  title: string;
  id?: number;
  to: string
}

export interface CarouselProps {
  items: CarouselItem[];
  baseWidth?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

const TRANSITION_SETTINGS: Transition = { type: 'tween', duration: 0.4 };

interface CarouselItemProps {
  item: CarouselItem;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: any;
  transition: any;
  onClick: () => void;
  isClickable: boolean;
}

function CarouselItem({ item, index, itemWidth, transition, onClick, isClickable }: CarouselItemProps) {
  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative shrink-0 flex flex-col items-start px-8 pt-16 overflow-hidden`}
      style={{
        width: itemWidth,
        height: '100%',
      }}
      transition={transition}
    >
        <Link to={item.to} onClick={onClick} className={`block w-fit ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}><div className={`w-fit h-fit p-20 pb-12 text-black text-3xl font-bold ${isClickable && 'text-zinc-400 hover:text-black transition'} `}>
          {item.title}
          </div></Link>
    </motion.div>
  );
}

export default function Carousel({
  items,
  baseWidth = 400,
}: CarouselProps) {
  const location = useLocation();
    const initialPosition = items.findIndex(e => e.to === location.pathname)

  // Calculate item width based on how many items we have
  const itemCount = items.length || 1;
  const itemWidth = (baseWidth * itemCount) / itemCount;
  const trackItemOffset = itemWidth;
  
  // We show itemCount items at once
  // Maximum click moves us by (itemCount - 1) positions forward
  // So we need: original items + (itemCount - 1) extra items to fill gaps
  // Structure for 3 items showing 3: [1, 2, 3, 1, 2, 3, 1, 2]
  const itemsForRender = useMemo(() => {
    if (items.length === 0) return [];
    
    // We need original items plus enough to cover (itemCount - 1) more positions
    const totalNeeded = items.length + (itemCount - 1);
    const result = [];
    
    for (let i = 0; i < totalNeeded; i++) {
      result.push(items[i % items.length]);
    }
    
    return result;
  }, [items, itemCount]);

  const [position, setPosition] = useState<number>(initialPosition >= 0 ? initialPosition : 0);
  const x = useMotionValue(0);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize position at 0
  useEffect(() => {
    const startingPosition = initialPosition;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, trackItemOffset, x]);

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
      x.set(-normalizedPosition * trackItemOffset);
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
      <div
        ref={containerRef}
        className="fixed overflow-hidden mx-auto z-100"
        style={{
          width: `${baseWidth * itemCount}px`,
        }}
      >
        <motion.div
          className="flex"
          style={{
            x
          }}
          animate={{ x: -(position * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
        >
          {itemsForRender.map((item, index) => {
            // Determine which items are currently visible (clickable)
            const isInView = index >= position && index < position + itemCount;
            const relativeIndex = index - position; // Position within visible items (0, 1, 2, etc.)
            
            return (
              <CarouselItem
                key={`${item?.id ?? index}-${index}`}
                item={item}
                index={index}
                itemWidth={itemWidth}
                trackItemOffset={trackItemOffset}
                x={x}
                transition={effectiveTransition}
                onClick={() => isInView && handleItemClick(relativeIndex)}
                isClickable={isInView && relativeIndex > 0} // First item not clickable
              />
            );
          })}
        </motion.div>
      </div>
    </>
  );
}
