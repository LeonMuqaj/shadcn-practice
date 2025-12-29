'use client';

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  username:
  z.string()
  .min(2)
  .max(50),
  email: z.string().email({ message: "Invalid email address!"}),
  phone: z.string().min(10).max(15),
  location: z.string().min(2),
  role: z.enum(["admin", "user"]),
});


const EditUser = () => {

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "john.doe",
      email: "john.doe@gmail.com",
      phone: "+38349123456",
      location: "Gjakova",
      role: "admin"

    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Add your submission logic here, e.g., API call
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Edit User</SheetTitle>
        <SheetDescription>
          Make changes to the user here.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField 
          control={form.control} 
          name="username" 
          render={({field}) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="email" render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Only admin can see your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="phone" render={({field}) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Only admin can see your phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="location" render={({field}) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the public location.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="role" render={({field}) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                Only verified users can be admin.
              </FormDescription>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}/>
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default EditUser;
