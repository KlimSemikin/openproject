import { Ng2StateDeclaration } from '@uirouter/angular';
import { menuItemClass } from 'core-app/features/work-packages/routing/work-packages-routes';
import { CiListViewComponent } from 'core-app/features/catalog-items/routing/ci-list-view/ci-list-view.component';
import {
  WorkPackageViewPageComponent
} from 'core-app/features/work-packages/routing/wp-view-page/wp-view-page.component';
import { WorkPackagesBaseComponent } from 'core-app/features/work-packages/routing/wp-base/wp--base.component';

export const CATALOG_ITEMS_ROUTES:Ng2StateDeclaration[] = [
  // Должен вернуть базовый компонент и редирект на иерарх список
  // (в вп это work-packages.partitioned.list)
  {
    name: 'catalogs',
    parent: 'optional_project',
    url: '/catalogs/:id',
    redirectTo: 'catalogs.partitioned.list',
    views: {
      '!$default': { component: WorkPackagesBaseComponent },
    },
    data: {
      bodyClasses: 'router--work-packages-base',
      menuItem: menuItemClass,
      // '!$default': { component: HierarchicalListComponent },
    },
    // params: {
    //   query_id: { type: 'query', dynamic: true },
    //   // Use custom encoder/decoder that ensures validity of URL string
    //   query_props: { type: 'opQueryString' },
    //   // Optional initial tour param
    //   start_onboarding_tour: { type: 'query', squash: true, value: undefined },
    // },
  },
  {
    name: 'catalogs.partitioned',
    component: WorkPackageViewPageComponent,
    url: '',
    data: {
      // This has to be empty to avoid inheriting the parent bodyClasses
      bodyClasses: '',
    },
  },
  // Это то на что редиректит роут catalogs
  {
    name: 'catalogs.partitioned.list',
    url: '',

    reloadOnSearch: false,
    views: {
      // 'content-left': { component: WorkPackageListViewComponent },
      'content-left': { component: CiListViewComponent },
    },
    data: {
      bodyClasses: 'router--work-packages-partitioned-split-view',
      menuItem: menuItemClass,
      partition: '-left-only',
    },
  },
];
