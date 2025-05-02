"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseDispatch } from "react-redux";
import { removeProductFromState } from "../../../lib/manageProduct/TriderProductSlice";
import { BaseUrl } from "@/components/BaseUrl";
import Cookies from "js-cookie";
import axios from "axios";
const Page = () => {
  const dispatch = useDispatch()
  const [product, setProduct] = useState([]);
  const [imageIndex, setImageIndex] = useState<{ [productId: string]: number }>(
    {}
  );
  const fetchTrider = useSelector((state: any) => state.TriderProduct);
  useEffect(() => {
    setProduct(fetchTrider.products);
  }, [fetchTrider.products]);

  const handleColorClick = (productId: string, index: number) => {
    setImageIndex((prev) => ({ ...prev, [productId]: index }));
  };
  console.log(product)
  const remove = async (id: string) => {
    try {
    
  
      dispatch(removeProductFromState(id));
     
      // تحديث الـ state
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };
  
  return (
    <>
      <h1 className="text-4xl font-bold font-serif text-center my-5">
        Products Management
      </h1>
      <div className="w-full min-h-screen flex flex-wrap justify-center gap-5 my-5">
        {product.map((item: any) => {
          const colors = item.color?.[0] ? JSON.parse(item.color[0]) : [];
          return (
            <div
              className="w-56 h-[450px] rounded-3xl shadow-md border-1 border-gray-200 text-center py-2"
              key={item._id}
            >
              <img
                className="w-[95%] mx-auto rounded-3xl h-72 object-cover object-center"
                src={item.image[imageIndex[item._id] || 0]?.url}
                alt=""
              />

              <p>{item.category}</p>
              <p>{item.price}</p>
              <h1>{item.title}</h1>
              <div className="flex justify-center gap-2 mt-2">
                {colors.map((color: string, index: number) => (
                  <span
                    key={index}
                    onClick={() => handleColorClick(item._id, index)}
                    className={`w-5 h-5 cursor-pointer rounded-full border border-black ${imageIndex[item._id]?'border-2 border-orange-400':'border-1 border-gray-200'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-between px-5 my-2">
              <button 
              onClick={()=>remove(item._id)}
              className="w-14 h-6 rounded-md flex justify-center cursor-pointer items-center border-gray-200 shadow-md bg-red-600 text-white font-bold border-1">Delete</button>
              <button className="w-14 h-6 rounded-md flex justify-center cursor-pointer items-center border-gray-200 shadow-md bg-green-600 text-white font-bold border-1">Edit</button>

              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Page;
