import axios from "axios";
import { apiUrl } from "../models/app-constants";

export async function getCategories(){
    return await axios.get(`${apiUrl}/api/ProductCategories`);
}

export async function postCategories(data){
    return await axios.post(`${apiUrl}/api/ProductCategories`, data); 
}
