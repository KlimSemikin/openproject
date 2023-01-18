import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Injector,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { UntilDestroyedMixin } from 'core-app/shared/helpers/angular/until-destroyed.mixin';
import { CurrentUserService } from 'core-app/core/current-user/current-user.service';
import { CurrentProjectService } from 'core-app/core/current-project/current-project.service';
import { I18nService } from 'core-app/core/i18n/i18n.service';
import { populateInputsFromDataset } from 'core-app/shared/components/dataset-inputs';
import { ITreeOptions, TreeComponent } from '@circlon/angular-tree-component';
import { PathHelperService } from 'core-app/core/path-helper/path-helper.service';
import { random } from 'lodash';

export const cfHierachicalListSelector = 'cf-hierarchical-list';

@Component({
  selector: cfHierachicalListSelector,
  templateUrl: './hierarchical-list.component.html',
  styleUrls: ['./hierarchical-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchicalListComponent implements OnInit {
  @Input() public customOptions:any;

  ngOnInit(): void {
    console.log(this.customOptions)
  }

  ngAfterViewInit() {
    this.tree.treeModel.expandAll()
  }

  constructor(
    readonly elementRef:ElementRef,
    readonly injector:Injector,
    readonly pathHelper:PathHelperService
  ) {
    populateInputsFromDataset(this);
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
      description: 'description2',
      children: [
        { id: 5, value: 'child2.1', description: 'description2' },
        {
          id: 6,
          value: 'child2.2',
          description: 'description2',
          children: [
            { id: 7, value: 'subsub', description: 'description7' }
          ]
        }
      ]
    }
  ];

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  addNode() {
    let lastNode = this.nodes.slice(-1)
    console.log(lastNode)
    this.nodes.push({ id: Math.floor(Math.random() * 1000), value: '', description: '', children: []});
    
    this.tree.treeModel.update();
  }

  // options = {
  //   allowDrag: (node: { isLeaf: any; }) => node.isLeaf,
  //   allowDrop: (element: any, { parent, index }: any) => {
  //     // return true / false based on element, to.parent, to.index. e.g.
  //     return parent.hasChildren;
  //   }
  // };
  
  options: ITreeOptions = {
    allowDrag: true
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
