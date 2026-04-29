import { BrandI } from '@/interfaces/brand';
import Link from 'next/link';
import React from 'react'

export default async function Brands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
  );
  const data = await response.json();
  const { data: brands } = data as { data: BrandI[] };
  
  
  return (
    
     <>
      <div className="grid grid-cols-12 gap-7 p-2 md:p-5">
        {brands.map((brand)=>{
          return <React.Fragment key={brand._id}>
            <div className="p-2 shadow-md text-center bg-white col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 hover:scale-110 transition duration-400 ease-in-out dark:bg-amber-500">
            <Link href={`brands/${brand._id}`}>
          <img src={brand.image} alt={brand.name} className="  w-40 md:w-full mx-auto" />
          <p className="mt-3 font-semibold text-xl text-blue-700">{brand.name} </p>
            </Link>
        </div>
          
          </React.Fragment>
        })}
        
      </div>
    </>
  )
}
