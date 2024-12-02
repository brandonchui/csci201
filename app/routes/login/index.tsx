import { Link, useNavigate } from '@remix-run/react';
import { createUserSession } from "~/utils/session.server";
import { ActionFunction, json } from '@remix-run/node';
import { useActionData } from "@remix-run/react";
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
const registrationSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Added schema for metadata input
const metadataSchema = z.object({
  weightPounds: z.number().min(1, "Weight is required"),
  heightInches: z.number().min(1, "Height is required"),
  age: z.number().min(1, "Age is required"),
  gender: z.enum(["M", "F", "U"]),
  goal: z.string().min(1, "Goal is required"),
});

///////////////////////////////////////////////
///~ login page component
export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const actionData = useActionData<ActionData>();

  {/* form init */ }
  const registerForm = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  {/* submit function - backend register */ }
  // TODO using default variables, prob have to fill these out
  const handleRegister = async (values: z.infer<typeof registrationSchema>) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const response = await fetch("/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      navigate('/dashbaord');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    }
  };

  // Handle metadata submission
  const handleMetadataSubmit = async (values: z.infer<typeof metadataSchema>) => {
    try {
      const formData = new FormData();
      formData.append("weightPounds", String(values.weightPounds));
      formData.append("heightInches", String(values.heightInches));
      formData.append("age", String(values.age));
      formData.append("gender", values.gender);
      formData.append("goal", values.goal);

      const response = await fetch("/updateMetadata", { method: "POST", body: formData });

      if (!response.ok) throw new Error("Failed to save metadata");

      navigate("/dashboard"); // Navigate to the dashboard
    } catch (err) {
      setError("Failed to save metadata. Please try again.");
    }
  };

  // guest login function
  const handleGuestLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("email", "guest@example.com");
      formData.append("password", "guest123");

      const response = await fetch("/login", { method: "POST", body: formData });
      if (!response.ok) throw new Error('Guest login failed');

      navigate("/dashboard"); // Directly navigate to the dashboard
    } catch (err) {
      setError('Guest login failed');
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
          alt="Logo"
          className="h-32 w-auto md:h-40 mx-auto mb-6"
        />

        {/* badge for create acc */}
        <Badge variant="outline" className="px-4 py-1 border-yellow-500 text-red-900 mb-4">
          <UserPlus className="h-4 w-4 mr-1 text-yellow-500" />
          <span>Create Account</span>
        </Badge>

        {/* h1 header */}
        <h1
          className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-900 via-red-800 to-yellow-600 bg-clip-text text-transparent">
          Join Our Fitness Community
        </h1>
      </div>

      {/* Error Toast (Displayed if error exists) */}
      {error && (
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form Container */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
              {/* Email Input */}
              <FormField control={registerForm.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                </FormItem>
              )} />

              {/* Password Input */}
              <FormField control={registerForm.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                </FormItem>
              )} />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-red-900 hover:bg-red-800">Log In</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Guest Login Button */}
      <Button
        variant="outline"
        className="mt-6"
        onClick={handleGuestLogin}
      >
        Continue as Guest
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}