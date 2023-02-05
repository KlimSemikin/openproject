import { I18nService } from 'core-app/core/i18n/i18n.service';
import { States } from 'core-app/core/states/states.service';
import { PathHelperService } from 'core-app/core/path-helper/path-helper.service';
import { InjectField } from 'core-app/shared/helpers/angular/inject-field.decorator';
import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { HalResource } from 'core-app/features/hal/resources/hal-resource';
import isNewResource from 'core-app/features/hal/helpers/is-new-resource';
import { InputState } from 'reactivestates';

// Resource classes for nodes (catalog_items) for catalogs (custom_fields with field_format = 'tree')
export interface CatalogItemResourceEmbedded {
  ancestors:CatalogItemResource[];
  children:CatalogItemResource[];
  parent:CatalogItemResource|null;
  tree:HalResource|any;
}

export interface CatalogItemResourceLinks extends CatalogItemResourceEmbedded {
  addChild(child:HalResource):Promise<any>;

  changeParent(params:any):Promise<any>;

  self():Promise<CatalogItemResource>;
}

export class CatalogItemBaseResource extends HalResource {
  public $embedded:CatalogItemResourceEmbedded;

  public $links:CatalogItemResourceLinks;

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
    return ancestors.map((el:CatalogItemResource) => el.id!);
  }

  public get isLeaf():boolean {
    const { children } = this.$links;
    return !(children && children.length > 0);
  }

  public previewPath() {
    if (!isNewResource(this)) {
      return this.apiV3Service.catalog_items.id(this.id!).path;
    }
    return super.previewPath();
  }

  public isParentOf(otherCatalogItem:CatalogItemResource) {
    return otherCatalogItem.parent?.$links.self.$link.href === this.$links.self.$link.href;
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
    return this.states.catalog_items.get(this.id!) as any;
  }
}

export interface CatalogItemResource extends CatalogItemBaseResource, CatalogItemResourceLinks, CatalogItemResourceEmbedded {
}
