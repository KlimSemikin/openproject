import { Ng2StateDeclaration } from '@uirouter/angular';
import { HierarchicalListComponent } from 'core-app/features/custom-fields/hierarchical-list/hierarchical-list.component';
import { WorkPackageListViewComponent } from 'core-app/features/work-packages/routing/wp-list-view/wp-list-view.component';
import { menuItemClass } from 'core-app/features/work-packages/routing/work-packages-routes';
import { WorkPackagesBaseComponent } from 'core-app/features/work-packages/routing/wp-base/wp--base.component';
import { HierarchicalListViewComponent } from 'core-app/features/custom-fields/routing/hierarchical-list-view/hierarchical-list-view.component';
import {
  WorkPackageViewPageComponent
} from 'core-app/features/work-packages/routing/wp-view-page/wp-view-page.component';

export const CUSTOM_FIELDS_ROUTES:Ng2StateDeclaration[] = [
  // Должен вернуть базовый компонент и редирект на иерарх список
  // (в вп это work-packages.partitioned.list)
  {
    name: 'trees',
    parent: 'optional_project',
    url: '/trees/:id',
    redirectTo: 'trees.partitioned.list',
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
    name: 'trees.partitioned',
    component: WorkPackageViewPageComponent,
    url: '',
    data: {
      // This has to be empty to avoid inheriting the parent bodyClasses
      bodyClasses: '',
    },
  },
  // Это то на что редиректит роут trees
  {
    name: 'trees.partitioned.list',
    url: '',

    reloadOnSearch: false,
    views: {
      // 'content-left': { component: WorkPackageListViewComponent },
      'content-left': { component: HierarchicalListViewComponent },
    },
    data: {
      bodyClasses: 'router--work-packages-partitioned-split-view',
      menuItem: menuItemClass,
      partition: '-left-only',
    },
  },
];
