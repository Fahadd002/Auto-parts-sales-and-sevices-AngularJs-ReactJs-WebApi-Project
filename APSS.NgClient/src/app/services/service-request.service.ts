import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../shared/app-constants';
import { ServiceRequest } from '../models/data/service-request';
import { ServiceType } from '../models/data/service-type';
import { ServiceDetail } from '../models/data/service-detail';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  constructor(private http:HttpClient) { }
  get():Observable<ServiceRequest[]>{
    return this.http.get<ServiceRequest[]>(`${apiUrl}/api/ServiceRequests`);
  }
  getById(id:number):Observable<ServiceRequest> {
    return this.http.get<ServiceRequest>(`${apiUrl}/api/ServiceRequests/${id}`);
  }
  getByIdInclude(id:number):Observable<ServiceRequest> {
    return this.http.get<ServiceRequest>(`${apiUrl}/api/ServiceRequests/${id}/Include`);
  }
  getServiceTypes():Observable<ServiceType[]>{
    return this.http.get<ServiceType[]>(`${apiUrl}/api/ServiceTypes`)
  }
  getServiceTypesOf(id:number):Observable<ServiceType[]>{
    return this.http.get<ServiceType[]>(`${apiUrl}/api/ServiceTypes/Of/${id}`)
  }

    ////-----
    getWithDetails():Observable<ServiceRequest[]>{
      return this.http.get<ServiceRequest[]>(`${apiUrl}/api/ServiceRequests/Details/Include`);
    }
    getDetails(id:number): Observable<ServiceDetail[]>{
      return this.http.get<ServiceDetail[]>(`${apiUrl}/api/ServiceRequests/Details/Of/${id}`);
    }
////////Create
create(data:ServiceRequest):Observable<ServiceRequest>{
  return this.http.post<ServiceRequest>(`${apiUrl}/api/ServiceRequests`, data);
}
/////////edit
put(data:ServiceRequest):Observable<any>{
  return this.http.put<any>(`${apiUrl}/api/ServiceRequests/${data.serviceRequestId}`, data);
}

////////Delete
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/ServiceRequests/${id}`);
  }
}
