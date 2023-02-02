import { Observable } from 'rxjs';
import { ApiV3NestedOptionPaths } from './api-v3-nested-option-paths';
import { NestedOptionResource } from 'core-app/features/hal/resources/nested-option-resource';
import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { ApiV3Collection } from 'core-app/core/apiv3/cache/cachable-apiv3-collection';
import { StateCacheService } from 'core-app/core/apiv3/cache/state-cache.service';

export class ApiV3NestedOptionsPaths extends ApiV3Collection<NestedOptionResource, ApiV3NestedOptionPaths> {
  // Base path
  public readonly path:string;

  constructor(readonly apiRoot:ApiV3Service,
    protected basePath:string) {
    super(apiRoot, basePath, 'custom_nested_options', ApiV3NestedOptionPaths);
  }

  /**
   * Create a work package from a form payload
   *
   * @param payload
   * @return {Promise<WorkPackageResource>}
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
