import { I18nService } from 'core-app/core/i18n/i18n.service';
import { States } from 'core-app/core/states/states.service';
import { PathHelperService } from 'core-app/core/path-helper/path-helper.service';
import { InjectField } from 'core-app/shared/helpers/angular/inject-field.decorator';
import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { HalResource } from 'core-app/features/hal/resources/hal-resource';
import isNewResource from 'core-app/features/hal/helpers/is-new-resource';
import { InputState } from 'reactivestates';

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

  public defaultValue:any;

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
  public get state():InputState<this> {
    return this.states.custom_nested_options.get(this.id!) as any;
  }
}

export interface NestedOptionResource extends NestedOptionBaseResource, NestedOptionResourceLinks, NestedOptionResourceEmbedded {
}
