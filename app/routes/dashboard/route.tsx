///////////////////////////////////////////////
///~ default dash board

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Target,
  Flame,
  Timer,
  TrendingUp,
  // Calendar as CalendarIcon,
  // Medal,
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import DashboardLayout from '~/components/DashboardLayout';
import { Progress } from "@/components/ui/progress";
import { Badge } from '~/components/ui/badge';

//BIG REFACTOR BELOW for user auth functions

/////////////////////////////////////////////////
//user auth
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

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

interface LoaderData {
  userId: number;
  userData: UserData;
  exercises: Exercise[];
}

// this error checks idk if we need this but safe, using as fallback
const DEFAULT_USER_DATA: UserData = {
  id: 0,
  email: "guest@example.com",
  hashedPassword: "",
  weightPounds: 0,
  heightInches: 0,
  age: 0,
  gender: "U",
  goal: "none"
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  console.log('Loading data for userId:', userId);

  try {
    //does userID exist?
    const verifyUserResponse = await fetch('https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/users');
    if (!verifyUserResponse.ok) {
      throw new Error('Failed to fetch users list');
    }
    const allUsers = await verifyUserResponse.json();
    const userExists = allUsers.some((user: UserData) => user.id === userId);

    if (!userExists) {
      console.log('User not found in database:', userId);
      return json<LoaderData>({
        userId,
        userData: DEFAULT_USER_DATA,
        exercises: []
      });
    }

    // get the user, and debug
    const userResponse = await fetch(`https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/users/${userId}`);
    if (!userResponse.ok) {
      console.error('Failed to fetch user data, status:', userResponse.status);
      throw new Error('Failed to fetch user data');
    }
    const userData = await userResponse.json();
    console.log('Fetched user data:', userData);

    // get the user's exercise info
    const today = format(new Date(), 'yyyy-MM-dd');
    const exercisesResponse = await fetch(
      `https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/exercises/user/${userId}/date/${today}`
    );

    let exercises: Exercise[] = [];
    if (exercisesResponse.ok) {
      exercises = await exercisesResponse.json();
      console.log('Fetched exercises:', exercises);
    } else {
      console.log('No exercises found or error fetching exercises');
    }

    return json<LoaderData>({
      userId,
      userData: userData || DEFAULT_USER_DATA,
      exercises
    });

  } catch (error) {
    console.error('Error in dashboard loader:', error);
    //fallback
    return json<LoaderData>({
      userId,
      userData: DEFAULT_USER_DATA,
      exercises: []
    });
  }
};

///////////////////////////////////////////////
///~ layout
export default function Dashboard() {
  const { userId, userData, exercises } = useLoaderData<LoaderData>();
  console.log('Loaded data:', { userId, userData, exercises }); // Debug log

  const [date, setDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const handlePreviousDate = () => setDate(prev => addDays(prev, -1));
  const handleNextDate = () => setDate(prev => addDays(prev, 1));
  const handleToday = () => setDate(new Date());

  const workouts = exercises.map(exercise => ({
    name: exercise.name,
    sets: `${exercise.sets} sets of ${exercise.repetitions} reps`,
    intensity: exercise.durationMins > 30 ? 'High' : 'Medium',
    isCompleted: exercise.isCompleted
  }));

  const calculateStreak = () => {
    //TODO broken
    return workouts.filter(w => w.isCompleted).length;
  };

  const calculateWeeklyProgress = () => {
    //TODO broken
    const completedWorkouts = workouts.filter(w => w.isCompleted).length;
    const totalWorkouts = workouts.length;
    return totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;
  };


  // Sample workout data
  // const workouts = [
  //   { name: 'Lunges', sets: '3 sets of 12 reps', intensity: 'Medium' },
  //   { name: 'Push-Ups', sets: '4 sets of 15 reps', intensity: 'High' },
  //   { name: 'Squats', sets: '3 sets of 10 reps', intensity: 'High' },
  //   { name: 'Plank', sets: '3 sets of 1 minute', intensity: 'Medium' },
  // ];

  return (
    <DashboardLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <div className="space-y-6">

        {/* welcome message */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hello, {userData.email.split('@')[0]}
          </h1>
          <div className="text-sm text-gray-500">
            {format(date, 'EEEE, MMMM d, yyyy')}
          </div>
        </div>

        {/* date Navigation */}
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousDate}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <h2 className="text-2xl font-semibold">
                {format(date, 'EEEE, MMMM d, yyyy')}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextDate}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* STATS cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* streak card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateStreak()} Days</div>
              <p className="text-xs text-muted-foreground">
                Keep up the good work!
              </p>
            </CardContent>
          </Card>

          {/* weekly goal card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
              <Target className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {workouts.filter(w => w.isCompleted).length}/{workouts.length}
              </div>
              <Progress value={calculateWeeklyProgress()} className="mt-2" />
            </CardContent>
          </Card>

          {/* workout time card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Workout Time</CardTitle>
              <Timer className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45 min</div>
              <p className="text-xs text-muted-foreground">
                Average duration
              </p>
            </CardContent>
          </Card>

          {/* progress card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">
                From last month
              </p>
            </CardContent>
          </Card>
        </div>


        {/* THE ACTUAL AI FUNCTION TO GENERATE THE WORKOUT PLAN */}
        {/* Workouts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <CardTitle>Today's Plan</CardTitle>
                <CardDescription>Your personalized workout routine</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Plan
              </Button>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {workouts.map((workout, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:border-yellow-500 transition-colors"
                  >
                    <div className="flex items-center">
                      <Dumbbell className="h-5 w-5 mr-4 text-yellow-500" />
                      <div>
                        <h3 className="text-lg font-semibold text-red-900">
                          {workout.name}
                        </h3>
                        <p className="text-sm text-gray-600">{workout.sets}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {workout.isCompleted && (
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Completed
                        </Badge>
                      )}
                      <Badge variant="outline" className={
                        workout.intensity === 'High' ? 'border-red-500 text-red-500' :
                          'border-yellow-500 text-yellow-600'
                      }>
                        {workout.intensity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* calendar*/}
          <div className="w-[350px]">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent className="pb-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-md border"
                />
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={handleToday}
                >
                  Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}