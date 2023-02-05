import { HalResource } from 'core-app/features/hal/resources/hal-resource';
import { InputState } from 'reactivestates';

export class CatalogResource extends HalResource {

  public get state():InputState<this> {
    return this.states.catalogs.get(this.id!) as any;
  }
}
