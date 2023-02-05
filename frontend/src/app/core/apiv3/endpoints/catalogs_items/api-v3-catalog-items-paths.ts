import { Observable } from 'rxjs';
import { ApiV3CatalogItemPaths } from './api-v3-catalog-item-paths';
import { CatalogItemResource } from 'core-app/features/hal/resources/catalog-item-resource';
import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { ApiV3Collection } from 'core-app/core/apiv3/cache/cachable-apiv3-collection';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';
import { ApiV3ListParameters, listParamsString } from 'core-app/core/apiv3/paths/apiv3-list-resource.interface';
import { CollectionResource } from 'core-app/features/hal/resources/collection-resource';

export class ApiV3CatalogItemsPaths extends ApiV3Collection<CatalogItemResource, ApiV3CatalogItemPaths> {
  // Base path
  public readonly path:string;

  constructor(
    readonly apiRoot:ApiV3Service,
    protected basePath:string
  ) {
    super(apiRoot, basePath, 'catalog_items', ApiV3CatalogItemPaths);
  }

  /**
   * Load a list of custom nested options with a given list parameter filter
   *
   * @param params
   */
  public list(params?:ApiV3ListParameters):Observable<CollectionResource<CatalogItemResource>> {
    return this
      .halResourceService
      .get<CollectionResource<CatalogItemResource>>(this.path + listParamsString(params))
      .pipe(
        this.cacheResponse(),
      );
  }

  /**
   * Create a custom nested option from a form payload          этот метод для создания нового элемента,
   *                                                            надо найти update для изменения родителя
   *
   * @param payload
   * @return {Promise<CatalogItemResource>}
   */
  public post(payload:Object):Observable<CatalogItemResource> {
    return this
      .halResourceService
      .post<CatalogItemResource>(this.path, payload)
      .pipe(
        this.cacheResponse(),
      );
  }

  protected createCache():StateCacheService<CatalogItemResource> {
    return new StateCacheService<CatalogItemResource>(this.states.catalog_items);
  }
}
