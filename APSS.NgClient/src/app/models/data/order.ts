import { Customer } from "./customer";
import { OrderDetail } from "./order-detail";

export interface Order {
    orderId?:number;
    orderDate?:Date;
    customerId?:number;
    customer?:Customer;
    orderDetails?:OrderDetail[];
}
