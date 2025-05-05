'use client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Cookies from 'js-cookie'
import axios from 'axios'
import { BaseUrl } from '@/components/BaseUrl'
import { useSelector, UseSelector } from 'react-redux'
type FormData = {
  name: string
  parent:string
  image: FileList
}
const page = () => {
  const category = useSelector((state:any)=>state.Category)
console.log(category)
  const token = Cookies.get('userToken')
  const [loading, setLoading] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true)
      
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('parent', data.parent || '')
      formData.append('image', data.image[0]) // file input returns a FileList
  
      const response = await axios.post(`${BaseUrl}/api/vl/category`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
  
      console.log('Upload successful', response.data)
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setLoading(false)
    }
  })
  // firstName and lastName will have correct type

  return (
    <form onSubmit={onSubmit} className='w-[500px] max-sm:w-[350px] h-auto px-5 py-10 border-1 border-gray-200 shadow-md rounded-2xl mx-auto my-10 '>
      <h1 className='text-center text-3xl font-bold mb-5 '>Add Category</h1>
      <label> Name :</label>
      <input className='w-full my-2 h-10 rounded-md border-1 border-gray-200 px-5' placeholder='enter category name ...' {...register("name")} />
      <label> Parent :</label>
     <select className='w-full my-2 h-10 rounded-md border-1 border-gray-200 px-5 '  name="parent" id="">
      {category.map((item:any)=>(
        
        <option value={item.name}  key={item._id}>{item.name}</option>
      ))}
     </select>
      <label> Image :</label>
      <input className='w-full h-10 rounded-md border-1 my-2 border-gray-200 px-5 py-2' type='file' {...register("image")} />
      <div className='w-full flex justify-center items-center '>
      <button
        type="submit"
        className='w-48 h-10 border-1 border-gray-200 bg-blue-700 text-white  rounded-2xl  my-5 cursor-pointer hover:shadow-md hover:bg-blue-950 duration-200'
      >
        {loading?"Loading ...":"Add Category"}
      </button>
      </div>
    </form>
  )
}

export default page