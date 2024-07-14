import { ServiceDetail } from "./service-detail";
import { ServiceType } from "./service-type";

export interface ServiceRequest {
    serviceRequestId?:number;
    customerName?:string;
    phone?:string;
    email?:string;
    serviceTypeId?:number;
    serviceType?:ServiceType;
    serviceDetails?:ServiceDetail[];
}
