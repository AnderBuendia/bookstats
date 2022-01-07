import { useState, useEffect } from 'react';
import { ResolutionBreakPoints } from '@Enums/config/resolution-breakpoints.enum';

export const useResolution = () => {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  useEffect(() => {
    const mediaWatcher: MediaQueryList = window.matchMedia(
      ResolutionBreakPoints.SM
    );

    setIsNarrowScreen(mediaWatcher.matches);

    function updateIsNarrowScreen(e: any) {
      setIsNarrowScreen(e.matches);
    }

    if (mediaWatcher.addEventListener) {
      mediaWatcher.addEventListener('change', updateIsNarrowScreen);

      return function cleanup() {
        mediaWatcher.removeEventListener('change', updateIsNarrowScreen);
      };
    } else {
      mediaWatcher.addListener(updateIsNarrowScreen);

      return function cleanup() {
        mediaWatcher.removeListener(updateIsNarrowScreen);
      };
    }
  });

  return isNarrowScreen;
};
