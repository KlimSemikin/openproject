import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { ApiV3Collection } from 'core-app/core/apiv3/cache/cachable-apiv3-collection';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';
import { CatalogResource } from 'core-app/features/hal/resources/catalog-resource';
import { Apiv3CatalogPaths } from 'core-app/core/apiv3/endpoints/catalogs/apiv3-catalog-paths';
import { ApiV3ListParameters, listParamsString } from 'core-app/core/apiv3/paths/apiv3-list-resource.interface';
import { Observable } from 'rxjs';
import { CollectionResource } from 'core-app/features/hal/resources/collection-resource';

export class Apiv3CatalogsPaths extends ApiV3Collection<CatalogResource, Apiv3CatalogPaths> {
  constructor(protected apiRoot:ApiV3Service,
    protected basePath:string
  ) {
    super(apiRoot, basePath, 'catalogs', Apiv3CatalogPaths);
  }

  /**
   * Load a list of catalogs with a given list parameter filter
   *
   * @param params
   */
  public list(params?:ApiV3ListParameters):Observable<CollectionResource<CatalogResource>> {
    return this
      .halResourceService
      .get<CollectionResource<CatalogResource>>(this.path + listParamsString(params))
      .pipe(
        this.cacheResponse(),
      );
  }

  protected createCache():StateCacheService<CatalogResource> {
    return new StateCacheService<CatalogResource>(this.states.catalogs);
  }
}
