import Cookies from "js-cookie";
import { BaseUrl } from "@/components/BaseUrl";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialData: any = [];
let brand: any = [];
const token = Cookies.get('userToken');

// جلب البيانات الابتدائية
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
    console.error("Error fetching initial data:", err);
  }
};

await fetchInitialData();

// تعريف الـ slice
export const TriderProductSlice = createSlice({
  name: 'TriderProductSlice',
  initialState: {
    products: initialData,
    loading: false
  },
  reducers: {
    // حذف منتج من الحالة + من الباكيند
    removeProductFromState: (state, action) => {
      const id = action.payload;

      // حذف من الباكيند
      axios.delete(`${BaseUrl}/api/vl/product/${id}`, {
        headers: { authorization: `Bearer ${token}` }
      });

      // تحديث الحالة
      state.products = state.products.filter(
        (product: { _id: any }) => product._id !== id
      );
    },

    // حذف صورة + لون من منتج معين
    removeImage: (state, action) => {
      const { productId, imageId, index } = action.payload;

      // حذف من الباكيند
      axios.delete(`${BaseUrl}/api/vl/product`, {
        data: {
          productId,
          imageId
        },
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      // تحديث المنتج داخل الحالة
      state.products = state.products.map((product: any) => {
        if (product._id === productId) {
          const updatedImages = product.image.filter((img: any) => img.id !== imageId);

          let updatedColors = [...product.color];

          // تعديل الألوان بطريقة آمنة
          if (updatedColors[0]) {
            const parsedColors = updatedColors[0].split(','); // <-- التعديل المهم هنا
            parsedColors.splice(index, 1);
            updatedColors[0] = parsedColors.join(',');
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
