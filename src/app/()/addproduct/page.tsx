'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import Cookies from 'js-cookie'
import axios from 'axios'
import { BaseUrl } from '@/components/BaseUrl'
import { useSelector } from 'react-redux'

type FormData = {
  title: string
  description: string
  price: number
  category: string
  brand: string
  quantity: number
  color?: string // علامة ? تجعل الحقل اختياري
  size?: string  // علامة ? تجعل الحقل اختياري
  discount: number
  image: FileList
}

const AddProductPage = () => {
  const categories = useSelector((state: any) => state.Category)
  const token = Cookies.get('userToken')
  const [loading, setLoading] = useState(false)
  const [brand, setBrand] = useState<string>('')

  useEffect(() => {
    axios.get(`${BaseUrl}/api/vl/brand/user`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setBrand(response.data.name)
      console.log(response.data)
    })
    .catch((error) => {
      console.error('Error fetching brand:', error)
    })
  }, [token])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true)
      
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('price', data.price.toString())
      formData.append('category', data.category)
      formData.append('brand', data.brand)
      formData.append('quantity', data.quantity.toString())
      formData.append('discount', data.discount.toString())

      // إضافة اللون إذا كان موجوداً
      if (data.color) {
        formData.append('color', data.color)
      }

      // إضافة الحجم إذا كان موجوداً
      if (data.size) {
        formData.append('size', data.size)
      }

      // إضافة جميع ملفات الصور
      if (data.image && data.image.length > 0) {
        for (let i = 0; i < data.image.length; i++) {
          formData.append('image', data.image[i])
        }
      }

      const response = await axios.post(`${BaseUrl}/api/vl/product`, formData, {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('Product added successfully', response.data)
    } catch (err) {
      console.error('Error adding product:', err)
    } finally {
      setLoading(false)
    }
  })

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-[500px] max-sm:w-[350px] h-auto px-5 py-10 border-1 border-gray-200 shadow-md rounded-2xl mx-auto my-10'>
        <h1 className='text-center text-3xl font-bold mb-5'>Add Product</h1>
        
        <label className='block mb-2'>Title: <span className='text-red-500'>*</span></label>
        <input 
          className='w-full mb-4 p-2 border rounded' 
          placeholder='Enter product title...' 
          {...register("title", { required: "Title is required" })} 
        />
        {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>}
        
        <label className='block mb-2'>Description: <span className='text-red-500'>*</span></label>
        <textarea 
          className='w-full mb-4 p-2 border rounded' 
          placeholder='Enter product description...' 
          {...register("description", { required: "Description is required" })} 
        />
        {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description.message}</p>}
        
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            <label className='block mb-2'>Price: <span className='text-red-500'>*</span></label>
            <input 
              type='number' 
              className='w-full p-2 border rounded' 
              placeholder='Enter price...' 
              {...register("price", { 
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" }
              })} 
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          
          <div>
            <label className='block mb-2'>Quantity: <span className='text-red-500'>*</span></label>
            <input 
              type='number' 
              className='w-full p-2 border rounded' 
              placeholder='Enter quantity...' 
              {...register("quantity", { 
                required: "Quantity is required",
                min: { value: 0, message: "Quantity must be positive" }
              })} 
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
          </div>
        </div>
        
        <label className='block mb-2'>Category: <span className='text-red-500'>*</span></label>
        <select 
          className='w-full mb-4 p-2 border rounded' 
          {...register("category", { required: "Category is required" })}
        >
          <option value="">Select a category</option>
          {categories.map((item: any) => (
            <option value={item.name} key={item._id}>{item.name}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mb-2">{errors.category.message}</p>}
        
        <label className='block mb-2'>Brand: <span className='text-red-500'>*</span></label>
        <select 
          className='w-full mb-4 p-2 border rounded' 
          {...register("brand", { required: "Brand is required" })}
        >
          <option value="">Select a brand</option>
          {brand && <option value={brand}>{brand}</option>}
        </select>
        {errors.brand && <p className="text-red-500 text-sm mb-2">{errors.brand.message}</p>}
        
        <label className='block mb-2'>Color (comma separated):</label>
        <input 
          className='w-full mb-4 p-2 border rounded' 
          placeholder='e.g. gold,white,green,red (optional)' 
          {...register("color")} 
        />
        
        <label className='block mb-2'>Size (comma separated):</label>
        <input 
          className='w-full mb-4 p-2 border rounded' 
          placeholder='e.g. S,M,L,XL (optional)' 
          {...register("size")} 
        />
        
        <label className='block mb-2'>Discount (%): <span className='text-red-500'>*</span></label>
        <input 
          type='number' 
          className='w-full mb-4 p-2 border rounded' 
          placeholder='Enter discount...' 
          min={0} 
          max={100} 
          {...register("discount", { 
            required: "Discount is required",
            min: { value: 0, message: "Discount must be between 0-100" },
            max: { value: 100, message: "Discount must be between 0-100" }
          })} 
        />
        {errors.discount && <p className="text-red-500 text-sm mb-2">{errors.discount.message}</p>}
        
        <label className='block mb-2'>Images: <span className='text-red-500'>*</span></label>
        <input 
          type='file' 
          className='w-full mb-6 p-2 border rounded' 
          multiple 
          {...register("image", { required: "Images are required" })} 
        />
        {errors.image && <p className="text-red-500 text-sm mb-2">{errors.image.message}</p>}
        
        <button
          type="submit"
          disabled={loading}
          className='w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200'
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}

export default AddProductPage