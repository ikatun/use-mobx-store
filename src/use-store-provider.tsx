import 'reflect-metadata';

import React from 'react';
import { Container } from 'inversify';

export const UseStoreContext = React.createContext<Container | undefined>(undefined);

export const UseStoreProvider = ({ children }) => {
  const container = new Container({ defaultScope: 'Singleton', autoBindInjectable: true });

  return <UseStoreContext.Provider value={container}>{children}</UseStoreContext.Provider>;
};
