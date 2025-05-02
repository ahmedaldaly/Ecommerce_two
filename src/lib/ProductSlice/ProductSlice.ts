import { BaseUrl } from "@/components/BaseUrl";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialData:any = []; // هنا نحفظ البيانات

const fetch = async () => {
  try {
    const res = await axios.get(`${BaseUrl}/api/vl/product`);
    initialData = res.data;
  } catch (err) {
    console.log(err);
  }
};

// استدعاء الفنكشن قبل تعريف الـ Slice
await fetch(); // ملاحظة: لازم تكون في ملف module top-level (مثلاً داخل ملف JS مخصص)

// Slice
export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: initialData,
  reducers: {
    
  },
});
export default ProductSlice.reducer