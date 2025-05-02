import Cookies from "js-cookie";
import { BaseUrl } from "@/components/BaseUrl";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialData:any = [];
let brand:any =[];
const token = Cookies.get('userToken')
const fetch = async()=>{
    try{
      const res = await axios.get(`${BaseUrl}/api/vl/brand/user`,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        brand = res.data
        const response =await axios.get(`${BaseUrl}/api/vl/product/by_brand/?brand=${encodeURIComponent(brand.name)}`)
        initialData= response.data
    }catch(err){console.log(err)}
}

await fetch()
export const TriderProductSlice = createSlice({
    name:'TriderProductSlice',
    initialState:initialData,
    reducers:{}
})
export default TriderProductSlice.reducer