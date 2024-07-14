import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../shared/app-constants';
import { ProductCategory } from '../models/data/product-category';
import { VehicleType } from '../models/data/vehicle-type';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http:HttpClient){}
    get():Observable<ProductCategory[]>{
      return this.http.get<ProductCategory[]>(`${apiUrl}/api/ProductCategories`);
    }
    getById(id:number):Observable<ProductCategory> {
      return this.http.get<ProductCategory>(`${apiUrl}/api/ProductCategories/${id}`);
    }
    post(data:ProductCategory):Observable<ProductCategory>{
      return this.http.post<ProductCategory>(`${apiUrl}/api/ProductCategories`, data);
    }
    put(data:ProductCategory):Observable<any>{
      return this.http.put<any>(`${apiUrl}/api/ProductCategories/${data.productCategoryId}`, data);
    }
    delete(id:number):Observable<any>{
      return this.http.delete<any>(`${apiUrl}/api/ProductCategories/${id}`);
    }
    getTypes():Observable<VehicleType[]>{
      return this.http.get<VehicleType[]>(`${apiUrl}/api/VehicleTypes`);
    }

    getTypesById(id:number):Observable<VehicleType> {
      return this.http.get<VehicleType>(`${apiUrl}/api/VehicleTypes/${id}`);
    }

}
