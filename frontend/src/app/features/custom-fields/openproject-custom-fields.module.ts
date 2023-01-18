import { HierarchicalListComponent } from './hierarchical-list/hierarchical-list.component';
import { NgModule } from '@angular/core';
import { TreeModule } from '@circlon/angular-tree-component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    [TreeModule, BrowserModule, FormsModule]
  ],
  declarations: [
    HierarchicalListComponent,
  ],
})
export class OpenprojectCustomFieldsModule {
}
