
import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./ProductSlice/ProductSlice";
import { TriderProductSlice } from "./manageProduct/TriderProductSlice";
import { CategorySlice } from "./categorySlice/CategorySlice";

export const store =configureStore({
    reducer:{
        Product:ProductSlice.reducer,
        TriderProduct:TriderProductSlice.reducer,
        Category:CategorySlice.reducer
    }
})