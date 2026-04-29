"use server";
import { getUserToken } from "@/lib/auth";
import { CheckOutSchemaType } from "@/schema/checkout.schema";

export async function addToCart(prodId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You must be logged in to do this action");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
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

export async function getLoggedUserCart() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You are not authorized to do this action");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function DeleteCartItem(productId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You are not authorized to do this action");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function updateCartPropductQuantity(
  productId: string,
  newCount: number
) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You are not authorized to do this action");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({ count: newCount }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function clearCartItems() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You are not authorized to do this action");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function checkOutUser(
  formData: CheckOutSchemaType,
  cartId: string
) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You are not authorized to do this action");
  }

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}