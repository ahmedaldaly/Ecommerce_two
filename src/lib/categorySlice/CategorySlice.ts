import Cookies from "js-cookie";
import { BaseUrl } from "@/components/BaseUrl";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let data:any = []
const token = Cookies.get('userToken');
const fetch =async ()=>{
    try{
        const res = await axios.get(`${BaseUrl}/api/vl/category/all`)
        data = res.data
    }catch(err){console.log(err)}
}
await fetch()
export const CategorySlice = createSlice({
    name:'CategorySlice',
    initialState:data,
    reducers:{}
})
export default CategorySlice.reducer