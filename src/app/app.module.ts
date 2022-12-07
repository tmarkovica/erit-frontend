import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './modules/index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './modules/home/home.component';
import { SharedModule } from './modules/shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { IndexModule } from './modules/index/index.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    SharedModule,
    MatButtonModule,
    /* AngularEditorModule,
    IndexModule */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
