import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { CATALOG_ITEMS_ROUTES } from 'core-app/features/catalog-items/routing/ci-routes';

import { OpenprojectCatalogItemsModule } from 'core-app/features/catalog-items/openproject-catalog-items.module';

@NgModule({
  imports: [
    OpenprojectCatalogItemsModule,

    // Routes for /catalog-items
    UIRouterModule.forChild({ states: CATALOG_ITEMS_ROUTES}),
  ],
})
export class OpenprojectCatalogItemsRoutesModule {
}
