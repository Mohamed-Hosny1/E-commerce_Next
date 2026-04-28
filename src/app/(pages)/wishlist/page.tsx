"use client"
import { getLoggedUserWishList } from '@/actions/wishList.action'
import AddToCart from '@/components/products/addToCartBtn'
import AddToWishList from '@/components/products/addToWishList'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { WishListDataI } from '@/interfaces/wishlist'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function WishList() {
  const [products, setProducts] = useState<WishListDataI[]>([])
  async function getUserWishList() {
   try {
     const data= await getLoggedUserWishList() 
    setProducts(data.data)
    
   } catch (error) {
    console.log(error);
    
    toast.error("Error Occured", { position: "top-center" });
   }
  }

  useEffect(() => {
  getUserWishList()
  
  }, [])
  
  return (
    <React.Fragment>
      <main>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-12 gap-7 ">
            {products.map((product) => {
              return (
                <React.Fragment key={product._id}>
                  <div className="col-span-12 md:col-span-6  lg:col-span-4 xl:col-span-3 hover:scale-105 transition duration-400 ease-in-out">
                    <Card className="p-2">
                      <Link href={`products/${product._id}`}>
                        <Image
                          width={1000}
                          height={1000}
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full object-cover h-90"
                        />
                        <CardHeader>
                          <h4 className=" text-gray-400 ">
                            {product.brand.name}
                          </h4>
                          <CardTitle className="text-xl font-bold">
                            {product.title.split(" ").slice(0, 2).join(" ")}
                          </CardTitle>
                          <CardDescription>
                            {product.category.name}
                          </CardDescription>
                          <p className="flex gap-1 pt-2">
                            {[...Array(5)].map((star, index) => {
                              const filledStar =
                                index < Math.floor(product.ratingsAverage);
                              return (
                                <React.Fragment key={index}>
                                  <Star
                                    className={`${
                                      filledStar
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-400 fill-gray-400"
                                    }`}
                                  />
                                </React.Fragment>
                              );
                            })}

                            <span className="ms-5">
                              ( {product.ratingsAverage} )
                            </span>
                          </p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-black font-bold text-lg">
                            EGP {product.price}
                          </p>
                        </CardContent>
                      </Link>
                      <CardFooter className="gap-3">
                        <AddToCart prodId={product._id} />
                        <AddToWishList prodId={product._id} initialWishlisted={true}/>
                      </CardFooter>
                    </Card>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}
