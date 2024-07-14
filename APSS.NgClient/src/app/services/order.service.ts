import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../shared/app-constants';
import { Order } from '../models/data/order';
import { Customer } from '../models/data/customer';
import { OrderDetail } from '../models/data/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  get():Observable<Order[]>{
    return this.http.get<Order[]>(`${apiUrl}/api/Orders`);
  }
  getById(id:number):Observable<Order> {
    return this.http.get<Order>(`${apiUrl}/api/Orders/${id}`);
  }
  getByIdInclude(id:number):Observable<Order> {
    return this.http.get<Order>(`${apiUrl}/api/Orders/${id}/Include`);
  }
  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${apiUrl}/api/Customers`)
  }
  getCustomersOf(id:number):Observable<Customer[]>{
    return this.http.get<Customer[]>(`${apiUrl}/api/Customers/Of/${id}`)
  }

    ////-----
    getWithDetails():Observable<Order[]>{
      return this.http.get<Order[]>(`${apiUrl}/api/Orders/Details/Include`);
    }
    getDetails(id:number): Observable<OrderDetail[]>{
      return this.http.get<OrderDetail[]>(`${apiUrl}/api/Orders/Details/Of/${id}`);
    }
    getOrderDetails():Observable<OrderDetail[]>{
      return this.http.get<OrderDetail[]>(`${apiUrl}/api/OrderDetails`);
    }
    ////////Create
create(data:Order):Observable<Order>{
  return this.http.post<Order>(`${apiUrl}/api/Orders`, data);
}
/////////edit
put(data:Order):Observable<any>{
  return this.http.put<any>(`${apiUrl}/api/Orders/${data.orderId}`, data);
}

////////Delete
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/Orders/${id}`);
  }
}
