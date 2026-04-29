"use client";
import React, { useContext, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { addToWishList, DeleteWishListItem } from "@/actions/wishList.action";
import { WishListContext } from "@/provider/wishlist-provider";

export default function AddToWishList({ prodId }: { prodId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { wishlistedIds, handleWishList } = useContext(WishListContext);

  // يتحقق من الـ context مباشرةً — بيتحدث أوتوماتيك مع أي تغيير
  const isWishlisted = wishlistedIds.includes(prodId);

  async function deleteProduct(prodId: string) {
    try {
      setIsLoading(true);
      await DeleteWishListItem(prodId);
      toast.success("Product removed from wishlist", { position: "top-center" });
      handleWishList();
    } catch (error) {
      toast.error((error as Error).message, { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  }

  async function AddProductToWishList(prodId: string) {
    try {
      setIsLoading(true);
      const response = await addToWishList(prodId);
      if (response.status === "success") {
        toast.success(response.message, { position: "top-center" });
      }
      handleWishList();
    } catch (error) {
      toast.error((error as Error).message, { position: "top-center" });
      redirect("/login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={() =>
        isWishlisted ? deleteProduct(prodId) : AddProductToWishList(prodId)
      }
      className="transition-transform duration-150 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`w-6 h-6 transition-colors duration-300 ${
          isWishlisted
            ? "fill-red-500 stroke-red-500"
            : "fill-none stroke-gray-400 hover:stroke-red-400"
        } ${isLoading ? "animate-pulse" : ""}`}
      />
    </button>
  );
}