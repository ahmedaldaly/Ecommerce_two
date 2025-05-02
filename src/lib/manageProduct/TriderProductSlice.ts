import Cookies from "js-cookie";
import { BaseUrl } from "@/components/BaseUrl";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialData: any = [];
let brand: any = [];
const token = Cookies.get('userToken');

const fetchInitialData = async () => {
  try {
    const res = await axios.get(`${BaseUrl}/api/vl/brand/user`, {
      headers: { authorization: `Bearer ${token}` }
    });
    brand = res.data;
    const response = await axios.get(
      `${BaseUrl}/api/vl/product/by_brand/?brand=${encodeURIComponent(brand.name)}`
    );
    initialData = response.data;
  } catch (err) {
    console.log(err);
  }
};

await fetchInitialData();

export const TriderProductSlice = createSlice({
  name: 'TriderProductSlice',
  initialState: {
    products: initialData,
    loading: false
  },
  reducers: {
    removeProductFromState: (state, action) => {
      const id = action.payload;
      console.log(id)
      state.products = state.products.filter((product: { _id: any; }) => product._id !== id);
    }
  }
});

export const { removeProductFromState } = TriderProductSlice.actions;
export default TriderProductSlice.reducer;
