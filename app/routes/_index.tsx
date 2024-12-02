///////////////////////////////////////////////
///~ (bc) the homepage _index.tsx

import { Link } from '@remix-run/react';
import {
  ChartLine,
  Brain,
  Target,
  ArrowRight,
  Dumbbell,
  // Medal,
  Crown,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

      {/* hero Section */}
      <div className="relative px-6 lg:px-8 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">

            {/* logo */}
            <div className="mb-8">
              <img
                src="/logo.png"
                alt="FitLife Logo"
                className="h-32 w-auto md:h-40 lg:h-48 xl:h-56 mx-auto animate-fade-in"
              />
            </div>

            {/* a small badge for aesthetics */}
            <div className="flex items-center justify-center mb-6">
              <Badge variant="outline" className="px-4 py-1 border-yellow-500 text-red-900">
                <Crown className="h-4 w-4 mr-1 text-yellow-500" />
                <span>CSCI 201 Project</span>
              </Badge>
            </div>

            {/* h1 header - hero motto */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-red-900 via-red-800 to-yellow-600 bg-clip-text text-transparent mb-8">
              Welcome to your personal Workout Tracker!
            </h1>

            {/* h3 header - description */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Track your workouts effortlessly and achieve your fitness goals with ease using our personalized workout tracker. Discover new workout plans and stay on top of your progress with AI-powered recommendations and an intuitive user experience designed just for you.            </p>

            {/* button container */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              {/* left side button "Get Started" */}
              <Button
                size="lg"
                className="bg-red-900 hover:bg-red-800"
                asChild
              >
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              {/* right side button "Sign in" */}
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* secondary "features" section */}
      <div className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* secondary text */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Achieve Your Fitness Goals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
            Take control of your health and fitness journey with tools designed to track progress, optimize workouts, and keep you motivated every step of the way.            </p>
          </div>

          {/* 3 card layout to highlight features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* card 1 */}
            <Card className="border-2 hover:border-red-900/20 transition-all">
              <CardHeader>
                <ChartLine className="h-10 w-10 text-red-900 mb-2" />
                <CardTitle>Track Your Progress</CardTitle>
                <CardDescription>
                Monitor your fitness journey with real-time analytics and visualizations to keep you on track.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Real-time performance insights
                  </li>
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Personalized progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* card 2 */}
            <Card className="border-2 hover:border-red-900/20 transition-all">
              <CardHeader>
                <Brain className="h-10 w-10 text-red-900 mb-2" />
                <CardTitle>Get Smarter Recommendations</CardTitle>
                <CardDescription>
                Receive tailored workout suggestions backed by AI to meet your fitness goals efficiently.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Adaptive plans for your needs
                  </li>
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    AI-driven insights
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* card 3 */}
            <Card className="border-2 hover:border-red-900/20 transition-all">
              <CardHeader>
                <Target className="h-10 w-10 text-red-900 mb-2" />
                <CardTitle>Stay Focused</CardTitle>
                <CardDescription>
                Set clear goals and achieve them with tools designed to enhance your motivation and discipline.                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Goal-oriented tracking                  </li>
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Milestone achievements
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* call of action */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center p-1 mb-8 rounded-full bg-red-900/10">
            <Dumbbell className="h-5 w-5 text-red-900 mr-2" />
            <span className="text-red-900 font-medium">Ready to Take Charge of Your Fitness?
</span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 max-w-xl mx-auto">
          Discover the tools you need to transform your fitness routine and achieve your goals.

</h3>

          {/* last button - probably a bit much */}
          <Button
            size="lg"
            className="bg-red-900 hover:bg-red-800"
            asChild
          >
            <Link to="/signup">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}