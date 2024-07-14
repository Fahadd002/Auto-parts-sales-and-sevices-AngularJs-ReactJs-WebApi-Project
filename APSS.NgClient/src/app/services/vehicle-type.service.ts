import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../shared/app-constants';
import { VehicleType } from '../models/data/vehicle-type';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http:HttpClient){}
  get():Observable<VehicleType[]>{
    return this.http.get<VehicleType[]>(`${apiUrl}/api/VehicleTypes`);
  }
  getById(id:number):Observable<VehicleType> {
    return this.http.get<VehicleType>(`${apiUrl}/api/VehicleTypes/${id}`);
  }
  post(data:VehicleType):Observable<VehicleType>{
    return this.http.post<VehicleType>(`${apiUrl}/api/VehicleTypes`, data);
  }
  put(data:VehicleType):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/VehicleTypes/${data.vehicleTypeId}`, data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/VehicleTypes/${id}`);
  }
}
