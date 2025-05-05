"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductFromState,
  removeImage,
} from "../../../lib/manageProduct/TriderProductSlice";
import { MdDeleteOutline } from "react-icons/md";
import cookie from "js-cookie";
const Page = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [imageIndex, setImageIndex] = useState<{ [productId: string]: number }>(
    {}
  );
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const fetchTrider = useSelector((state: any) => state.TriderProduct);
  const token = cookie.get("userToken");
  useEffect(() => {
    setProduct(fetchTrider.products);
  }, [fetchTrider.products]);

  const handleColorClick = (productId: string, index: number) => {
    setImageIndex((prev) => ({ ...prev, [productId]: index }));
  };

  const remove = async (id: string) => {
    try {
      dispatch(removeProductFromState(id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleRemoveImage = async (
    imageId: string,
    productId: string,
    index: number
  ) => {
    try {
      dispatch(removeImage({ imageId, productId, index }));
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  const handleEditClick = (product: any) => {
    const parsedColors = product.color?.[0]?.split(",") || [];
    setEditingProduct({ ...product, color: parsedColors });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    try {
      const updatedData = {
        ...editingProduct,
        color: [JSON.stringify(editingProduct.color)],
      };

      const res = await fetch(
        `http://localhost:4000/api/vl/product/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) throw new Error("Failed to update product");
      alert("Product updated successfully!");
      setEditingProduct(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold font-serif text-center my-5">
        Products Management
      </h1>
      <div className="w-full min-h-screen flex flex-wrap justify-center gap-5 my-5">
        {product.map((item: any) => {
          const colors = item.color?.[0]?.split(",") || [];

          const currentIndex = imageIndex[item._id] || 0;

          return (
            <div
              className="w-56 h-[450px] relative rounded-3xl shadow-md border-1 border-gray-200 text-center py-2"
              key={item._id}
            >
              <img
                className="w-[95%] mx-auto rounded-3xl h-72 object-cover object-center"
                src={item.image[currentIndex]?.url}
                alt=""
              />
              <div
                onClick={() =>
                  handleRemoveImage(
                    item.image[currentIndex]?.id,
                    item._id,
                    currentIndex
                  )
                }
                className="text-red-500 text-2xl absolute top-5 right-7 cursor-pointer"
              >
                <MdDeleteOutline />
              </div>

              <p className="text-green-500">{item.price}$</p>
              <h1>{item.title}</h1>
              <div className="flex justify-center gap-2 mt-2">
              {colors.map((color: string, index: number) => {
  // تنظيف اللون من علامات الاقتباس والأقواس المربعة
  const cleanedColor = color.replace(/["\[\]]/g, ""); // إزالة " و [ و ]
  console.log(cleanedColor);
  
  return (
    <span
      key={index}
      onClick={() => handleColorClick(item._id, index)}
      className={`w-5 h-5 cursor-pointer rounded-full ${
        currentIndex === index
          ? "border-3 border-orange-400"
          : "border border-gray-200"
      }`}
      style={{ backgroundColor: cleanedColor }} // استخدام cleanedColor هنا
    />
  );
})}

              </div>
              <div className="w-full flex justify-between px-5 my-2">
                <button
                  onClick={() => remove(item._id)}
                  className="w-14 cursor-pointer h-6 rounded-md flex justify-center items-center hover:shadow-xl hover:scale-105 bg-red-600 text-white font-bold border border-gray-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(item)}
                  className="w-14 cursor-pointer hover:shadow-xl h-6 rounded-md flex justify-center hover:scale-105 items-center  bg-green-600 text-white font-bold border border-gray-200"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-3">Edit Product</h2>
            <input
              className="border p-2 mb-2 w-full"
              name="title"
              value={editingProduct.title}
              onChange={handleEditChange}
              placeholder="Title"
            />
            <textarea
              className="border p-2 mb-2 w-full"
              name="description"
              value={editingProduct.description}
              onChange={handleEditChange}
              placeholder="Description"
            />
            <input
              className="border p-2 mb-2 w-full"
              name="price"
              type="number"
              value={editingProduct.price}
              onChange={handleEditChange}
              placeholder="Price"
            />
            <input
              className="border p-2 mb-2 w-full"
              name="category"
              value={editingProduct.category}
              onChange={handleEditChange}
              placeholder="Category"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={submitEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
