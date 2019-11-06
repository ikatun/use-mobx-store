import React from 'react';
import { Button } from './Button';

import logo from './logo.svg';
import './App.css';
import { UseStoreProvider } from './reactComponentLib';

export const App = () => {
  return (
    <UseStoreProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button />
        </header>
      </div>
    </UseStoreProvider>
  );
};
