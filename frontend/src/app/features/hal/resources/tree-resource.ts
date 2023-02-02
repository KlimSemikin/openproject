import { HalResource } from 'core-app/features/hal/resources/hal-resource';
import { InputState } from 'reactivestates';

export class TreeResource extends HalResource {

  public get state():InputState<this> {
    return this.states.trees.get(this.id!) as any;
  }
}
