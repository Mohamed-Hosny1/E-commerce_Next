import { getUserOrders } from "@/actions/order.action";
import { OrderI } from "@/interfaces/oreders";
import Image from "next/image";
import React from "react";

export default async function AllOrders() {
  
  const data:OrderI[] = await getUserOrders();

  return (
    <>
      <main>
        <div className="container p-4 mx-auto">
           {data.map((order)=> {
              return <React.Fragment key={order.id}>
              <div className="p-2 bg-blue-100 m-2 dark:bg-blue-900 my-6 lg:w-1/2 mx-auto ">
            <div>
              <h2 className="text-xl mb-2 font-semibold"> Order #{order.id} </h2>
            <span>Order date : {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })} </span>
            <p>Payment : {order.paymentMethodType} 
               {order.isPaid ?<>
              <span className="text-green-600 ms-2 dark:text-green-400">( paid )</span> 
              </> : <>
              <span className="text-red-600 ms-2"> ( not paid )</span> </>}
              </p>
            <p>Delivered : {order.isDelivered ?<>
              <span className="text-green-600 ms-2">Yes</span> 
               </> : <>
              <span className="text-orange-400 ms-2">No</span> </>}
              </p>
              <p>Total Price : {order.totalOrderPrice} </p>
              <h2 className="text-xl font-semibold my-2">shipping address</h2>
              <p>Details : {order.shippingAddress.details} </p>
              <p>City : {order.shippingAddress.city} </p>
              <p>Phone number : {order.shippingAddress.phone} </p>
              <h2 className="text-xl my-2 font-semibold">Cart Items</h2>
              <div className="grid grid-cols-12 mt-3 ">
                {order.cartItems.map((item)=>{
                  return <React.Fragment key={item._id}>
                  <div className="w-35 col-span-12 my-2 md:my-0 mx-auto md:col-span-4 lg:col-span-3 border-4 shadow-sm p-1"  >
                  <Image src={item.product.imageCover} alt={item.product.title} className="w-full"/>
                  <h2 className="font-semibold text-green-600">{item.product.title} </h2>
                  <p> count : {item.count} </p>
                  <p > Price : {item.price} * {item.count} <span>= {item.price  * item.count} EGP </span> </p>
                </div>
                  </React.Fragment>
                })}
                

              </div>
            </div>
          </div>
              </React.Fragment>
            })}
          
        </div>
      </main>
    </>
  );
}
