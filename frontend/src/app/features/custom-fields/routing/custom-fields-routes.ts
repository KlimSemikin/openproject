import { Ng2StateDeclaration } from '@uirouter/angular';
import { HierarchicalListComponent } from 'core-app/features/custom-fields/hierarchical-list/hierarchical-list.component';

export const CUSTOM_FIELDS_ROUTES:Ng2StateDeclaration[] = [
  {
    name: 'trees',
    parent: 'optional_project',
    url: '/trees/:id',

    views: {
      '!$default': { component: HierarchicalListComponent },
    },
    data: {
    },
    params: {
    },
  },
];
