import { ApiV3Resource } from 'core-app/core/apiv3/cache/cachable-apiv3-resource';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';
import { NestedOptionResource } from 'core-app/features/hal/resources/nested-option-resource';
import { ApiV3NestedOptionsPaths } from 'core-app/core/apiv3/endpoints/nested_options/api-v3-nested-options-paths';

export class ApiV3NestedOptionPaths extends ApiV3Resource<NestedOptionResource> {

  protected createCache():StateCacheService<NestedOptionResource> {
    return (this.parent as ApiV3NestedOptionsPaths).cache;
  }
}
