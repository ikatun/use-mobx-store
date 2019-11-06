import React from 'react';
import { observer } from 'mobx-react';
import { getRenderingComponent } from './get-rendering-component';
import { AbortRenderError } from './AbortRenderError';
import { interfaces } from 'inversify';
import { UseStoreContext } from './use-store-provider';

export function useStore<T>(type: interfaces.Newable<T>): T {
  const renderingComponent = getRenderingComponent() as any;
  if (renderingComponent.wrappedAsObserver) {
    const container = React.useContext(UseStoreContext);
    if (!container) {
      throw new Error('Missing InjectionContainerContext, you need to render InjectionContainerContext in app root');
    }
    return container.get(type);
  }

  const WrappedAsObserver = observer(renderingComponent);
  const WrappedComponent = props => {
    return <WrappedAsObserver {...props} />;
  };
  WrappedComponent.avoidObservableWrapping = true;
  renderingComponent.wrappedAsObserver = WrappedComponent;

  throw new AbortRenderError();
}
