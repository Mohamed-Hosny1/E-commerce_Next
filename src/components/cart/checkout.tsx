import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Spinner } from "../ui/spinner";
import { checkOutSchema, CheckOutSchemaType } from "@/schema/checkout.schema";
import { checkOutUser } from "@/actions/cart.action";

export function Checkout({cartId}:{cartId:string}) {
    const form = useForm({
    resolver: zodResolver(checkOutSchema),
    defaultValues: {
      shippingAddress:{
        details: "",
        phone: "",
        city: ""
        }
    },
  });
  async function handleCheckOut(values:CheckOutSchemaType) {
    const data = await checkOutUser(values,cartId)
    if(data.status=="success"){
window.location.href= data.session.url
    }
    
  }
  return (
    <Dialog>
      
        <DialogTrigger asChild>
         <Button className="w-full text-lg mt-4">Proceed to Checkout </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Complete the following information for chechout
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCheckOut)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="shippingAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>city</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress.details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>details</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
              <FormField
                control={form.control}
                name="shippingAddress.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              
            
          

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="cursor-pointer">
                {form.formState.isSubmitting ? <Spinner /> : "checkout"}
                </Button>
          </DialogFooter>
          </form>
          </Form>
        </DialogContent>
     
    </Dialog>
  )
}
