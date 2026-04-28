"use client";
import { addToCart } from "@/actions/cart.action";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { cartContext } from "@/provider/cart-provider";
import { redirect } from "next/navigation";

export default function AddToCart({ prodId }: { prodId: string }) {
  const [isLoading, setisLoading] = useState(false);
  const {handleCart}=useContext(cartContext)
  async function AddProductToCart(prodId: string) {
    try {

      setisLoading(true);
      const response = await addToCart(prodId);
      if (response.status== "success"){
        toast.success(response.message , {position:"top-center"})
        

      }
      handleCart()
    } 
    catch (error) {
      toast.error((error as Error).message, { position: "top-center" });
      redirect("/login")
    } 
    finally {
      setisLoading(false);
    }
  }

  return (
    <>
      <Button
        className="grow"
        disabled={isLoading}
        onClick={() => {
          AddProductToCart(prodId);
        }}
      >
        {isLoading? <Spinner/> : <>
        <ShoppingCart />
        Add to cart
        </>}
      </Button> 
    </>
  );
}
