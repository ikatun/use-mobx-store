import { RegisterStore, InjectStore } from '../reactComponentLib';
import { CountStore } from './count-store';

@RegisterStore()
export class ButtonStore {
  @InjectStore(CountStore)
  private countStore: CountStore;

  handlePress = () => {
    this.countStore.increaseCounter();
  };
}
