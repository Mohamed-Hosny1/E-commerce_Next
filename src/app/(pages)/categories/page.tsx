import { CategoryI } from "@/interfaces/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );
  const data = await response.json();
  const { data: categories } = data as { data: CategoryI[] };

  return (
    <>
      <div className="grid grid-cols-12 gap-7 p-2 md:p-5">
        {categories.map((category)=>{
          return <React.Fragment key={category._id}>
            <div className="p-2 shadow-md bg-amber-50 text-center col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 hover:scale-110 transition duration-400 ease-in-out">
            <Link href={`categories/${category._id}`}>
          <Image src={category.image} alt={category.name} className=" h-80 mx-auto" />
          <p className="mt-3 font-semibold text-lg dark:text-black">{category.name} </p>
            </Link>
        </div>
          
          </React.Fragment>
        })}
        
      </div>
    </>
  );
}
