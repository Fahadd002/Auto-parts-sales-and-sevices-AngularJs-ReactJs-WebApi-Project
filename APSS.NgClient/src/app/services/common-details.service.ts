import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CommonDetail } from '../models/data/common-detail';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CommonDetailsService {

  constructor(private http:HttpClient){}
  get():Observable<CommonDetail[]>{
    return this.http.get<CommonDetail[]>(`${apiUrl}/api/CommonDetails`);
  }
  getById(id:number):Observable<CommonDetail> {
    return this.http.get<CommonDetail>(`${apiUrl}/api/CommonDetails/${id}`);
  }
  post(data:CommonDetail):Observable<CommonDetail>{
    return this.http.post<CommonDetail>(`${apiUrl}/api/CommonDetails`, data);
  }
  put(data:CommonDetail):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/CommonDetails/${data.commonDetailId}`, data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/CommonDetails/${id}`);
  }
}
