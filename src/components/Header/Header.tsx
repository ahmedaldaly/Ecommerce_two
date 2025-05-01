'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci";
import { motion,AnimatePresence } from "motion/react"
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form"
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import cookie from 'js-cookie'
type FormData = {
  email: string
  password: string
}

const Header = () => {
  const [menu, setMenu] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [loading, setloading] = useState(false)
  const pathname = usePathname();
  const token = cookie.get('userToken')
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  // 
  const onSubmit = handleSubmit((data) => {
    try{
      setloading(true)
    axios.post(`${BaseUrl}/api/vl/auth/login`,{
      email:data.email,
      password:data.password
    }).then((data)=>{
      setloading(false)
      cookie.set('userToken',data.data.token)
      console.log(data.data)
    })
    }catch(err){
      setloading(false)
      console.log(err)
    }
  })
  // 


  const linkStyle = (path: string) =>   pathname === path ? 'text-orange-600 font-bold border-b-2 border-orange-500' : 'hover:text-orange-600';
  const linkStyleSmall = (path: string) =>   pathname === path ? 'text-orange-600 font-bold border-b-2 border-orange-500 w-full h-8' : 'w-full h-8 hover:text-orange-600';

  return (
    <>
    <AnimatePresence>

      <motion.div
      initial={{height:'80px'}}
      animate={{height:menu?'auto':'80px',paddingTop:menu?'20px':'0'}}
      exit={{height:'80px'}}
      transition={{duration:0.3}}
      className='w-full min-h-20 border-1 border-gray-200 bg-white flex items-center justify-evenly flex-wrap overflow-hidden'>
        <img className='h-10 w-40' src="https://themewagon.github.io/famms/images/logo.png" alt="LOGO" />
        
        <div className='flex max-sm:hidden justify-center gap-5 items-center font-bold'>
          <Link className={linkStyle('/')} href='/'>HOME</Link>
          <Link className={linkStyle('/about')} href='/about'>ABOUT</Link>
          <Link className={linkStyle('/product')} href='/product'>PRODUCTS</Link>
          <Link className={linkStyle('/blog')} href='/blog'>BLOG</Link>
        </div>

        <div className='flex justify-center items-center gap-5 text-xl'>
          <span className='hover:text-orange-600 cursor-pointer'><FaCartShopping /></span>
          <span className='hover:text-orange-600 cursor-pointer'><FaSearch /></span>
          <span onClick={()=>setUserMenu(!userMenu)} className='hover:text-orange-600 cursor-pointer'><FaCircleUser /></span>
          {menu?<motion.span 
          initial={{opacity:0,y:5}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.5}}
          onClick={() => setMenu(!menu)} className='hover:text-orange-600 cursor-pointer hidden max-sm:block'><AiOutlineClose /></motion.span>:<motion.span
          initial={{opacity:0,y:3}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.3}}
          onClick={() => setMenu(!menu)} className='hover:text-orange-600 cursor-pointer hidden max-sm:block'><CiMenuFries /></motion.span>}
        </div>
       
      {menu && <div
     
      className=' min-h-40 w-full my-5 bg-white flex justify-center items-center flex-wrap px-15 top-18 left-0  text-center'>
           <Link className={linkStyleSmall('/')} href='/'>HOME</Link>
          <Link className={linkStyleSmall('/about')} href='/about'>ABOUT</Link>
          <Link className={linkStyleSmall('/product')} href='/product'>PRODUCTS</Link>
          <Link className={linkStyleSmall('/blog')} href='/blog'>BLOG</Link>
        </div>}
      
      </motion.div>
     
      </AnimatePresence>
      <AnimatePresence>

      {userMenu&& <motion.div 
      initial={{x:100 ,opacity:0}}
      animate={{x:0 ,opacity:1}}
      exit={{x:100 ,opacity:0}}
      transition={{duration:0.3}}
      className='fixed h-full w-96 max-md:w-72 border-1 top-0 right-0 border-gray-200 bg-white'>
        {/*  */}
       {token?<div></div>
       :<> <div className='w-full p-7 flex justify-between'>
          <h1 className='text-2xl '>LOG IN</h1>
          <div className='text-2xl' onClick={()=>setUserMenu(!userMenu)} ><AiOutlineClose/></div>
        </div>
        <form onSubmit={onSubmit} className='flex justify-center flex-wrap px-5'>
      <input className='w-full h-12 border-gray-500 mt-7 px-5 border-1 ' {...register("email")} type='email' placeholder='enter your email...'/>
      <input className='w-full h-12 border-gray-500 mt-7 px-5 border-1 ' {...register("password")} type='password' placeholder='enter your password...' />
      <button
        type="submit"
        className='w-full  h-12 bg-orange-400 my-10 text-white'
      >
       {loading?'Loading...':'Log In'}
      </button>
      <p>Not a member? <Link className='text-orange-400' href='/register'>Register</Link></p>
    </form></>}
        </motion.div>}
      </AnimatePresence>
    </>
  )
}

export default Header
