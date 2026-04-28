"use client";
import React, { useContext, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Heart,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { cartContext } from "@/provider/cart-provider";
import { Spinner } from "../ui/spinner";
import { WishListContext } from "@/provider/wishlist-provider";

export default function Navbar() {
  const { noOfCartItems, isLoading } = useContext(cartContext);
  const {Loading,noOfWishlistItems}=useContext(WishListContext)
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function logoutUser() {
    signOut({ callbackUrl: "/login" });
    setMobileMenuOpen(false);
  }

  return (
    <>
      <nav className="bg-[#F5F5F5E5] dark:bg-[#1a1a1a] p-5 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="nav-logo flex items-center gap-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Avatar className="rounded-lg bg-black dark:bg-white text-white dark:text-black text-xl">
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span className="font-bold text-xl dark:text-white">ShopMart</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex nav-link gap-3">
            <NavigationMenu>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-lg dark:text-gray-200"
                >
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-lg dark:text-gray-200"
                >
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-lg dark:text-gray-200"
                >
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex nav-actions items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center dark:text-gray-200">
                <p className="me-4 flex">
                  {session && (
                    <>
                      <span>Welcome</span>
                      <p className="ms-1 text-lg text-blue-500">
                        {session.user?.name}
                      </p>
                    </>
                  )}
                </p>
                <UserRound />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-gray-600" />
                {session ? (
                  <>
                    <Link href="/allorders">
                      <DropdownMenuItem className="dark:hover:bg-gray-700 cursor-pointer">
                        Your Orders
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={logoutUser}
                      className="cursor-pointer text-red-500 dark:hover:bg-gray-700"
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <DropdownMenuItem className="dark:hover:bg-gray-700 cursor-pointer">
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem className="dark:hover:bg-gray-700 cursor-pointer">
                        Register
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {session && (
              <Link href="/cart" className="relative dark:text-gray-200">
                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute bottom-full start-full -translate-x-1/2 translate-y-1/2">
                  {isLoading ? <Spinner /> : noOfCartItems}
                </Badge>
                <ShoppingCart />
              </Link>
            )}
             {session && (
              <Link href="/wishlist" className="relative">
                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute bottom-full start-full -translate-x-1/2 translate-y-1/2">
                  {Loading ? <Spinner /> : noOfWishlistItems}
                </Badge>
                <Heart />
              </Link>
            )}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-3">
            {session && (
              <Link href="/cart" className="relative dark:text-gray-200">
                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute bottom-full start-full -translate-x-1/2 translate-y-1/2">
                  {isLoading ? <Spinner /> : noOfCartItems}
                </Badge>
                <ShoppingCart />
              </Link>
            )}
            {session && (
              <Link href="/wishlist" className="relative">
                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute bottom-full start-full -translate-x-1/2 translate-y-1/2">
                  {Loading ? <Spinner /> : noOfWishlistItems}
                </Badge>
                <Heart />
              </Link>
            )}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-1 dark:text-gray-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col gap-3 container mx-auto">
            <Link
              href="/products"
              className="text-lg dark:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/brands"
              className="text-lg dark:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Brands
            </Link>
            <Link
              href="/categories"
              className="text-lg dark:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex flex-col gap-2">
              {session ? (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Welcome,{" "}
                    <span className="text-blue-500 font-medium">
                      {session.user?.name}
                    </span>
                  </p>
                  <Link
                    href="/allorders"
                    className="text-lg dark:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Your Orders
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="text-lg text-left text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-lg dark:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-lg dark:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
