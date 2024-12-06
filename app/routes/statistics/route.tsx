///////////////////////////////////////////////
///~ statistics page using graphs with dynamic data

import { useState, useEffect } from 'react';
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import DashboardLayout from '~/components/DashboardLayout';
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

///////////////////////////////////////////////
///~ types
interface Exercise {
  id: number;
  userId: number;
  date: string;
  name: string;
  repetitions: number;
  sets: number;
  durationMins: number;
  isAiSuggestion: boolean;
  isCompleted: boolean;
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
  userId: number | null;
  userData: UserData | null;
  exercises: Exercise[];
}

///////////////////////////////////////////////
///~ guest data fallback
const GUEST_DATA = {
  id: 0,
  email: "guest@example.com",
  hashedPassword: "",
  weightPounds: 150,
  heightInches: 70,
  age: 30,
  gender: "U",
  goal: "Stay Fit"
};

///////////////////////////////////////////////
///~ loader function
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

    // fetch user data
    const userResponse = await fetch(`https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await userResponse.json();

    // fetch last 30 days of exercises for trends
    const endDate = new Date();
    const startDate = subDays(endDate, 30);
    const exercises: Exercise[] = [];

    // fetch exercises day by day
    for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
      const formattedDate = format(d, 'yyyy-MM-dd');
      const exerciseResponse = await fetch(
        `https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/exercises/user/${userId}/date/${formattedDate}`
      );
      if (exerciseResponse.ok) {
        const dailyExercises = await exerciseResponse.json();
        exercises.push(...dailyExercises);
      }
    }

    return json<LoaderData>({ userId, userData, exercises });
  } catch (error) {
    console.error('Error in statistics loader:', error);
    return json<LoaderData>({
      userId: null,
      userData: null,
      exercises: []
    });
  }
};

///////////////////////////////////////////////
///~ helper functions for data processing
const processExerciseData = (exercises: Exercise[], selectedDate: Date) => {
  // get week range
  const start = startOfWeek(selectedDate);
  const end = endOfWeek(selectedDate);

  // filter exercises for selected week
  const weekExercises = exercises.filter(ex => {
    const exDate = new Date(ex.date);
    return exDate >= start && exDate <= end;
  });

  // aggregate by exercise name and day
  const aggregated = weekExercises.reduce((acc, ex) => {
    const day = format(new Date(ex.date), 'EEE');
    if (!acc[day]) acc[day] = {};
    if (!acc[day][ex.name]) acc[day][ex.name] = 0;
    acc[day][ex.name] += ex.sets * ex.repetitions;
    return acc;
  }, {} as Record<string, Record<string, number>>);

  // transform for chart
  return Object.entries(aggregated).map(([date, exercises]) => ({
    date,
    ...exercises
  }));
};

const getExerciseStats = (exercises: Exercise[]) => {
  const completed = exercises.filter(ex => ex.isCompleted).length;
  const totalDuration = exercises.reduce((acc, ex) => acc + ex.durationMins, 0);
  const avgDuration = exercises.length ? Math.round(totalDuration / exercises.length) : 0;

  // get most common exercise
  const exerciseCounts = exercises.reduce((acc, ex) => {
    acc[ex.name] = (acc[ex.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommon = Object.entries(exerciseCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';

  return { completed, totalDuration, avgDuration, mostCommon };
};

///////////////////////////////////////////////
///~ layout
export default function Statistics() {
  const { userId, userData, exercises } = useLoaderData<LoaderData>();
  const [selectedTab, setSelectedTab] = useState('Statistics');
  const [date, setDate] = useState<Date>(new Date());

  // use guest data if no user data available
  const displayData = userData || GUEST_DATA;

  // process exercise data for visualizations
  const weeklyExerciseData = processExerciseData(exercises, date);
  const stats = getExerciseStats(exercises);

  // format dates and handlers
  const handlePreviousDate = () => setDate(prev => addDays(prev, -1));
  const handleNextDate = () => setDate(prev => addDays(prev, 1));
  const handleToday = () => setDate(new Date());

  // exercise distribution for pie chart
  const exerciseDistribution = exercises.reduce((acc, ex) => {
    acc[ex.name] = (acc[ex.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(exerciseDistribution).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#990000', '#FFCC00', '#666666', '#CC6600', '#006699'];

  return (
    <DashboardLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <div className="flex gap-6">
        <div className="flex-1">
          {/* date navigation */}
          <div className="mb-6">
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
                    {format(date, "EEEE, MMMM d, yyyy")}
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
          </div>

          {/* stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* completed workouts card */}
            <Card>
              <CardHeader>
                <CardTitle>Completed Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-900">
                  {stats.completed}
                </div>
                <div className="text-gray-600 mt-2">Total workouts</div>
              </CardContent>
            </Card>

            {/* average duration card */}
            <Card>
              <CardHeader>
                <CardTitle>Average Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-900">
                  {stats.avgDuration}m
                </div>
                <div className="text-gray-600 mt-2">Per workout</div>
              </CardContent>
            </Card>

            {/* favorite exercise card */}
            <Card>
              <CardHeader>
                <CardTitle>Most Common Exercise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-900">
                  {stats.mostCommon}
                </div>
                <div className="text-gray-600 mt-2">Frequently performed</div>
              </CardContent>
            </Card>
          </div>

          {/* charts section */}
          <div className="space-y-6">
            {/* workout duration trend line chart */}
            <Card>
              <CardHeader>
                <CardTitle>Workout Duration Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={exercises.map(ex => ({
                      date: format(new Date(ex.date), 'MMM dd'),
                      duration: ex.durationMins
                    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="date"
                      stroke="#666666"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      stroke="#666666"
                      label={{
                        value: 'Duration (minutes)',
                        angle: -90,
                        position: 'insideLeft',
                        style: { fill: '#666666' }
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`${value} minutes`, 'Duration']}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="duration"
                      stroke="#990000"
                      strokeWidth={3}
                      dot={{ fill: '#990000', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                      name="Workout Duration"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* exercise type breakdown bar chart */}
            <Card>
              <CardHeader>
                <CardTitle>Exercise Type Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(
                      exercises.reduce((acc, ex) => {
                        acc[ex.name] = (acc[ex.name] || 0) + (ex.sets * ex.repetitions);
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([name, total]) => ({ name, total }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" stroke="#666666" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#666666"
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`${value} reps`, 'Total Repetitions']}
                    />
                    <Legend />
                    <Bar
                      dataKey="total"
                      fill="#FFCC00"
                      name="Total Repetitions"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* calendar */}
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
    </DashboardLayout>
  );
}