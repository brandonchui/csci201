///////////////////////////////////////////////
///~ (bc) profile page

import { useState } from "react";
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

///////////////////////////////////////////////
///~ (bc) sample data, will erase later
const userData = {
  name: "Lorem Ipsum",
  email: "lorem.ipsum@example.com",
  joinDate: "Dolorember 2024",
  stats: {
    height: "1'11\"",
    weight: "XXX lbs",
    age: 111,
    gender: "N/A",
    goal: "Placeholder Goal",
    bmi: 111.1,
    workoutsCompleted: 11,
    streakDays: 11,
    averageWorkoutTime: "11 mins"
  }
};

///////////////////////////////////////////////
///~ (bc) layout
export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("Profile");

  return (
    <DashboardLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="bg-red-900 rounded-full p-6">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {userData.email}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-red-900 border-red-900">
                    Active Member
                  </Badge>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    {userData.stats.streakDays} Day Streak
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* stats grid */}
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
                <span className="font-medium">{userData.stats.age} years</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Height</span>
                </div>
                <span className="font-medium">{userData.stats.height}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Weight className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Weight</span>
                </div>
                <span className="font-medium">{userData.stats.weight}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Goal</span>
                </div>
                <span className="font-medium">{userData.stats.goal}</span>
              </div>

            </CardContent>

          </Card>

          {/* fitness stat card */}
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
                <span className="font-medium">{userData.stats.workoutsCompleted}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Average Workout Time</span>
                </div>
                <span className="font-medium">{userData.stats.averageWorkoutTime}</span>
              </div>

              {/* fun hover might remove tho */}
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
                        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <span className="font-medium">{userData.stats.bmi}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Current Streak</span>
                </div>
                <span className="font-medium">{userData.stats.streakDays} days</span>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* membership card - probably wont implement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Member since</p>
                <p className="font-medium">{userData.joinDate}</p>
              </div>
              <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}