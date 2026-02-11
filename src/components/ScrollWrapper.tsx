import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export function ScrollWrapper({ children }: { children: React.ReactNode }) {
  const main = useRef(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      smoother.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
      });
    },
    { scope: main },
  );

  return (
    <div id="smooth-wrapper" className="relative z-200" ref={main}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
