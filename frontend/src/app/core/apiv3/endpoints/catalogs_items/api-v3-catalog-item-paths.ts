import { ApiV3Resource } from 'core-app/core/apiv3/cache/cachable-apiv3-resource';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';
import { CatalogItemResource } from 'core-app/features/hal/resources/catalog-item-resource';
import { ApiV3CatalogItemsPaths } from 'core-app/core/apiv3/endpoints/catalogs_items/api-v3-catalog-items-paths';

export class ApiV3CatalogItemPaths extends ApiV3Resource<CatalogItemResource> {

  protected createCache():StateCacheService<CatalogItemResource> {
    return (this.parent as ApiV3CatalogItemsPaths).cache;
  }
}
