'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { BaseUrl } from '@/components/BaseUrl'
import { FaDeleteLeft } from 'react-icons/fa6'

interface Category {
  _id: string
  name: string
  image: {
    url: string
  }
}

const Page = () => {
  const token = Cookies.get('userToken')
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    axios.get(`${BaseUrl}/api/vl/category/all`)
      .then((response) => {
        console.log(response.data)
        setCategories(response.data)
      })
      .catch((err) => {
        console.error('Error fetching categories:', err)
      })
  }, [])
const remove =(id:string)=>{
    axios.delete(`${BaseUrl}/api/vl/category/${id}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then((data)=>{
        setCategories(categories.filter((item)=>item._id !=id))
    })
}
  return (
    <>
      <h1 className="text-4xl font-bold font-sans text-center my-5">
        Categories Management
      </h1>

      <div className="w-full min-h-screen flex justify-center gap-5 flex-wrap px-4">
        {categories.map((item) => (
          <div key={item._id} className="w-[400px] bg-white shadow-md rounded-md overflow-hidden">
            <img
              src={item.image.url}
              alt={item.name}
              className="w-full h-[250px] object-cover"
            />
            <div className="w-full flex justify-between items-center px-5 py-3">
              <h2 className="text-2xl font-medium">{item.name}</h2>
              <button
              onClick={()=>remove(item._id)}
              className="text-red-500 cursor-pointer hover:text-red-700 transition">
                <FaDeleteLeft size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Page
