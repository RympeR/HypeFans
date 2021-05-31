import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const ViewportContext = createContext(null);

interface IWindowDimensions {
  width: number;
  height: number;
}

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [windowDimensions, setWindowDimensions] = useState<IWindowDimensions | null>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleWindowResize = () => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return <ViewportContext.Provider value={windowDimensions}>{children}</ViewportContext.Provider>;
};

export const useViewport = () => {
  const windowDimensions: IWindowDimensions = useContext(ViewportContext);
  return windowDimensions;
};
