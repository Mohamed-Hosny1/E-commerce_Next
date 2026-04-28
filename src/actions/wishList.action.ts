
"use server"
import { getUserToken } from "@/lib/auth";

export async function addToWishList(prodId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You must be logged in to do this action");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId: prodId }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function DeleteWishListItem(productId:string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You are not authorized to do this action");
  }
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
export async function getLoggedUserWishList() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You are not authorized to do this action");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}