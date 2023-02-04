import { HierarchicalListComponent } from './hierarchical-list/hierarchical-list.component';
import { NgModule } from '@angular/core';
import { TreeModule } from '@circlon/angular-tree-component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OpenprojectWorkPackagesModule } from 'core-app/features/work-packages/openproject-work-packages.module';

import {
  HierarchicalListViewComponent,
} from 'core-app/features/custom-fields/routing/hierarchical-list-view/hierarchical-list-view.component';
import {
  HierarchicalTableListComponent,
} from 'core-app/features/custom-fields/components/table-hierarchical-list/wp-table.component';
import {
  SortHeaderDirective
} from 'core-app/features/custom-fields/components/table-hierarchical-list/sort-header/sort-header.directive';

@NgModule({
  imports: [
    [TreeModule, BrowserModule, FormsModule],
    OpenprojectWorkPackagesModule,
    //OpenprojectWorkPackagesModule,
  ],
  declarations: [

    HierarchicalListComponent,
    SortHeaderDirective,
    HierarchicalListViewComponent,
    HierarchicalTableListComponent,

  //  HierarchicalInlineCreateComponent,
   // WorkPackageTableSumsRowController,
    // WorkPackageSettingsButtonComponent,


  ],
  exports: [
    HierarchicalTableListComponent,
  ],
})
export class OpenprojectCustomFieldsModule {
}
