import { useState, useEffect } from 'react';

export function useViewport() {
  const [size, setSize] = useState({
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  });

  useEffect(() => {
    const handler = () =>
      setSize({
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}
