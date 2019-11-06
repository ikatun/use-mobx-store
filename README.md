# use-mobx-store

The missing use-store (or use-observable) hook for MobX and MobX-React.

It allows you to subscribe to MobX store without using mobx-react's observer High Order Component.

## Warning:
This hook is highly experimental, although fun, it might be dangerous to use it in production :(

## Installation:
`npm install use-mobx-store`.

## Usage

### Render provider in Application's root
```typescript jsx
import React from 'react';
import { UseStoreProvider } from 'use-mobx-store';
import { Button } from './Button';
import logo from './logo.svg';

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
```

### Create a store (or two)
#### src/stores/count-store.tsx
```typescript jsx
import { RegisterStore } from 'use-mobx-store';
import { observable } from 'mobx';

@RegisterStore()
export class CountStore {
  @observable
  pressCount = 0;

  increaseCounter = () => {
    this.pressCount += 1;
  };
}
```

#### src/stores/button-store.tsx
```typescript jsx
import { RegisterStore, InjectStore } from 'use-mobx-store';
import { CountStore } from './count-store';

@RegisterStore()
export class ButtonStore {
  @InjectStore(CountStore)
  private countStore: CountStore;

  handlePress = () => {
    this.countStore.increaseCounter();
  };
}
```

### Using a store turns your component into a observer
```typescript jsx
import React from 'react';
import { useStore } from 'use-store-mobx';
import { CountStore } from './stores/count-store';

export const Button = () => {
  const countStore = useStore(CountStore);

  return <button onClick={countStore.increaseCounter}>I have been pressed {countStore.pressCount} times</button>;
};
```
