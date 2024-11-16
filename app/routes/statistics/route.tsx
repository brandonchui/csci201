///////////////////////////////////////////////
///~ statistics page using graphs

import { useState } from 'react';
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
  Bar
} from "recharts";
import DashboardLayout from '~/components/DashboardLayout';
import { format, addDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

///////////////////////////////////////////////
///~ FAKE DATA
const weightData = [
  { date: "Jan 22", weight: 70, goal: 65, average: 69 },
  { date: "Feb 22", weight: 69, goal: 65, average: 68.5 },
  { date: "Mar 22", weight: 68, goal: 65, average: 68 },
  { date: "Apr 22", weight: 67, goal: 65, average: 67.5 },
  { date: "May 22", weight: 66, goal: 65, average: 67 }
];

const exerciseData = [
  { date: "Mon", pushUps: 30, squats: 40, pullUps: 15 },
  { date: "Tue", pushUps: 35, squats: 45, pullUps: 17 },
  { date: "Wed", pushUps: 28, squats: 42, pullUps: 14 },
  { date: "Thu", pushUps: 32, squats: 48, pullUps: 16 },
  { date: "Fri", pushUps: 38, squats: 50, pullUps: 18 }
];
///
////////////////////////////////////////////////

///////////////////////////////////////////////
///~ layout
export default function Statistics() {
  const [selectedTab, setSelectedTab] = useState('Statistics');
  const [date, setDate] = useState<Date>(new Date());

  const handlePreviousDate = () => setDate(prev => addDays(prev, -1));
  const handleNextDate = () => setDate(prev => addDays(prev, 1));
  const handleToday = () => setDate(new Date());

  return (
    <DashboardLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <div className="flex gap-6">
        <div className="flex-1">

          {/* date Navigation */}
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

            {/* weight loss cards */}
            <Card>
              <CardHeader>
                <CardTitle>Weight Loss Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-900">-4 kg</div>
                <div className="text-gray-600 mt-2">Since starting</div>
              </CardContent>
            </Card>

            {/* workouts cards */}
            <Card>
              <CardHeader>
                <CardTitle>Total Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-900">15</div>
                <div className="text-gray-600 mt-2">This month</div>
              </CardContent>
            </Card>

            {/* goal cards */}
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-900">80%</div>
                <div className="text-gray-600 mt-2">Of target weight</div>
              </CardContent>
            </Card>
          </div>

          {/* CHART - weight over time*/}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weight Progress Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">

                  {/* line chart begin */}
                  <LineChart
                    data={weightData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#666666" />
                    <YAxis stroke="#666666" />

                    {/* tooltip - might discard */}
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#990000"
                      strokeWidth={3}
                      dot={{ fill: '#990000', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                      name="Current Weight"
                    />

                    <Line
                      type="monotone"
                      dataKey="goal"
                      stroke="#FFCC00"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Goal Weight"
                    />

                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#666666"
                      strokeWidth={2}
                      dot={false}
                      name="Moving Average"
                    />
                  </LineChart>
                  {/* line chart end */}
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* CHART - weekly exercise cards */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Exercise Progress</CardTitle>
              </CardHeader>

              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">

                  {/* bar chart begin */}
                  <BarChart
                    data={exerciseData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#666666" />
                    <YAxis stroke="#666666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="pushUps" fill="#990000" name="Push-ups" />
                    <Bar dataKey="squats" fill="#FFCC00" name="Squats" />
                    <Bar dataKey="pullUps" fill="#666666" name="Pull-ups" />
                  </BarChart>
                  {/* bar chart end */}

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