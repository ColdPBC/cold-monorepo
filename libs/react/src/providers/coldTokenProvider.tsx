import React, { createContext, useContext } from 'react';
import {useTokenManager} from "@coldpbc/hooks";

const ColdTokenContext = createContext<ReturnType<typeof useTokenManager> | null>(null);

export const ColdTokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tokenManager = useTokenManager();

  return <ColdTokenContext.Provider value={tokenManager}>{children}</ColdTokenContext.Provider>;
};

export const useTokenContext = () => {
  return useContext(ColdTokenContext);
};
