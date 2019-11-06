import './override-create-element';

let componentToBeRendered: Function | undefined;

export function setComponentToBeRendered(component: Function | undefined) {
  componentToBeRendered = component;
}

export function getRenderingComponent() {
  return componentToBeRendered;
}
