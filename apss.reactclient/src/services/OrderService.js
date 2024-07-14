import axios from "axios";
import { apiUrl } from "../models/app-constants";

export async function getOrderDtos(){
    return await axios.get(`${apiUrl}/api/Orders/DTO`);
}
export async function getOrderDetails(id){
    return await axios.get(`${apiUrl}/api/Orders/Details/Of/DTO/${id}`);
}
export async function postOrder(data){
    return await axios.post(`${apiUrl}/api/Orders`, data); 
}
export async function getCustomers()
{
    return await axios.get(`${apiUrl}/api/Customers`);
}

export async function getOrderById(id){
    return await axios.get(`${apiUrl}/api/Orders/${id}/Include`);
}

export async function putOrder(id, data){
    console.log(data)
    return await axios.put(`${apiUrl}/api/Orders/${id}`, data); 
}

export async function deleteOrder(id){
    //console.log('delp', id);
    return await axios.delete(`${apiUrl}/api/Orders/${id}`);  
}