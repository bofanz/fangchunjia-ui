import { createContext, type RefObject } from 'react';

export const LayoutContext = createContext<{
  isHeaderHidden: boolean;
  setIsHeaderHidden: Function;
}>({
  isHeaderHidden: false,
  setIsHeaderHidden: () => {},
});
