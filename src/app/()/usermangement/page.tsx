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
    const remove = (id:string)=>{
        axios.delete(`${BaseUrl}/api/vl/user/${id}`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        .then(()=>setUser(user.filter((item)=>item._id !==id)))
    }
    const edit = (id: string, isAdmin: boolean, isTrader: boolean) => {
        let updatedData = {};
      
        if (!isAdmin && !isTrader) {
          // لو المستخدم عادي، خليه Admin
          updatedData = { isAdmin: true, isTrader: false };
        } else if (isAdmin && !isTrader) {
          // لو Admin فقط، خليه Trader
          updatedData = { isAdmin: false, isTrader: true };
        } else {
          // في الحالتين الباقيين (Trader أو الاتنين)، رجّعه User
          updatedData = { isAdmin: false, isTrader: false };
        }
      
        axios
          .put(`${BaseUrl}/api/vl/user/${id}`, updatedData, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            // عدل حالة الـ user في الواجهة بدون حذفهم
            setUser(
              user.map((item) =>
                item._id === id ? { ...item, ...updatedData } : item
              )
            );
          })
          .catch((err) => console.error("Edit error:", err));
      };
      
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
             <tr className='w-full h-12 max-sm:h-auto  max-sm:flex max-sm:flex-wrap justify-center bg-gray-200 border-1 border-white '>
                <td className='text-start px-5 border-1 max-sm:border-0 max-sm:text-center max-sm:w-full max-sm:h-12 border-gray-400'>{item.email}</td>
                <td className='text-start px-5 border-1 max-sm:border-0 max-sm:text-center max-sm:w-full max-sm:h-12 border-gray-400'>{item.name}</td>
                <td className='text-start px-5 border-1 max-sm:border-0 max-sm:text-center max-sm:w-full max-sm:h-12 border-gray-400'>{item.isAdmin&&'Admin'}{item.isTrader&&'Trader'}{!item.isAdmin&&!item.isTrader&&'User'} </td>
                <td className='text-start px-5 border-1 max-sm:border-0 max-sm:text-center max-sm:w-full max-sm:h-12 border-gray-400  '>
                    <div className='w-full flex justify-center items-center h-full gap-5'>
                    <span
                    onClick={()=>remove(item._id)}
                    className='w-8 h-8 rounded-full hover:bg-red-300 hover:scale-105 text-xl hover:shadow-md duration-200 flex justify-center items-center'><AiOutlineDelete/></span>
                    <span
                    onClick={(()=>edit(item._id ,item.isAdmin , item.isTrader))}
                    className='w-8 h-8 rounded-full hover:bg-green-300 text-xl hover:scale-105 hover:shadow-md duration-200 flex justify-center items-center'><FaUserEdit/></span>
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