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

///////////////////////////////////////////////
///~ layout
export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const handlePreviousDate = () => setDate(prev => addDays(prev, -1));
  const handleNextDate = () => setDate(prev => addDays(prev, 1));
  const handleToday = () => setDate(new Date());

  // Sample workout data
  const workouts = [
    { name: 'Lunges', sets: '3 sets of 12 reps', intensity: 'Medium' },
    { name: 'Push-Ups', sets: '4 sets of 15 reps', intensity: 'High' },
    { name: 'Squats', sets: '3 sets of 10 reps', intensity: 'High' },
    { name: 'Plank', sets: '3 sets of 1 minute', intensity: 'Medium' },
  ];

  return (
    <DashboardLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <div className="space-y-6">

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
              <div className="text-2xl font-bold">12 Days</div>
              <p className="text-xs text-muted-foreground">
                +2 days from last week
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
              <div className="text-2xl font-bold">4/5</div>
              <Progress value={80} className="mt-2" />
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
        <div className="grid gap-6 md:grid-cols-2">

          {/* list card */}
          <Card >

            {/* card header */}
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

            {/* card content info */}
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
                    <Badge variant="outline" className={
                      workout.intensity === 'High' ? 'border-red-500 text-red-500' :
                        'border-yellow-500 text-yellow-600'
                    }>
                      {workout.intensity}
                    </Badge>
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