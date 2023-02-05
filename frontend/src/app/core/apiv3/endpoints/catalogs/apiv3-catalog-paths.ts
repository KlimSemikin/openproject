import { ApiV3Resource } from 'core-app/core/apiv3/cache/cachable-apiv3-resource';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';
import { CatalogResource } from 'core-app/features/hal/resources/catalog-resource';
import { Apiv3CatalogsPaths } from 'core-app/core/apiv3/endpoints/catalogs/apiv3-catalogs-paths';
import { ApiV3CatalogItemsPaths } from 'core-app/core/apiv3/endpoints/catalogs_items/api-v3-catalog-items-paths';

export class Apiv3CatalogPaths extends ApiV3Resource<CatalogResource> {
  // /api/v3/catalogs/:tree_id/catalog_items
  public readonly catalog_items = new ApiV3CatalogItemsPaths(this.apiRoot, this.path);

  protected createCache():StateCacheService<CatalogResource> {
    return (this.parent as Apiv3CatalogsPaths).cache;
  }
}
