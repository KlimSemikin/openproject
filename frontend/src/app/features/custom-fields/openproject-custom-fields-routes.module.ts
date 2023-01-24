import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { CUSTOM_FIELDS_ROUTES } from 'core-app/features/custom-fields/routing/custom-fields-routes';

import { OpenprojectCustomFieldsModule } from 'core-app/features/custom-fields/openproject-custom-fields.module';

@NgModule({
  imports: [
    OpenprojectCustomFieldsModule,

    // Routes for /custom-fields
    UIRouterModule.forChild({ states: CUSTOM_FIELDS_ROUTES }),
  ],
})
export class OpenprojectCustomFieldsRoutesModule {
}
