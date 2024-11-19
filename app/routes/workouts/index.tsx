import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import DashboardLayout from '~/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';

export default function WorkoutPlanner() {
  const [selectedTab, setSelectedTab] = useState('Workout Planner');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    sets: '',
    repetitions: '',
    muscles: '',
    intensity: '',
  });

  // Use state to manage workouts
  const [workouts, setWorkouts] = useState([
    { name: 'Lunges', sets: '3 sets of 12 reps', intensity: 'Medium', muscles: 'Legs, Glutes' },
    { name: 'Push-Ups', sets: '4 sets of 15 reps', intensity: 'High', muscles: 'Chest, Triceps, Shoulders' },
    { name: 'Squats', sets: '3 sets of 10 reps', intensity: 'High', muscles: 'Legs, Glutes, Core' },
    { name: 'Plank', sets: '3 sets of 1 minute', intensity: 'Medium', muscles: 'Core, Shoulders' },
    { name: 'Deadlifts', sets: '4 sets of 8 reps', intensity: 'High', muscles: 'Lower Back, Glutes, Hamstrings' },

  ]);

  const handlePreviousDate = () => setSelectedDate((prev) => addDays(prev, -1));
  const handleNextDate = () => setSelectedDate((prev) => addDays(prev, 1));
  const handleToday = () => setSelectedDate(new Date());

  const handleAddWorkout = () => {
    if (!newWorkout.name || !newWorkout.sets || !newWorkout.repetitions || !newWorkout.muscles || !newWorkout.intensity) {
      alert("Please fill out all fields before adding a workout!");
      return;
    }

    // Add the new workout to the list
    setWorkouts((prevWorkouts) => [
      ...prevWorkouts,
      {
        name: newWorkout.name,
        sets: `${newWorkout.sets} sets of ${newWorkout.repetitions} reps`,
        intensity: newWorkout.intensity,
        muscles: newWorkout.muscles,
      },
    ]);

    // Reset the form and close the popup
    setNewWorkout({
      name: '',
      sets: '',
      repetitions: '',
      muscles: '',
      intensity: '',
    });
    setShowAddWorkout(false);
  };

  const timelineStartDate = new Date();
  const timelineData = [
    { date: addDays(timelineStartDate, -3), type: 'Legs' },
    { date: addDays(timelineStartDate, -2), type: 'Arms' },
    { date: addDays(timelineStartDate, -1), type: 'Rest' },
    { date: timelineStartDate, type: 'Full Body' },
    { date: addDays(timelineStartDate, 1), type: 'Cardio' },
    { date: addDays(timelineStartDate, 2), type: 'Legs' },
    { date: addDays(timelineStartDate, 3), type: 'Rest' },
  ];

  return (
    <DashboardLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date Navigation */}
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={handlePreviousDate}>
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <h2 className="text-2xl font-semibold">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
                <Button variant="ghost" size="icon" onClick={handleNextDate}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Workouts Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Workouts</CardTitle>
                <CardDescription>Your personalized fitness routine</CardDescription>
              </div>
              <div className="flex space-x-2">
                {/* Add Workout Button */}
                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  onClick={() => setShowAddWorkout(true)}
                >
                  Add Workout
                </Button>
                {/* Generate Plan Button */}
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workouts.map((workout, index) => (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-center">
                      <Dumbbell className="h-5 w-5 mr-4 text-blue-500" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                        <p className="text-sm text-gray-600">{workout.sets}</p>
                        <p className="text-sm text-gray-500">
                          <strong>Targets:</strong> {workout.muscles}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        workout.intensity === 'High'
                          ? 'border-red-500 text-red-500'
                          : 'border-yellow-500 text-yellow-600'
                      }
                    >
                      {workout.intensity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Workout Popup */}
        {showAddWorkout && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h3 className="text-xl font-semibold mb-4">Add New Workout</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Workout Name</Label>
                  <Input
                    id="name"
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="sets">Sets</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={newWorkout.sets}
                    onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="repetitions">Repetitions</Label>
                  <Input
                    id="repetitions"
                    type="number"
                    value={newWorkout.repetitions}
                    onChange={(e) => setNewWorkout({ ...newWorkout, repetitions: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="muscles">Target Muscles</Label>
                  <Input
                    id="muscles"
                    value={newWorkout.muscles}
                    onChange={(e) => setNewWorkout({ ...newWorkout, muscles: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="intensity">Intensity</Label>
                  <Input
                    id="intensity"
                    value={newWorkout.intensity}
                    onChange={(e) => setNewWorkout({ ...newWorkout, intensity: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" onClick={() => setShowAddWorkout(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddWorkout}>Add Workout</Button>
              </div>
            </div>
          </div>
        )}
        {/* Right Section: Calendar */}
        <div className="space-y-6">
          <Card className="h-[450px]">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Track your workout schedule</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(newDate) => newDate && setSelectedDate(newDate)}
                className="rounded-md border h-full"
              />
              <Button className="w-full mt-4" variant="outline" onClick={handleToday}>
                Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section: 7-Day Timeline with Clickable Dots */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>7-Day Workout Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex items-center justify-between overflow-x-auto pb-4">
            {/* Timeline Line */}
            <div className="absolute top-2 left-0 w-full h-1 bg-gray-300"></div>

            {/* Dots and Info */}
            {timelineData.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedDate(item.date)}
              >
                {/* Dot */}
                <div
                  className={`h-4 w-4 rounded-full ${
                    format(item.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                  style={{ zIndex: 1 }}
                ></div>

                {/* Day and Type Information */}
                <div className="mt-4 text-sm text-center">
                  <div>{format(item.date, 'EEE')}</div>
                  <div className="text-xs bg-gray-100 rounded-full px-3 py-1">
                    {item.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Spacing Fix */}
      <div className="h-12"></div> {/* Adds space above footer */}
    </DashboardLayout>
  );
}
