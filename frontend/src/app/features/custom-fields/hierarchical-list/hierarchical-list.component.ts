import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { UntilDestroyedMixin } from 'core-app/shared/helpers/angular/until-destroyed.mixin';
import { CurrentUserService } from 'core-app/core/current-user/current-user.service';
import { CurrentProjectService } from 'core-app/core/current-project/current-project.service';
import { I18nService } from 'core-app/core/i18n/i18n.service';
import { populateInputsFromDataset } from 'core-app/shared/components/dataset-inputs';
import { ITreeOptions } from '@circlon/angular-tree-component';

export const cfHierachicalListSelector = 'cf-hierarchical-list';

@Component({
  selector: cfHierachicalListSelector,
  templateUrl: './hierarchical-list.component.html',
  styleUrls: ['./hierarchical-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchicalListComponent implements OnInit {
  ngOnInit(): void {
  }

  nodes = [
    {
      id: 1,
      value: 'value1',
      description: 'description1',
      children: [
        { id: 2, value: 'value2', description: 'description2' },
        { id: 3, value: 'value3', description: 'description3' }
      ]
    },
    {
      id: 4,
      value: 'root2',
      description: '',
      children: [
        { id: 5, value: 'child2.1', description: '' },
        {
          id: 6,
          value: 'child2.2',
          description: '',
          children: [
            { id: 7, value: 'subsub', description: 'description7' }
          ]
        }
      ]
    }
  ];

  // options = {
  //   allowDrag: (node: { isLeaf: any; }) => node.isLeaf,
  //   allowDrop: (element: any, { parent, index }: any) => {
  //     // return true / false based on element, to.parent, to.index. e.g.
  //     return parent.hasChildren;
  //   }
  // };
  
  options: ITreeOptions = {
    allowDrag: true,
    idField: 'uuid'
  };

  onMoveNode($event:any) {
    console.log(
      "Moved",
      $event.node.name,
      "to",
      $event.to.parent.name,
      "at index",
      $event.to.index);
  }
}
