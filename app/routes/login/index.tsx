import { Link } from '@remix-run/react';
import { createUserSession } from "~/utils/session.server";
import { ActionFunction, json } from '@remix-run/node';
import { useActionData, Form as RemixForm } from "@remix-run/react";
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
  UserPlus,
  Mail,
  Lock,
  ArrowRight,
  ExternalLink,
  Crown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';

///////////////////////////////////////////
//~ auth
type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // if guest just use this hardcoded default
  if (email === "guest@example.com" && password === "guest123") {
    return createUserSession(24, "/dashboard"); // Using ID 24 for guest
  }

  if (!email || !password) {
    return json<ActionData>({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    const response = await fetch('https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();

    const user = users.find((u: any) =>
      u.email === email && u.hashedPassword === password
    );

    if (!user) {
      return json<ActionData>({
        error: "Invalid email or password"
      }, { status: 401 });
    }

    // success so create cookies and go to dashboard
    return createUserSession(user.id, "/dashboard");

  } catch (error) {
    console.error('Login error:', error);
    return json<ActionData>({
      error: "Server error. Please try again later."
    }, { status: 500 });
  }
};

///////////////////////////////////////////////
///~ using zod's validation api
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

///////////////////////////////////////////////
///~ login page component
export default function Login() {
  const [error, setError] = useState("");
  const actionData = useActionData<ActionData>();

  {/* form init */}
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // values for submission TODO
  const email = form.watch("email");
  const password = form.watch("password");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center px-6 pt-24 pb-12">
      {/* logo/title sec */}
      <div className="text-center mb-8">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-32 w-auto md:h-40 mx-auto mb-6"
        />
        <Badge variant="outline" className="px-4 py-1 border-yellow-500 text-red-900 mb-4">
          <UserPlus className="h-4 w-4 mr-1 text-yellow-500" />
          <span>Sign In</span>
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-900 via-red-800 to-yellow-600 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
      </div>

      {/* error */}
      {(error || actionData?.error) && (
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertDescription>{error || actionData?.error}</AlertDescription>
        </Alert>
      )}

      {/* form container */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Enter your details to log into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <RemixForm method="post" className="space-y-6">
              {/* email Input */}
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
                          name="email"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* password Input */}
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
                          name="password"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-red-900 hover:bg-red-800">
                Log In
              </Button>
            </RemixForm>
          </Form>
        </CardContent>
      </Card>

      {/* Guest Login Button */}
      <RemixForm method="post">
        <input type="hidden" name="email" value="guest@example.com" />
        <input type="hidden" name="password" value="guest123" />
        <Button
          type="submit"
          variant="outline"
          className="mt-6"
        >
          Continue as Guest
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </RemixForm>
    </div>
  );
}