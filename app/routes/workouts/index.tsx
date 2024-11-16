///////////////////////////////////////////////
///~ (bc) possible page - this is a template
///~ contains sidebar, navigation date, and calendar

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import DashboardLayout from '~/components/DashboardLayout';

///////////////////////////////////////////////
///~ (bc) main
export default function Workouts() {
  const [date, setDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('Workouts');

  //possible bug on the states
  const handlePreviousDate = () => setDate(prev => addDays(prev, -1));
  const handleNextDate = () => setDate(prev => addDays(prev, 1));
  const handleToday = () => setDate(new Date());

  ///////////////////////////////////////////////
  ///~ (bc) layout
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
          </div>

          {/* TODO Placeholder */}
          <div className="flex items-center justify-center h-full">
            <h2 className="text-xl text-gray-600">TODO: todo</h2>
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
