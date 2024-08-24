import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProdutsComponent } from './components/produts/produts.component';
import { ProdutDetailsComponent } from './components/produt-details/produt-details.component';
import { CategoryComponent } from './components/produts/category/category.component';
import { FilterPriceComponent } from './components/produts/filter-price/filter-price.component';
import { FilterColorComponent } from './components/produts/filter-color/filter-color.component';
import { FilterSizeComponent } from './components/produts/filter-size/filter-size.component';


@NgModule({
  declarations: [
    ProdutsComponent,
    ProdutDetailsComponent,
    CategoryComponent,
    FilterPriceComponent,
    FilterColorComponent,
    FilterSizeComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
