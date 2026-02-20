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
      className="flex w-full h-full overflow-y-auto overscroll-none pt-24 [scrollbar-width:none]"
      ref={scrollRef}
    >
      <div className="w-144 relative">
        <div className="p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
