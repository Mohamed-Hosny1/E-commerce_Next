"use client";

import { clearCartItems, getLoggedUserCart } from "@/actions/cart.action";
import CartItem from "@/components/cart/cart-item";
import { Checkout } from "@/components/cart/checkout";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CartI, CartProductI } from "@/interfaces/cart";
import { cartContext } from "@/provider/cart-provider";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const [products, setproducts] = useState<CartProductI[] | []>([]);
  const [cart, setCart] = useState<CartI | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const [isLoading, setisLoading] = useState(false);
  const { noOfCartItems, handleCart, totalPrice } = useContext(cartContext);

  async function getUserCart() {
    try {
      const data: CartI = await getLoggedUserCart();
      setproducts(data.data.products);
      setCart(data);
      handleCart();
    } finally {
      setIsFetching(false);
    }
  }
  async function clearCartProducts() {
    try {
      setisLoading(true);
      const data = await clearCartItems();
      setproducts([]);
      if (data.message == "success") {
        toast.success("There is no more products in cart", {
          position: "top-center",
        });
      }
      handleCart();
    } catch (error) {
      toast.error((error as Error).message, { position: "top-center" });
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);
 if (isFetching) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (products.length == 0) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          Cart is Empty
          <Link href={"/products"} className="ms-1.5">
            Go shoppig Now ! 🛒
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-muted-foreground mt-1">
          {noOfCartItems} items in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">
          {/* items details */}
          <div className="lg:col-span-2 space-y-4 ">
            {products.map((prod) => (
              <React.Fragment key={prod.product._id}>
                <CartItem product={prod} setproducts={setproducts} />
              </React.Fragment>
            ))}
          </div>

          {/* order summary */}
          <div className="lg:col-span-1 sticky top-30 ">
            <div className="rounded-xl border p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {noOfCartItems} items
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Total cart Price : </span>
                    <span className="font-semibold ps-1">{totalPrice} EGP</span>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm ">Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
              </div>

              <div className="my-4 border-t" />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Total</span>
                <span className="text-base font-bold">{totalPrice} EGP</span>
              </div>

              <Link href="/products">
                <Button className="w-full text-lg mt-2 " variant={"outline"}>
                  Continue Shopping
                </Button>
              </Link>

              {cart && <Checkout cartId={cart?.cartId} />}
            </div>

            <Button
              variant={"outline"}
              className="mt-2 ms-auto text-destructive hover:text-destructive"
              onClick={clearCartProducts}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <Trash2 />
                  Clear Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
