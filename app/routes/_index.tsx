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
              Duis scelerisque maximus augue vitae dapibus.
            </h1>

            {/* h3 header - description */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia nunc id consequat porttitor. Nullam vulputate sem eu ante auctor sollicitudin. Nulla suscipit felis eget tellus tempus, sed pretium elit congue.
            </p>

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
                <Link to="/signup">Sign In</Link>
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
              Vestibulum semper rutrum magna
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Morbi eu scelerisque risus. Curabitur tortor est, vulputate ut rhoncus sed, rhoncus nec dolor. Ut vulputate ligula a urna varius,
            </p>
          </div>

          {/* 3 card layout to highlight features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* card 1 */}
            <Card className="border-2 hover:border-red-900/20 transition-all">
              <CardHeader>
                <ChartLine className="h-10 w-10 text-red-900 mb-2" />
                <CardTitle>Cras tristique</CardTitle>
                <CardDescription>
                  Duis tortor sapien, rutrum quis neque vitae, tincidunt suscipit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Nam elementum consectetur
                  </li>
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Pellentesque mollis urna
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* card 2 */}
            <Card className="border-2 hover:border-red-900/20 transition-all">
              <CardHeader>
                <Brain className="h-10 w-10 text-red-900 mb-2" />
                <CardTitle>Aliquam odio orci</CardTitle>
                <CardDescription>
                  Duis tortor sapien, rutrum quis neque vitae, tincidunt suscipit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Nam elementum consectetur
                  </li>
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Pellentesque mollis urna
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* card 3 */}
            <Card className="border-2 hover:border-red-900/20 transition-all">
              <CardHeader>
                <Target className="h-10 w-10 text-red-900 mb-2" />
                <CardTitle>Curabitur at ultrices orci</CardTitle>
                <CardDescription>
                  Maecenas accumsan, nunc varius finibus rhoncus, tortor mi gravida.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Nam elementum consectetur
                  </li>
                  <li className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-green-500" />
                    Pellentesque mollis urna
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
            <span className="text-red-900 font-medium">Quisque nec nisl</span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 max-w-xl mx-auto">
            Praesent at sapien iaculis, vehicula metus id?
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