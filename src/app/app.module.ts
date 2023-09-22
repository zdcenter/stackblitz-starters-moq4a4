import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [CommonModule, BrowserModule, MaterialModule, DragDropModule],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
