import { ProductI } from "@/interfaces/product";
import { Params } from "next/dist/server/request/params";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import React from "react";
import AddToCart from "@/components/products/addToCartBtn";
import AddToWishList from "@/components/products/addToWishList";


export default async function ProductDetails({params,}: {params: Promise<Params>;}) {
  const { productId } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  );
  const data = await response.json();
  const { data: product } = data as { data: ProductI };
  const url = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${product.category._id}`)
  const relatedUrl = await url.json()
  const relatedProducts:ProductI[] = relatedUrl.data 
  
  


  return (
    <>
      <div className="container mx-auto p-5">
        <Breadcrumb className="py-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Product details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="p-2 md:grid md:grid-cols-3 mt-10">
          <div className="md:col-span-1">
            <Carousel>
              <CarouselContent>
                {product.images.map((img, index) => {
                  return (
                    <React.Fragment key={index}>
                      <CarouselItem>
                        <Image
                          width={1000}
                          height={1000}
                          src={img}
                          alt={product.title}
                          className="w-full object-cover h-90"
                        />
                      </CarouselItem>
                    </React.Fragment>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="md:col-span-2 flex justify-center items-center flex-col gap-10">
            <div className="w-full">
              <CardHeader>
                <h4 className=" text-gray-400 ">{product.brand.name}</h4>
                <CardTitle className="text-xl font-bold">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
                <h4>{product.description}</h4>
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

                  <span className="ms-5">( {product.ratingsAverage} )</span>
                </p>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-lg">
                  EGP {product.price}
                </p>
              </CardContent>
            </div>
            <div className="w-full">
              <CardFooter className="gap-3  ">
                <AddToCart prodId={product._id} />
                <AddToWishList prodId={product._id}/>
              </CardFooter>
            </div>
          </div>
        </Card>

        <div className="mt-15 relative w-full">
          <h2 className="mb-6 font-bold text-3xl">Related Products </h2>
          <Carousel opts={{ align: "start",}}
      className="w-full"
    >
      <CarouselContent>
        {relatedProducts.map((relatedProd , index) => {
         return(
          <React.Fragment key={index}>
            <CarouselItem  className="basis-1/1 md:basis-1/2 lg:lg:basis-1/3 xl:basis-1/5 ">
            <div className="p-1">
              <Card className="p-2">
                      <Link href={`${relatedProd._id}`}>
                        <Image
                          width={1000}
                          height={1000}
                          src={relatedProd.imageCover}
                          alt={relatedProd.title}
                          className="w-full object-cover h-90"
                        />
                        <CardHeader>
                          <h4 className=" text-gray-400 ">
                            {relatedProd.brand.name}
                          </h4>
                          <CardTitle className="text-xl font-bold">
                            {relatedProd.title.split(" ").slice(0, 2).join(" ")}
                          </CardTitle>
                          <CardDescription>
                            {relatedProd.category.name}
                          </CardDescription>
                          <p className="flex gap-1 pt-2">
                            {[...Array(5)].map((star, index) => {
                              const filledStar =
                                index < Math.floor(relatedProd.ratingsAverage);
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

                            <span className="ms-1">
                               ({relatedProd.ratingsAverage}) 
                            </span>
                          </p>
                        </CardHeader>
                        <CardContent>
                          <p className=" font-bold text-lg">
                            EGP {relatedProd.price}
                          </p>
                        </CardContent>
                      </Link>
                      <CardFooter className="gap-3">
                        <AddToCart prodId={relatedProd._id} />
                        <AddToWishList prodId={relatedProd._id}/>
                      </CardFooter>
                    </Card>
            </div>
          </CarouselItem>

          </React.Fragment>
         ) 
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-8 rounded-r-md rounded-l-none shadow-md" />
      <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-8 rounded-l-md rounded-r-none shadow-md" />
    </Carousel>
        </div>
      </div>

    </>
  );
}
