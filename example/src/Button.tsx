import React from 'react';
import { CountStore } from './stores/count-store';
import { useStore } from './reactComponentLib';
import { ButtonStore } from './stores/button-store';

export const Button = () => {
  const countStore = useStore(CountStore);
  const buttonStore = useStore(ButtonStore);

  return <button onClick={countStore.increaseCounter}>I have been pressed {buttonStore.handlePress} times</button>;
};
