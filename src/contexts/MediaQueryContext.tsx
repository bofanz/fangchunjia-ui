import { createContext } from 'react';

export const MediaQueryContext = createContext<{
  isNotTouchDevice: boolean;
}>({
  isNotTouchDevice: true,
});
