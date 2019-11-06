import { setComponentToBeRendered } from './get-rendering-component';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RReact = require('react');

const originalCreateElement = RReact.createElement.bind(RReact);

RReact.createElement = (...args) => {
  const [functionReference, ...rest] = args;
  if (typeof functionReference !== 'function' || functionReference.prototype instanceof RReact.Component) {
    return originalCreateElement(...args);
  }

  if (functionReference.wrappedAsObserver) {
    return originalCreateElement(...[functionReference.wrappedAsObserver, ...rest]);
  }

  if (functionReference.avoidObservableWrapping || typeof functionReference !== 'function') {
    return originalCreateElement(...args);
  }

  const wrappedFunction = (...args) => {
    try {
      setComponentToBeRendered(functionReference);
      const result = functionReference(...args);
      setComponentToBeRendered(undefined);
      functionReference.avoidObservableWrapping = true;
      return result;
    } catch (error) {
      if (!error.isAbortRenderError) {
        throw error;
      }
    }
    return functionReference.wrappedAsObserver(...args);
  };
  return originalCreateElement(...[wrappedFunction, ...rest]);
};
