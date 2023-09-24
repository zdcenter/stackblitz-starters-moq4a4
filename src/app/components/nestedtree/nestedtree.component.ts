import { Component, OnInit } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NestedTreeControl } from '@angular/cdk/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 *
 * 具有嵌套结构的食物数据。每个节点都有一个名称和一个可选的子节点列表。
 *
 */
interface FoodNode {
  id: number;
  name: string;
  order: number;
  children?: FoodNode[];
}

let TREE_DATA: FoodNode[] = [
  {
    id: 1,
    name: '新闻',
    order: 0,
    children: [
      {
        id: 2,
        name: '国内新闻',
        order: 1,
        children: [
          {
            id: 9,
            name: '娱乐',
            order: 1,
          },
          {
            id: 10,
            name: '旅游',
            order: 2,
          },
        ],
      },
      {
        id: 4,
        name: '国际新闻',
        order: 2,
      },
      {
        id: 11,
        name: '娱乐新闻',
        order: 4,
      },
    ],
  },
  {
    id: 3,
    name: '编程语言',
    order: 0,
    children: [
      {
        id: 6,
        name: 'Golang',
        order: 1,
      },
      {
        id: 5,
        name: 'C++',
        order: 2,
      },
    ],
  },
  {
    id: 7,
    name: '菜单',
    order: 0,
    children: [
      {
        id: 8,
        name: '中餐',
        order: 1,
      },
      {
        id: 12,
        name: '西餐',
        order: 2,
      },
    ],
  },
];

@Component({
  selector: 'app-nestedtree',
  templateUrl: './nestedtree.component.html',
  styleUrls: ['./nestedtree.component.css'],
})
export class NestedtreeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;


  drop(event: CdkDragDrop<FoodNode[]>)  {

    const prevIndex = event.previousIndex;
    const newIndex = event.currentIndex;

    console.log(prevIndex, newIndex)
    console.log(TREE_DATA[4].id,TREE_DATA[4].name);
  
    // // 下面数据是乱写的
    moveItemInArray(TREE_DATA, prevIndex, newIndex);
    // this.dataSource= TREE_DATA;
    // this.treeControl.collapseAll();
    // this.treeControl.expandAll();
  }
}
