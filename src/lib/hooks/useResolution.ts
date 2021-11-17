import { useState, useEffect } from 'react';

export const useResolution = () => {
  const [windowDimensions, setWindowDimensions] = useState(0);

  useEffect(() => {
    let timer: number;
    const handleResize = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = window.setTimeout(() => {
        setWindowDimensions(window.innerWidth);
      }, 100);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
