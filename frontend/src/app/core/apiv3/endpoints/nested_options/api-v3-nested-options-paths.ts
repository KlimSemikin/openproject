import { Observable } from 'rxjs';
import { ApiV3NestedOptionPaths } from './api-v3-nested-option-paths';
import { NestedOptionResource } from 'core-app/features/hal/resources/nested-option-resource';
import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { ApiV3Collection } from 'core-app/core/apiv3/cache/cachable-apiv3-collection';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';
import { ApiV3ListParameters, listParamsString } from 'core-app/core/apiv3/paths/apiv3-list-resource.interface';
import { CollectionResource } from 'core-app/features/hal/resources/collection-resource';

export class ApiV3NestedOptionsPaths extends ApiV3Collection<NestedOptionResource, ApiV3NestedOptionPaths> {
  // Base path
  public readonly path:string;

  constructor(readonly apiRoot:ApiV3Service,
    protected basePath:string) {
    super(apiRoot, basePath, 'custom_nested_options', ApiV3NestedOptionPaths);
  }

  /**
   * Load a list of custom nested options with a given list parameter filter
   *
   * @param params
   */
  public list(params?:ApiV3ListParameters):Observable<CollectionResource<NestedOptionResource>> {
    return this
      .halResourceService
      .get<CollectionResource<NestedOptionResource>>(this.path + listParamsString(params))
      .pipe(
        this.cacheResponse(),
      );
  }

  /**
   * Create a custom nested option from a form payload          этот метод для создания нового элемента,
   *                                                            надо найти update для изменения родителя
   *
   * @param payload
   * @return {Promise<NestedOptionResource>}
   */
  public post(payload:Object):Observable<NestedOptionResource> {
    return this
      .halResourceService
      .post<NestedOptionResource>(this.path, payload)
      .pipe(
        this.cacheResponse(),
      );
  }

  protected createCache():StateCacheService<NestedOptionResource> {
    return new StateCacheService<NestedOptionResource>(this.states.custom_nested_options);
  }
}
