import { I18nService } from 'core-app/core/i18n/i18n.service';
import { States } from 'core-app/core/states/states.service';
import { PathHelperService } from 'core-app/core/path-helper/path-helper.service';
import { InjectField } from 'core-app/shared/helpers/angular/inject-field.decorator';
import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { HalResource } from 'core-app/features/hal/resources/hal-resource';
import { Attachable } from 'core-app/features/hal/resources/mixins/attachable-mixin';
import isNewResource from 'core-app/features/hal/helpers/is-new-resource';

// Resource classes for nodes (custom_nested_options) for trees (custom_fields with field_format = 'tree')
export interface NestedOptionResourceEmbedded {
  ancestors:NestedOptionResource[];
  children:NestedOptionResource[];
  parent:NestedOptionResource|null;
  tree:HalResource|any;
}

export interface NestedOptionResourceLinks extends NestedOptionResourceEmbedded {
  addChild(child:HalResource):Promise<any>;

  changeParent(params:any):Promise<any>;

  self():Promise<NestedOptionResource>;
}

export class NestedOptionBaseResource extends HalResource {
  public $embedded:NestedOptionResourceEmbedded;

  public $links:NestedOptionResourceLinks;

  public value:string;

  public description:any;

  public position:any;

  @InjectField() I18n!:I18nService;

  @InjectField() states:States;

  @InjectField() apiV3Service:ApiV3Service;

  @InjectField() pathHelper:PathHelperService;

  /**
   * Return the ids of all its ancestors, if any
   */
  public get ancestorIds():string[] {
    const { ancestors } = this as any;
    return ancestors.map((el:NestedOptionResource) => el.id!);
  }

  public get isLeaf():boolean {
    const { children } = this.$links;
    return !(children && children.length > 0);
  }

  public previewPath() {
    if (!isNewResource(this)) {
      return this.apiV3Service.custom_nested_options.id(this.id!).path;
    }
    return super.previewPath();
  }

  public isParentOf(otherNestedOption:NestedOptionResource) {
    return otherNestedOption.parent?.$links.self.$link.href === this.$links.self.$link.href;
  }

  /**
   * Invalidate a set of linked resources of this work package.
   * And inform the cache service about the work package update.
   *
   * Return a promise that returns the linked resources as properties.
   * Return a rejected promise, if the resource is not a property of the work package.
   */
  // public updateLinkedResources(...resourceNames:string[]):Promise<any> {
  //   const resources:{ [id:string]:Promise<HalResource> } = {};
  //
  //   resourceNames.forEach((name) => {
  //     const linked = this[name];
  //     resources[name] = linked ? linked.$update() : Promise.reject(undefined);
  //   });
  //
  //   const promise = Promise.all(_.values(resources));
  //   promise.then(() => {
  //     this.wpCacheService.touch(this.id!);
  //   });
  //
  //   return promise;
  // }

  public $initialize(source:any) {
    super.$initialize(source);
  }

  /**
   * Exclude the schema _link from the linkable Resources.
   */
  public $linkableKeys():string[] {
    return _.without(super.$linkableKeys(), 'schema');
  }

  /**
   * Return the associated state to this HAL resource, if any.
   */
  // public get state():InputState<this> {
  //   return this.states.workPackages.get(this.id!) as any;
  // }

  /**
   * Update the state
   */
  // public push(newValue:this):Promise<unknown> {
  //   this.wpActivity.clear(newValue.id);
  //
  //   // If there is a parent, its view has to be updated as well
  //   if (newValue.parent) {
  //     this.apiV3Service.work_packages.id(newValue.parent).refresh();
  //   }
  //
  //   return this.apiV3Service.work_packages.cache.updateWorkPackage(newValue as any);
  // }
}

export const NestedOptionResource = Attachable(NestedOptionBaseResource);

export interface NestedOptionResource extends NestedOptionBaseResource, NestedOptionResourceLinks, NestedOptionResourceEmbedded {
}
