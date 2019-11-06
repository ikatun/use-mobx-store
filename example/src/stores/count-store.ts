import { RegisterStore } from '../reactComponentLib';
import { observable } from 'mobx';

@RegisterStore()
export class CountStore {
  @observable
  pressCount = 0;

  increaseCounter = () => {
    this.pressCount += 1;
  };
}
