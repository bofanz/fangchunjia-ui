import { useState, useEffect, useRef, type RefObject } from 'react';

export function useOutOfViewport(ref: RefObject<any>) {
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOut(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isOut;
}
