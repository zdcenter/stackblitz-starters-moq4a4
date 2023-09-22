import { CdkDragDrop,  moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface MenuItem {
  id: number;
  name: string;
  parentID: number;
  order: number;
}

interface NestedMenuItem {
  id: number;
  name: string;
  order: number;
  children?: NestedMenuItem[];
}

// 下面的数据是后台返回的
const flatMenuData: MenuItem[] = [
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
  { id: 12, name: "西餐", parentID: 7, order: 2 },
];
/**
 * Flat node with expandable and level information
 *
 * 具有可扩展和级别信息的平面节点
 *
 */
 interface ExampleFlatNode {
  id: number;
  order: number;
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-flattree',
  templateUrl: './flattree.component.html',
  styleUrls: ['./flattree.component.css']
})
export class FlattreeComponent implements OnInit {
  TREE_DATA: NestedMenuItem[] = [];

  private _transformer = (node: NestedMenuItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      order: node.order,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.TREE_DATA = buildNestedMenu(flatMenuData, 0);
    console.log(this.TREE_DATA)
    this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {}

  drop(event: CdkDragDrop<NestedMenuItem[]>): void {
    console.log(event.previousContainer)
    const prevIndex = event.previousIndex;
    const newIndex = event.currentIndex;
    console.log(prevIndex, newIndex)
    // console.log(this.TREE_DATA[newIndex].id, this.TREE_DATA[newIndex].name);
  

    // // 下面数据是乱写的
    moveItemInArray(this.TREE_DATA, prevIndex, newIndex);
    this.dataSource.data = this.TREE_DATA;
  }

  info(MouseEvent: NestedMenuItem): void {
    console.log(MouseEvent.id, MouseEvent.name);
  }
}

// 后端数据转化为有层次结构的数据
function buildNestedMenu(menuItems: MenuItem[], parentID: number | null = null): NestedMenuItem[] {
  const nestedMenu: NestedMenuItem[] = [];

  const filteredItems = menuItems.filter(item => item.parentID === parentID);

  // 输出筛选后的菜单项，以进行调试
  // console.log('Filtered Items:', filteredItems);

  filteredItems.sort((a, b) => a.order - b.order);

  for (const menuItem of filteredItems) {
    const nestedMenuItem: NestedMenuItem = {
      id: menuItem.id,
      name: menuItem.name,
      order: menuItem.order,
    };

    const children = buildNestedMenu(menuItems, menuItem.id);
    if (children.length > 0) {
      nestedMenuItem.children = children;
    }

    nestedMenu.push(nestedMenuItem);
  }

  return nestedMenu;
}