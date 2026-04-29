"use client";
import { getLoggedUserWishList } from "@/actions/wishList.action";
import { WishlistContextI, WishListI } from "@/interfaces/wishlist";
import React, { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const WishListContext = createContext<WishlistContextI>({
  noOfWishlistItems: 0,
  wishlistedIds: [],
  handleWishList: () => {},
  Loading: false,
});

export default function WishListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfWishlistItems, setNoOfWishlistItems] = useState(0);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);
  const [Loading, setLoading] = useState(false);
  const { status } = useSession();

  async function handleWishList() {
    try {
      setLoading(true);
      const data: WishListI = await getLoggedUserWishList();
      setNoOfWishlistItems(data.count);
      setWishlistedIds(data.data.map((item) => item._id));
    } catch (error) {
      toast.error((error as Error).message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      handleWishList();
    } else {
      setNoOfWishlistItems(0);
      setWishlistedIds([]);
    }
  }, [status]);

  return (
    <WishListContext.Provider
      value={{ noOfWishlistItems, wishlistedIds, handleWishList, Loading }}
    >
      {children}
    </WishListContext.Provider>
  );
}