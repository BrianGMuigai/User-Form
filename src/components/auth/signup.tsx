"use client";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { RegisterSchema } from "../../../schema";
import { MdEmail } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { PasswordInput } from "./password-input";
import { FcGoogle } from "react-icons/fc";




const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {


  if (data.password !== data.confirmPassword) {


    return;
  }

  const { email, password, name } = data; 
    setLoading(true);

    try {



      const response = await fetch("http://localhost:8080/api/auth/signup",
       {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }), 
        
      });
   

      
   
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const FormData = await response.json();
      const userId = FormData.id; 


      let redirectUrl = "/auth/Login";
      if (userId) {
        redirectUrl += `?userId=${userId}`;
      }
      window.location.href = redirectUrl;

  

      const responseData = await response.json();
 
    } catch (error) {
      console.error("API request error:", error);
  
    } finally {
      setLoading(false);
    }
  };
   
  const handleGoogleLogin = async () => {
    try {
      const googleLoginUrl = "http://localhost:8080/api/auth/oauth2/login";
      const response = await fetch(googleLoginUrl);
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.url) {
          // Redirect to Google OAuth
          window.location.href = responseData.url;
        } else {
          throw new Error("Google login URL not found");
        }
      } else {
        throw new Error("Failed to fetch Google login URL");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google login failed. Please try again later.");
    }
  };

  
  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Create an account"
      title="Register 👨‍🦱"
      backButtonHref="/auth/Login"
      backButtonLabel="Already have an account? Login here 👉."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                      suffix={<MdEmail size={15}/>}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe"  suffix={<IoPersonCircle size = {17}/>} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading..." : "Register 👍"}
          </Button>
          <Button
        onClick={handleGoogleLogin}
        className="w-full mt-4 bg-black border text-white-800 hover:bg-blue flex items-center justify-center rounded-lg"
      >
        <FcGoogle className="mr-2 bg" size={20} />
             Continue with Google
      </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
