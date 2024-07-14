import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MultilevelMenuService,NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarPartListComponent } from './components/cart-part/car-part-list/car-part-list.component';
import { CarPartAddComponent } from './components/cart-part/car-part-add/car-part-add.component';
import { ProductService } from './services/product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceTypeService } from './services/service-type.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsDataDialogComponent } from './components/dialog/details-data-dialog/details-data-dialog.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { CarPartEditComponent } from './components/cart-part/car-part-edit/car-part-edit.component';
import { BikePartListComponent } from './components/bike-part/bike-part-list/bike-part-list.component';
import { BikePartAddComponent } from './components/bike-part/bike-part-add/bike-part-add.component';
import { BikePartEditComponent } from './components/bike-part/bike-part-edit/bike-part-edit.component';
import { ProductCategoryListComponent } from './components/product-category/product-category-list/product-category-list.component';
import { ProductCategoryEditComponent } from './components/product-category/product-category-edit/product-category-edit.component';
import { ProductCategoryAddComponent } from './components/product-category/product-category-add/product-category-add.component';
import { CommonDetailListComponent } from './components/common-details/common-detail-list/common-detail-list.component';
import { CommonDetailAddComponent } from './components/common-details/common-detail-add/common-detail-add.component';
import { CommonDetailEditComponent } from './components/common-details/common-detail-edit/common-detail-edit.component';
import { VehicleTypeListComponent } from './components/vehicle-type/vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeAddComponent } from './components/vehicle-type/vehicle-type-add/vehicle-type-add.component';
import { VehicleTypeEditComponent } from './components/vehicle-type/vehicle-type-edit/vehicle-type-edit.component';
import { ServiceRequestListComponent } from './components/service-request/service-request-list/service-request-list.component';
import { ServiceRequestAddComponent } from './components/service-request/service-request-add/service-request-add.component';
import { ServiceRequestEditComponent } from './components/service-request/service-request-edit/service-request-edit.component';
import { ServiceDetailDialogComponent } from './components/dialog/service-detail-dialog/service-detail-dialog.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderAddComponent } from './components/order/order-add/order-add.component';
import { OrderEditComponent } from './components/order/order-edit/order-edit.component';
import { OrderDetailDialogComponent } from './components/dialog/order-detail-dialog/order-detail-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    CarPartListComponent,
    CarPartAddComponent,
    DetailsDataDialogComponent,
    ConfirmDialogComponent,
    CarPartEditComponent,
    BikePartListComponent,
    BikePartAddComponent,
    BikePartEditComponent,
    ProductCategoryListComponent,
    ProductCategoryEditComponent,
    ProductCategoryAddComponent,
    CommonDetailListComponent,
    CommonDetailAddComponent,
    CommonDetailEditComponent,
    VehicleTypeListComponent,
    VehicleTypeAddComponent,
    VehicleTypeEditComponent,
    ServiceRequestListComponent,
    ServiceRequestAddComponent,
    ServiceRequestEditComponent,
    ServiceDetailDialogComponent,
    OrderListComponent,
    OrderAddComponent,
    OrderEditComponent,
    OrderDetailDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatImportModule,
    NgMaterialMultilevelMenuModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  providers: [
    provideAnimationsAsync(),
    MultilevelMenuService,
    HttpClient,
    ProductService,
    ServiceTypeService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
