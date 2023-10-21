"use client";
import React from 'react'
import Image from "next/image"
function Product() {
  return (
    <div className='product-container'>
        <div className='flex gap-28 xl:flex-row flex-col'>
            <div className="product-image">
                <Image src={""} alt="" width={500} height={400} className="mx-auto" />
            </div>
            <div className='flex-1 flex flex-col'>
                
            </div>
        </div>
    </div>
  )
}

export default Product