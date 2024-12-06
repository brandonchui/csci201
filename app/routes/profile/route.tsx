import { useState, useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import DashboardLayout from "~/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Ruler,
  Weight,
  Target,
  Trophy,
  Activity,
  Heart,
  Flame
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// user types
interface UserData {
  id: number;
  email: string;
  hashedPassword: string;
  weightPounds: number;
  heightInches: number;
  age: number;
  gender: string;
  goal: string;
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  repetitions: number;
  durationMins: number;
  isCompleted: boolean;
  userId: number;
  date: string;
  isAiSuggestion: boolean;
}

interface LoaderData {
  userId: number | null;
  userData: UserData | null;
  exercises: Exercise[];
}

// guest data
const GUEST_DATA = {
  id: 0,
  email: "guest@example.com",
  hashedPassword: "",
  weightPounds: 0,
  heightInches: 0,
  age: 0,
  gender: "U",
  goal: "Not specified"
};

// loader
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const userId = await requireUserId(request).catch(() => null);

    if (!userId) {
      return json<LoaderData>({
        userId: null,
        userData: null,
        exercises: []
      });
    }

    const userResponse = await fetch(`https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await userResponse.json();

    // fetch exercises for statistics
    const today = new Date().toISOString().split('T')[0];
    const exercisesResponse = await fetch(
      `https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/exercises/user/${userId}/date/${today}`
    );
    const exercises = exercisesResponse.ok ? await exercisesResponse.json() : [];

    return json<LoaderData>({ userId, userData, exercises });
  } catch (error) {
    console.error('Error in profile loader:', error);
    return json<LoaderData>({
      userId: null,
      userData: null,
      exercises: []
    });
  }
};

// component
export default function Profile() {
  const { userId, userData, exercises } = useLoaderData<LoaderData>();
  const [selectedTab, setSelectedTab] = useState("Profile");

  // use guest data if no user data is available
  const displayData = userData || GUEST_DATA;

  // calculate stats
  const workoutsCompleted = exercises.filter(ex => ex.isCompleted).length;
  const averageWorkoutTime = exercises.length > 0
    ? Math.round(exercises.reduce((acc, ex) => acc + ex.durationMins, 0) / exercises.length)
    : 0;

  // calculate BMI? TODO remove
  const bmi = displayData.heightInches > 0
    ? ((displayData.weightPounds / (displayData.heightInches * displayData.heightInches)) * 703).toFixed(1)
    : "N/A";

  // format height for display
  const formatHeight = (inches: number) => {
    if (inches === 0) return "Not specified";
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  };

  return (
    <DashboardLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* profile header */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="bg-red-900 rounded-full p-6">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {displayData.email.split('@')[0]}
                </CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {displayData.email}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={userId ? "text-green-600 border-green-600" : "text-gray-600 border-gray-600"}>
                    {userId ? "Member" : "Guest"}
                  </Badge>
                  {workoutsCompleted > 0 && (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      {workoutsCompleted} Workouts Completed
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* personal info card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Age</span>
                </div>
                <span className="font-medium">
                  {displayData.age > 0 ? `${displayData.age} years` : "Not specified"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Height</span>
                </div>
                <span className="font-medium">{formatHeight(displayData.heightInches)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Weight className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Weight</span>
                </div>
                <span className="font-medium">
                  {displayData.weightPounds > 0 ? `${displayData.weightPounds} lbs` : "Not specified"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Goal</span>
                </div>
                <span className="font-medium">{displayData.goal}</span>
              </div>
            </CardContent>
          </Card>

          {/* fitness stats card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Fitness Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Workouts Completed</span>
                </div>
                <span className="font-medium">{workoutsCompleted}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Average Workout Time</span>
                </div>
                <span className="font-medium">
                  {averageWorkoutTime > 0 ? `${averageWorkoutTime} mins` : "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <HoverCard>
                  <HoverCardTrigger className="flex items-center space-x-2 cursor-help">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">BMI</span>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Body Mass Index</p>
                      <p className="text-sm text-gray-500">
                        BMI is a measure of body fat based on height and weight.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <span className="font-medium">{bmi}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* membership card */}
        {userId && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Membership</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium">Active Member</p>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}