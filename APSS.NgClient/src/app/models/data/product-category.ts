import { VehicleType } from "./vehicle-type";

export interface ProductCategory {
    productCategoryId?:number;
    productCategoryName?:string;
    vehicleTypeId?:number;
    vehicleType?:VehicleType
}
