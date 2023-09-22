import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { FlattreeComponent } from './components/flattree/flattree.component';
import { NestedtreeComponent } from './components/nestedtree/nestedtree.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'flat',
    pathMatch: 'full',
  },
  {
    path: 'flat',
    component: FlattreeComponent,
  },
  {
    path: 'nested',
    component: NestedtreeComponent
  }
]
@NgModule({
  imports: [
    CommonModule,

    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,

  ],
  declarations: []
})
export class AppRoutingModule { }