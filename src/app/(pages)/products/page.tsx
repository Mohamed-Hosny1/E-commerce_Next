import { ProductI, ProductsPropsI } from "@/interfaces/product";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/products/addToCartBtn";
import AddToWishList from "@/components/products/addToWishList";

export default async function Products({ categoryId ,BrandId }: ProductsPropsI) {
  let url = "https://ecommerce.routemisr.com/api/v1/products"; // default

  if (categoryId) {
    url = `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`;
  } else if (BrandId) {
    url = `https://ecommerce.routemisr.com/api/v1/products?brand=${BrandId}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  
  const { data: products } = data as { data: ProductI[] };

  if (!products || products.length === 0 && categoryId) {
  return (
    <main className="flex flex-col items-center justify-center min-h-100">
      <div className="mb-5 text-center">
        <p>😕</p>
      <h2>There is no Products found in this category</h2>
      </div>
      <Link href={"/categories"}>
      <button className=" p-2  rounded-full bg-black text-white dark:bg-blue-600  ">choose another category</button>
      </Link>
    </main>
  );
}
  if (!products || products.length === 0 && BrandId) {
  return (
    <main className="flex flex-col items-center justify-center min-h-100">
      <div className="mb-5 text-center">
        <p>😕</p>
      <h2>There is no Products found in this brand</h2>
      </div>
      <Link href={"/brands"}>
      <button className=" p-2  rounded-full bg-black text-white dark:bg-blue-600  ">choose another brand</button>
      </Link>
    </main>
  );
}

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
                      <Link href={`/products/${product._id}`}>
                        <img
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
                          <p className=" font-bold text-lg">
                            EGP {product.price}
                          </p>
                        </CardContent>
                      </Link>
                      <CardFooter className="gap-3">
                        <AddToCart prodId={product._id} />
                        <AddToWishList prodId={product._id}/>
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
  );
}
