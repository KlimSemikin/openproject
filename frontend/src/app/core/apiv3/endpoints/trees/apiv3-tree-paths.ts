import { ApiV3Resource } from 'core-app/core/apiv3/cache/cachable-apiv3-resource';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';
import { TreeResource } from 'core-app/features/hal/resources/tree-resource';
import { ApiV3TreesPaths } from 'core-app/core/apiv3/endpoints/trees/apiv3-trees-paths';
import { ApiV3NestedOptionsPaths } from 'core-app/core/apiv3/endpoints/nested_options/api-v3-nested-options-paths';

export class ApiV3TreePaths extends ApiV3Resource<TreeResource> {
  // /api/v3/trees/:tree_id/custom_nested_options
  public readonly custom_nested_options = new ApiV3NestedOptionsPaths(this.apiRoot, this.path);

  protected createCache():StateCacheService<TreeResource> {
    return (this.parent as ApiV3TreesPaths).cache;
  }
}
