import { ProductDetailsComponent } from './product-details/product-details.component';
import { Home2Component } from './home2/home2.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentModule } from '../ui-components/component.module';
import { StorePagesRoutingModule } from './store-pages-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StorePagesRoutingModule,
    NgxPaginationModule,
    ComponentModule,
    HttpClientModule,

  ],
  declarations: [
    Home2Component,
    ProductDetailsComponent

  ]
})
export class StorePagesModule { }
