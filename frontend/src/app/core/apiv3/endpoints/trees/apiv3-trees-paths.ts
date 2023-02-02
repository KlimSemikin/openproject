import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { ApiV3Collection } from 'core-app/core/apiv3/cache/cachable-apiv3-collection';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';
import { TreeResource } from 'core-app/features/hal/resources/tree-resource';
import { ApiV3TreePaths } from 'core-app/core/apiv3/endpoints/trees/apiv3-tree-paths';
import { ApiV3ListParameters, listParamsString } from 'core-app/core/apiv3/paths/apiv3-list-resource.interface';
import { Observable } from 'rxjs';
import { CollectionResource } from 'core-app/features/hal/resources/collection-resource';

export class ApiV3TreesPaths extends ApiV3Collection<TreeResource, ApiV3TreePaths> {
  constructor(protected apiRoot:ApiV3Service,
    protected basePath:string) {
    super(apiRoot, basePath, 'trees', ApiV3TreePaths);
  }

  /**
   * Load a list of trees with a given list parameter filter
   *
   * @param params
   */
  public list(params?:ApiV3ListParameters):Observable<CollectionResource<TreeResource>> {
    return this
      .halResourceService
      .get<CollectionResource<TreeResource>>(this.path + listParamsString(params))
      .pipe(
        this.cacheResponse(),
      );
  }

  protected createCache():StateCacheService<TreeResource> {
    return new StateCacheService<TreeResource>(this.states.trees);
  }
}
