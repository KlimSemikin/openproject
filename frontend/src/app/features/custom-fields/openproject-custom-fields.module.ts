import { HierarchicalListComponent } from './hierarchical-list/hierarchical-list.component';
import { NgModule } from '@angular/core';
import { TreeModule } from '@circlon/angular-tree-component';

@NgModule({
  imports: [
    TreeModule,
  ],
  declarations: [
    HierarchicalListComponent,
  ],
})
export class OpenprojectCustomFieldsModule {
}
