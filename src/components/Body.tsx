import { LayoutContext } from '@/contexts/LayoutContext';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { useRef, useContext } from 'react';
import clsx from 'clsx';

export default function Body({
  children,
  fullWidth = false,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
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
      <div className={clsx('relative', fullWidth ? 'w-full' : 'w-144')}>
        <div className="p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
