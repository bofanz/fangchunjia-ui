import { createContext, useRef, type RefObject } from 'react';

export const AnchorContext = createContext<{
  anchorRef: RefObject<any> | null;
}>({
  anchorRef: null,
});

export function AnchorProvider({ children }: { children: React.ReactNode }) {
  const anchorRef = useRef(null);

  return (
    <AnchorContext value={{ anchorRef: anchorRef }}>{children}</AnchorContext>
  );
}
