import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarPartListComponent } from './components/cart-part/car-part-list/car-part-list.component';
import { CarPartAddComponent } from './components/cart-part/car-part-add/car-part-add.component';
import { CarPartEditComponent } from './components/cart-part/car-part-edit/car-part-edit.component';
import { BikePartListComponent } from './components/bike-part/bike-part-list/bike-part-list.component';
import { BikePartAddComponent } from './components/bike-part/bike-part-add/bike-part-add.component';
import { BikePartEditComponent } from './components/bike-part/bike-part-edit/bike-part-edit.component';
import { ProductCategoryListComponent } from './components/product-category/product-category-list/product-category-list.component';
import { ProductCategoryAddComponent } from './components/product-category/product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from './components/product-category/product-category-edit/product-category-edit.component';
import { VehicleTypeListComponent } from './components/vehicle-type/vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeAddComponent } from './components/vehicle-type/vehicle-type-add/vehicle-type-add.component';
import { VehicleTypeEditComponent } from './components/vehicle-type/vehicle-type-edit/vehicle-type-edit.component';
import { CommonDetailListComponent } from './components/common-details/common-detail-list/common-detail-list.component';
import { CommonDetailAddComponent } from './components/common-details/common-detail-add/common-detail-add.component';
import { CommonDetailEditComponent } from './components/common-details/common-detail-edit/common-detail-edit.component';
import { ServiceRequestListComponent } from './components/service-request/service-request-list/service-request-list.component';
import { ServiceRequestAddComponent } from './components/service-request/service-request-add/service-request-add.component';
import { ServiceRequestEditComponent } from './components/service-request/service-request-edit/service-request-edit.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderAddComponent } from './components/order/order-add/order-add.component';
import { OrderEditComponent } from './components/order/order-edit/order-edit.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'car-parts', component:CarPartListComponent},
  {path:'car-part-add', component:CarPartAddComponent},
  {path:'car-part-edit/:id', component:CarPartEditComponent},
  {path:'bike-parts',component:BikePartListComponent},
  {path:'bike-part-add',component:BikePartAddComponent},
  {path:'bike-part-edit/:id',component:BikePartEditComponent},
  {path:'categories',component:ProductCategoryListComponent},
  {path:'categories-add',component:ProductCategoryAddComponent},
  {path:'categories-edit/:id',component:ProductCategoryEditComponent},
  {path:'vehiclesTypes',component:VehicleTypeListComponent},
  {path:'vehiclesTypes-add',component:VehicleTypeAddComponent},
  {path:'vehiclesTypes-edit/:id',component:VehicleTypeEditComponent},
  {path:'commonDetails',component:CommonDetailListComponent},
  {path:'commonDetails-add',component:CommonDetailAddComponent},
  {path:'commonDetails-edit/:id',component:CommonDetailEditComponent},
  {path:'serviceRequest',component:ServiceRequestListComponent},
  {path:'serviceRequest-add',component:ServiceRequestAddComponent},
  {path:'serviceRequest-edit/:id',component:ServiceRequestEditComponent},
  {path:'order',component:OrderListComponent},
  {path:'order-add',component:OrderAddComponent},
  {path:'order-edit/:id',component:OrderEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
