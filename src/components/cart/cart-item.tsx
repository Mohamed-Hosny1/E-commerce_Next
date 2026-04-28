import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { CartProductI } from "@/interfaces/cart";
import {
  DeleteCartItem,
  updateCartPropductQuantity,
} from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { cartContext } from "@/provider/cart-provider";
import Image from "next/image";

export default function CartItem({
  product,
  setproducts,
}: {
  product: CartProductI;
  setproducts: (products: CartProductI[]) => void;
}) {
  const [isLoading, setisLoading] = useState(false);
  const { handleCart } = useContext(cartContext);

  async function deleteProduct(id: string) {
    try {
      setisLoading(true);
      const data = await DeleteCartItem(id);
      setproducts(data.data.products);
      toast.success("Product removed successfully", { position: "top-center" });
      handleCart();
    } catch (error) {
      console.log(error);
      toast.error("Error Occured", { position: "top-center" });
    } finally {
      setisLoading(false);
    }
  }
  async function updateProductCount(id: string, newCount: number) {
    try {
      setisLoading(true);
      const data = await updateCartPropductQuantity(id, newCount);
      setproducts(data.data.products);
      toast.success("Product count updated", { position: "top-center" });
      handleCart();
    } catch (error) {
      toast.error((error as Error).message, { position: "top-center" });
      toast.error("Error Occured", { position: "top-center" });
    } finally {
      setisLoading(false);
    }
  }
  return (
    <div className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
      <Image
        src={product.product.imageCover}
        alt={product.product.title}
        className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
      />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div >
            <h3 className="font-semibold text-base md:text-lg line-clamp-2">
              {product.product.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {product.product.brand.name} &nbsp;{" "}
              {product.product.category.name}
            </p>
          </div>

          <div className="text-right">
            <div className="font-semibold">
              {product.price * product.count} EGP
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
              onClick={() => {
                updateProductCount(product.product._id, product.count - 1);
              }}
            >
              -
            </Button>
            <span>{isLoading ? <Spinner /> : product.count} </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
              onClick={() => {
                updateProductCount(product.product._id, product.count + 1);
              }}
            >
              +
            </Button>
          </div>
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={() => {
              deleteProduct(product.product._id);
            }}
          >
            {isLoading ? <Spinner /> : "Remove"}
          </Button>
        </div>
      </div>
    </div>
  );
}
