import React, { createContext, ReactNode, useState } from 'react';
import * as langData from '../../assets/text/index.json';

export const LangContext = createContext(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<any>(langData.EN);

  return <LangContext.Provider value={{ currentLang, setCurrentLang }}>{children}</LangContext.Provider>;
};
