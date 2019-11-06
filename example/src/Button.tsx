import React from 'react';
import { CountStore } from './stores/count-store';
import { useStore } from './reactComponentLib';

export const Button = () => {
  const countStore = useStore(CountStore);

  return <button onClick={countStore.increaseCounter}>I have been pressed {countStore.pressCount} times</button>;
};
