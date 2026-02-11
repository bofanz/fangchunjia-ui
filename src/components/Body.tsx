import { LayoutContext } from '@/contexts/LayoutContext';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { useRef, useContext } from 'react';

export default function Body({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const { setIsHeaderHidden } = useContext(LayoutContext);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous) {
      setIsHeaderHidden(true);
    } else {
      setIsHeaderHidden(false);
    }
  });

  return (
    <div
      className="fixed w-full h-full overflow-y-auto pt-20 sm:pt-60 [scrollbar-width:none]"
      ref={scrollRef}
    >
      <div className="w-full relative md:px-16">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
