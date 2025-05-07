
import Hero from '@/components/Home/Hero'
import React from 'react'
import { FaRegSmileWink } from 'react-icons/fa';
import { BsTruck } from 'react-icons/bs';
import { BsAward } from 'react-icons/bs';

const Page = () => {
const data = [
  {
    title:'Fast Delivery',
    pargraph:'variations of passages of Lorem Ipsum available',
    icone:<BsTruck/>
  },{
    title:'Free Shiping',
    pargraph:'variations of passages of Lorem Ipsum available',
    icone:<FaRegSmileWink />
  },
  {
    title:'Best Quality',
    pargraph:'variations of passages of Lorem Ipsum available',
    icone:<BsAward/>
  }
]
  return (
    <div className='w-full min-h-screen overflow-hidden'>
      <Hero/>
      <div className='w-full justify-center items-center h-[60vh] flex flex-wrap '>
        <h1 className='text-4xl font-bold max-md:my-10 '>Why Shop With Us</h1>
        <div className='w-full flex-wrap flex justify-center items-center gap-5'>
          {data.map((item, index)=>(
            <div key={index} className='w-[350px] h-[250px] text-white p-5 py-10 bg-[#002C3E] text-center'>
              <div className='text-5xl w-full flex justify-center '>{item.icone}</div>
              <h1 className='text-2xl mt-5 font-bold'>{item.title}</h1>
              <p className='text-center text-gray-100'>{item.pargraph}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
