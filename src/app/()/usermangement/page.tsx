'use client'
import { BaseUrl } from '@/components/BaseUrl'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { FaUserEdit } from "react-icons/fa";

import { AiOutlineDelete } from "react-icons/ai";

interface user {
    _id:string
    name:string
    isAdmin:boolean
    isTrader:boolean
    address:string
    email:string
}
const page = () => {
    const [user, setUser] = useState<user[]>([])
    const token = Cookies.get('userToken')
    useEffect(()=>{
        axios.get(`${BaseUrl}/api/vl/user`,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        .then((data)=>{
            console.log(data.data)
            setUser(data.data)
        })
    },[])
  return (
    <div className='w-full min-h-screen flex justify-center items-start'>
        <table className='w-full'>
            <thead className=' max-sm:hidden '>
                <tr className='w-full h-12 bg-gray-400 border-1 border-gray-200'>
                    <th className='text-start px-5 border-1 border-gray-200'>Email :</th>
                    <th className='text-start px-5 border-1 border-gray-200'>User Name :</th>
                    <th className='text-start px-5 border-1 border-gray-200'>User Type</th>
                    <th className='text-start px-5 border-1 border-gray-200'>Action</th>
                </tr>
                
            </thead>
           {user.map((item)=>(
             <tbody key={item._id}>
             <tr className='w-full h-12 bg-gray-200 border-1 border-white '>
                <td className='text-start px-5 border-1 border-gray-400'>{item.email}</td>
                <td className='text-start px-5 border-1 border-gray-400'>{item.name}</td>
                <td className='text-start px-5 border-1 border-gray-400'>{item.isAdmin&&'Admin'}{item.isTrader&&'Trader'}{!item.isAdmin&&!item.isTrader&&'User'} </td>
                <td className='text-start px-5 border-1 border-gray-400  '>
                    <div className='w-full flex justify-center items-center h-full gap-5'>
                    <span className='w-8 h-8 rounded-full hover:bg-red-300 hover:scale-105 text-xl hover:shadow-md duration-200 flex justify-center items-center'><AiOutlineDelete/></span>
                    <span className='w-8 h-8 rounded-full hover:bg-green-300 text-xl hover:scale-105 hover:shadow-md duration-200 flex justify-center items-center'><FaUserEdit/></span>
                    </div>
                </td>
             </tr>
         </tbody>
           ))}
        </table>
    </div>
  )
}

export default page