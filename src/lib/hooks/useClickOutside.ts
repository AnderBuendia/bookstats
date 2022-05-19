import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

export type EventType = MouseEvent | TouchEvent;

export const useClickOutside = (
  ref: MutableRefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () =>
      document.removeEventListener('click', handleClickOutside, true);

    function handleClickOutside(e: EventType) {
      const componentRef = ref?.current;

      if (componentRef && !componentRef.contains(e.target as Node)) {
        handler();
      }
    }
  }, [ref, handler]);
};
