"use server"
import { getUserToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { TokenI } from "@/interfaces/token";

export async function getUserOrders() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You are not authorized to do this action");
  }
  const userToken = jwtDecode<TokenI>(token);
  const userId = userToken.id;
  
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  return data;
}