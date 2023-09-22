import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule} from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { FlattreeComponent } from './components/flattree/flattree.component';

@NgModule({
  imports: [CommonModule, BrowserModule, AppRoutingModule, MaterialModule],

  declarations: [AppComponent, FlattreeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
