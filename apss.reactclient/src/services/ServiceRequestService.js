import axios from "axios";
import { apiUrl } from "../models/app-constants";

export async function getServiceDtos(){
    return await axios.get(`${apiUrl}/api/ServiceRequests/DTO`);
}
export async function getServiceDetails(id){
    return await axios.get(`${apiUrl}/api/ServiceRequests/Details/Of/${id}`);
}
export async function postServiceRequest(data){
    return await axios.post(`${apiUrl}/api/ServiceRequests`, data); 
}
export async function getserviceTypes()
{
    return await axios.get(`${apiUrl}/api/ServiceTypes`);
}

export async function getServiceRequestById(id){
    return await axios.get(`${apiUrl}/api/ServiceRequests/${id}/Include`);
}

export async function putServiceRequest(id, data){
    console.log(data)
    return await axios.put(`${apiUrl}/api/ServiceRequests/${id}`, data); 
}

export async function deleteServiceRequest(id){
    //console.log('delp', id);
    return await axios.delete(`${apiUrl}/api/ServiceRequests/${id}`);  
}