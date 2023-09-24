import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material/tree';

export interface Role {
  id: number;
  name: string;
  parentID: number;
  order: number;
  children?: Role[];
}

let roles: Role[] = [
  { id: 1, name: "新闻", parentID: 0, order: 0 },
  { id: 2, name: "国内新闻", parentID: 1, order: 1 },
  { id: 3, name: "编程语言", parentID: 0, order: 0 },
  { id: 4, name: "国际新闻", parentID: 1, order: 2 },
  { id: 5, name: "C++", parentID: 3, order: 2 },
  { id: 6, name: "Golang", parentID: 3, order: 1 },
  { id: 7, name: "菜单", parentID: 0, order: 0 },
  { id: 8, name: "中餐", parentID: 7, order: 1 },
  { id: 9, name: "娱乐", parentID: 2, order: 1 },
  { id: 10, name: "旅游", parentID: 2, order: 2 },
  { id: 11, name: "娱乐新闻", parentID: 1, order: 4 },
  { id: 8, name: "西餐", parentID: 7, order: 2 },
];

@Component({
  selector: 'app-testtree',
  templateUrl: './testtree.component.html',
  styleUrls: ['./testtree.component.css']
})
export class TesttreeComponent implements OnInit {
  treeData: Role[] = [];
  // treeControl = new NestedTreeControl<Role>(node => node.children);
  // dataSource = new MatTreeNestedDataSource<Role>();

  // hasChild = (_: number, node: Role) => !! node.children && node.children.length > 0;

  constructor() { 
    // this.treeData =  buildTree(roles, 0);
    // console.log(this.treeData);
    // this.dataSource.data = this.treeData;
  }

  ngOnInit() {
 
  }


  onDrop(event: CdkDragDrop<Role[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}

function buildTree(data: Role[], parentId: number): Role[] {
  const tree: Role[] = [];
  
  for (const item of data) {
    if (item.parentID === parentId) {
      const children = buildTree(data, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    }
  }
  
  return tree;
}