import axios from "axios";
import { apiUrl } from "../models/app-constants";

export async function getBikeDtos(){
    return await axios.get(`${apiUrl}/api/Products/DTO/2`);
}
export async function getBikeDetails(id){
    return await axios.get(`${apiUrl}/api/Products/Details/Of/${id}`);
}
export async function postBike(data){
    return await axios.post(`${apiUrl}/api/Products`, data); 
}
export async function getCategories()
{
    return await axios.get(`${apiUrl}/api/ProductCategories/Of/2`);
}
export async function uploadProductImages(id, files){
    const formData = new FormData();
    for(var i=0; i<files.length;i++){
        formData.append("files", files[i])
       }
    
       console.log(id);
       console.log(formData);
    return await axios.post(`${apiUrl}/api/Images/Upload/${id}`, formData);  
}
export async function getPartById(id){
    return await axios.get(`${apiUrl}/api/Products/${id}/Include`);
}
export async function deletePicture(id){
    //console.log('delp', id);
    return await axios.delete(`${apiUrl}/api/Images/${id}`);  
}
export async function updateProduct(id, data){
    console.log(data)
    return await axios.put(`${apiUrl}/api/Products/${id}`, data); 
}
export async function getProductPicures(id){
    return await axios.get(`${apiUrl}/api/Products/Pictures/${id}`);
}
export async function deleteProduct(id){
    //console.log('delp', id);
    return await axios.delete(`${apiUrl}/api/Products/${id}`);  
}