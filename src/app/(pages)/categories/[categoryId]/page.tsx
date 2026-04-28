

import React from 'react'
import Products from '../../products/page';
import { CategoryPagePropsI } from '@/interfaces/categories';


export default async function CategoryId({ params }: CategoryPagePropsI) {
    const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${params.categoryId}`
  );
  const data = await response.json()
   
  return (
    <>
    <h1 className='text-center font-bold text-2xl mb-5'>{data?.data.name}</h1>
    <Products categoryId={params.categoryId} /> 
    </>

    
  )
}
