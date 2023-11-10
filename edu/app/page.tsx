import React from 'react'
import Image from 'next/image'
import { Product } from '@/types'
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"
import Searchbar from '@/components/Searchbar'

async function Home() {
  //await getAllProducts();
  const products:any[] = [] 
  return (
    <>
      <section className='px-6 md:px-20 py-24 border-2'>
        <div className='flex max-xl:flex-col gap-16'>
          <Searchbar />
        </div>
      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          <div className="flex flex-wrap gap-x-8 gap-y-16">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home