import { BrandPagePropsI } from '@/interfaces/brand'
import React from 'react'
import Products from '../../products/page';

export default async function BrandId({ params }: BrandPagePropsI) {

    const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${params.brandId}`
  );
  const data = await response.json()
  
  
  return (
    <>
    <h1 className='text-center font-bold text-2xl mb-5'>{data?.data.name}</h1>
    <Products BrandId={params.brandId} /> 
    </>
  )
}
