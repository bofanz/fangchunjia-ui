import { createContext } from 'react';

export const LayoutContext = createContext<{
  isHeaderHidden: boolean;
  setIsHeaderHidden: Function;
}>({
  isHeaderHidden: false,
  setIsHeaderHidden: () => {},
});
