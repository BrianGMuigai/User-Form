"use client";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";
import { LoginSchema } from "../../../schema";
import { PasswordInput } from "./password-input";
import { MdEmail } from "react-icons/md";
import { Input } from "../ui/input";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { Switch } from "@headlessui/react"; // Import Switch component from Headless UI

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const { email, password } = data;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseData = await response.json();
      const { jwt, userRoles, userId } = responseData;

      toast.success("Login successful!");

      // Implement remember me functionality
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
      }

    } catch (error) {
      console.error("API request error:", error);
      setError("Login failed. Please check your email and password and try again.");
    
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

  return (
    <CardWrapper
      label="Log in to your account"
      title="Log in 👋"
      backButtonHref="/auth/Signup"
      backButtonLabel="Don't have an account? Sign up 👉"
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
                      suffix={<MdEmail size={15} />}
                    />
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
                    <PasswordInput {...field} type="password" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                checked={rememberMe}
                onChange={setRememberMe}
                className={`${
                  rememberMe ? 'bg-green-600' : 'bg-gray-300'
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-black-500`}
              >
                <span className="sr-only">Remember me</span>
                <span
                  className={`${
                    rememberMe ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-3 h-3 transform bg-green-500 rounded-full transition-transform`}
                />
              </Switch>
              <label htmlFor="rememberMe" className="block text-base text-white-900">
                Remember me
              </label>
            </div>
        
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Log in 👋" }
          </Button>
        </form>
      </Form>
      <Button
        onClick={handleGoogleLogin}
        className="w-full mt-4 bg-black border text-white-800 hover:bg-blue flex items-center justify-center rounded-lg"
      >
        <FcGoogle className="mr-2" size={20} />
        Continue with Google
      </Button>
      <ToastContainer />
    </CardWrapper>
  );
};

export default LoginForm;
