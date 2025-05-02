'use client'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const fetch = useSelector((state:any) => state.Product) // ← صح
  const fetchTrider = useSelector((state:any) => state.TriderProduct) // ← صح

  console.log(fetchTrider)

  return (
    <div>page</div>
  )
}

export default Page
