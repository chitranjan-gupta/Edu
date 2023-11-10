"use client";
import React from "react";
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          <Link href={`/products/${product._id}`}>{product.title}</Link>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{product.category}</div>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary">{product?.currency}{product?.currentPrice}</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard