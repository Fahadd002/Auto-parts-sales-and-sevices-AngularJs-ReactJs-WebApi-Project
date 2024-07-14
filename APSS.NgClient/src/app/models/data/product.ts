import { ProductCategory } from "./product-category";
import { ProductDetail } from "./product-detail";
import { ProductPicture } from "./product-picture";

export interface Product {
    productId?:number;
    productName?:string;
    price?:number;
    shortDescription?:string;
    productCategoryId?:number
    productCategory?:ProductCategory;
    productDetails?:ProductDetail[];
    productPictures?:ProductPicture[];
}
