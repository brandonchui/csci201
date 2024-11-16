import { Link, useNavigate } from '@remix-run/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  // LogIn,
  Mail,
  Lock,
  ArrowRight,
  ExternalLink,
  Crown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';

///////////////////////////////////////////////
///~ using zod's validation api
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

///////////////////////////////////////////////
///~ login page component
export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  {/* form init */}
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  {/* submit function - backend register */}
  // TODO using default variables, prob have to fill these out
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Replace with your actual login endpoint
      const response = await fetch('https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      //TODO not sure if this works
      if (!response.ok) {
        throw new Error('Invalid info');
      }

      //TODO might remove this if we're hosting or not?
      const userData = await response.json();
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('userEmail', userData.email);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      console.error('Login error:', err);
    }
  };

  ///////////////////////////////////////////////
  ///~ layout
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center px-6 pt-24 pb-12">

      {/* logo/title sec */}
      <div className="text-center mb-8">

        {/* logo */}
        <img
          src="/logo.png"
          alt="FitLife Logo"
          className="h-32 w-auto md:h-40 mx-auto mb-6"
        />

        {/* badge for create acc */}
        <Badge variant="outline" className="px-4 py-1 border-yellow-500 text-red-900 mb-4">
          <Crown className="h-4 w-4 mr-1 text-yellow-500" />
          <span>Welcome Back</span>
        </Badge>

        {/* h1 header */}
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-900 via-red-800 to-yellow-600 bg-clip-text text-transparent">
          Resume Your Fitness Journey
        </h1>
      </div>

      {/* toast alert if it messes up */}
      {error && (
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* signup form*/}
      <Card className="w-full max-w-md">

        {/* subheadings*/}
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Welcome back! Please enter your details
          </CardDescription>
        </CardHeader>

        {/* form props populated*/}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* EMAIL form field*/}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="you@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD form field*/}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* submit button */}
              <Button
                type="submit"
                className="w-full bg-red-900 hover:bg-red-800"
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          {/* GO TO: singup page if have NO account already*/}
          <div className="mt-6 space-y-4">
            <div className="text-center text-sm text-gray-600">
              Do not have an account?{" "}
              <Link
                to="/signup"
                className="text-red-900 hover:text-red-800 font-medium"
              >
                Sign Up
              </Link>
            </div>

            {/* GUEST FUNCTION */}
            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <Link to="/dashboard">
                Continue as Guest
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}