import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { FlattreeComponent } from './components/flattree/flattree.component';
import { NestedtreeComponent } from './components/nestedtree/nestedtree.component';
import { CdkflattreeComponent } from './components/cdkflattree/cdkflattree.component';
import { TesttreeComponent } from './components/testtree/testtree.component';

@NgModule({
  imports: [CommonModule, BrowserModule, AppRoutingModule, MaterialModule],

  declarations: [
    AppComponent,
    FlattreeComponent,
    NestedtreeComponent,
    CdkflattreeComponent,
    TesttreeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
