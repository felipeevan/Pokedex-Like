import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';



import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';
import {GalleriaModule} from 'primeng/galleria';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './error404/error404.component';
import { TitleCasePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    DetailComponent,
    HeaderComponent,
    FooterComponent,
    Error404Component,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    CardModule,
    ProgressSpinnerModule,
    DropdownModule,
    TableModule,
    AccordionModule,
    GalleriaModule
  ],
  providers: [
    HttpClientModule,
    ApiService,
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
