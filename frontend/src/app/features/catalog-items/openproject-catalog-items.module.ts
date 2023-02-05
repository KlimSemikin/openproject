import { HierarchicalListComponent } from './hierarchical-list/hierarchical-list.component';
import { NgModule } from '@angular/core';
import { TreeModule } from '@circlon/angular-tree-component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OpenprojectWorkPackagesModule } from 'core-app/features/work-packages/openproject-work-packages.module';

import {
  CiListViewComponent,
} from 'core-app/features/catalog-items/routing/ci-list-view/ci-list-view.component';
import {
  HierarchicalTableListComponent,
} from 'core-app/features/catalog-items/components/ci-table/wp-table.component';
import {
  SortHeaderDirective
} from 'core-app/features/catalog-items/components/ci-table/sort-header/sort-header.directive';
import { CatalogItemsBaseComponent } from 'core-app/features/catalog-items/routing/ci-base/ci--base.component';
import { OPSharedModule } from 'core-app/shared/shared.module';
import { OpenprojectFieldsModule } from 'core-app/shared/components/fields/openproject-fields.module';
import { OpenprojectEditorModule } from 'core-app/shared/components/editor/openproject-editor.module';
import { OpenprojectAttachmentsModule } from 'core-app/shared/components/attachments/openproject-attachments.module';
import { OpenprojectBcfModule } from 'core-app/features/bim/bcf/openproject-bcf.module';
import { OpenprojectProjectsModule } from 'core-app/features/projects/openproject-projects.module';
import { OpenprojectModalModule } from 'core-app/shared/components/modal/modal.module';
import {
  OpenprojectAutocompleterModule
} from 'core-app/shared/components/autocompleter/openproject-autocompleter.module';
import { OpWpTabsModule } from 'core-app/features/work-packages/components/wp-tabs/wp-tabs.module';
import {
  EditFieldControlsModule
} from 'core-app/shared/components/fields/edit/field-controls/edit-field-controls.module';
import { OpenprojectTabsModule } from 'core-app/shared/components/tabs/openproject-tabs.module';
import { OpenprojectStoragesModule } from 'core-app/shared/components/storages/openproject-storages.module';
import {
  PartitionedQuerySpacePageComponent
} from 'core-app/features/work-packages/routing/partitioned-query-space-page/partitioned-query-space-page.component';
import {
  WorkPackageViewPageComponent
} from 'core-app/features/work-packages/routing/wp-view-page/wp-view-page.component';

@NgModule({
  imports: [
    [TreeModule, BrowserModule, FormsModule],
    // Commons
    OPSharedModule,
    // Display + Edit field functionality
    OpenprojectFieldsModule,
    // CKEditor
    OpenprojectEditorModule,

    OpenprojectAttachmentsModule,

    OpenprojectBcfModule,

    OpenprojectProjectsModule,

    OpenprojectModalModule,

    OpenprojectAutocompleterModule,

    OpWpTabsModule,

    EditFieldControlsModule,
    OpenprojectTabsModule,
    OpenprojectStoragesModule,
  ],
  declarations: [

    HierarchicalListComponent,
    SortHeaderDirective,
    CiListViewComponent,
    HierarchicalTableListComponent,
    CatalogItemsBaseComponent,



  ],
  exports: [
    HierarchicalTableListComponent,
  ],
})
export class OpenprojectCatalogItemsModule {
}
