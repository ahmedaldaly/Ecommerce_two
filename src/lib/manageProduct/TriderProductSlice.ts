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
      axios.delete(`${BaseUrl}/api/vl/product/${id}`, {
        headers: { authorization: `Bearer ${token}` }
      });
      state.products = state.products.filter((product: { _id: any }) => product._id !== id);
    },
    removeImage: (state, action) => {
      const { productId, imageId, index } = action.payload;

      axios.delete(`${BaseUrl}/api/vl/product`, {
        data: {
          productId,
          imageId
        },
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      state.products = state.products.map((product: { _id: any; image: any[]; color: any; }) => {
        if (product._id === productId) {
          const updatedImages = product.image.filter((img: any) => img.id !== imageId);

          let updatedColors = [...product.color];
          if (updatedColors[0]) {
            const parsedColors = JSON.parse(updatedColors[0]);
            parsedColors.splice(index, 1);
            updatedColors[0] = JSON.stringify(parsedColors);
          }

          return {
            ...product,
            image: updatedImages,
            color: updatedColors
          };
        }
        return product;
      });
    }
  }
});

export const { removeProductFromState, removeImage } = TriderProductSlice.actions;
export default TriderProductSlice.reducer;
