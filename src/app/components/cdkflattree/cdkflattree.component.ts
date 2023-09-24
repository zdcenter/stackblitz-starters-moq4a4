import { Component, OnInit } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';

const oldNavs: Nav[] = [
  { id: 1, title: "新闻", url: "", parent_id: 0 },
  { id: 2, title: "国内新闻", url: "", parent_id: 1 },
  { id: 3, title: "编程语言", url: "", parent_id: 0 },
  { id: 4, title: "国际新闻", url: "", parent_id: 1 },
  { id: 5, title: "C++", url: "", parent_id: 3 },
  { id: 6, title: "Golang", url: "", parent_id: 3 },
  { id: 7, title: "菜单", url: "", parent_id: 0 },
  { id: 8, title: "中餐", url: "", parent_id: 7 },
  { id: 9, title: "国内娱乐", url: "", parent_id: 2 },
  { id: 10, title: "国内旅游", url: "", parent_id: 2 },
  { id: 11, title: "娱乐新闻", url: "", parent_id: 1 },
  { id: 12, title: "西餐", url: "", parent_id: 7 },
]

interface Nav {
  id: number;
  title: string;
  url: string;
  parent_id: number;
}

interface NewNav extends Nav {
  level: number;
  isExpanded?: boolean; //默认值 undefined
  expandable: boolean;
}

@Component({
  selector: 'app-cdkflattree',
  templateUrl: './cdkflattree.component.html',
  styleUrls: ['./cdkflattree.component.css']
})
export class CdkflattreeComponent implements OnInit {
 // 数组和对象必须初始化，普通变量是有默认初始化的
  // dataList = new Array<NewNav>();

  dataList = this.getMenuList(oldNavs)

  constructor() {
    console.log("constructor");
  }
  ngOnInit(): void {
    console.log("ngOnInit");
    // this.dataList = this.getMenuList(oldNavs)
    console.log(this.dataList);
  }


  treeControl = new FlatTreeControl<NewNav>(
    node => node.level,
    node => node.expandable,
  );

  dataSource = new ArrayDataSource(this.dataList);

  hasChild = (_: number, node: NewNav) => node.expandable;

  getParentNode(node: NewNav) {
    const nodeIndex = this.dataList.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.dataList[i].level === node.level - 1) {
        return this.dataList[i];
      }
    }

    return null;
  }

  shouldRender(node: NewNav) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

  drop(event: CdkDragDrop<NewNav[]>) {
    console.log(event.previousIndex, event.currentIndex);
    
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
    // this.dataList[0].level = 0;

  
    console.log(this.dataList);
  }

  // 重新排序的菜单给新数组
  getMenuList(currentList: Nav[]) {

    let newList: NewNav[] = [];

    currentList.forEach(element => {
      if (element.parent_id === 0) {
        // 菜单深度
        let countLevel = 0;
        let temp: NewNav = {
          "id": element.id,
          "title": element.title,
          "url": element.url,
          "parent_id": element.parent_id,
          "level": countLevel,
          "isExpanded": true,
          "expandable": true
        };

        // 返回数组的长度
        newList.push(temp);
        this.findChilds(currentList, element.id, newList, countLevel)
      }
    })
    return newList;
  }


  findChilds(currentList: Nav[], pid: number, newList: NewNav[], level: number) {
    level++;
    currentList.forEach(element => {
      if (element.parent_id === pid) {
        let temp: NewNav = {
          "id": element.id,
          "title": element.title,
          "url": element.url,
          "parent_id": element.parent_id,
          "level": level,
          "isExpanded": true,
          "expandable": true
        };
        newList.push(temp)
        this.findChilds(currentList, element.id, newList, level)
      }
    });
  }


}
