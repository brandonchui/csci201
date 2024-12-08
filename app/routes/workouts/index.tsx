// workout.tsx

///////////////////////////////////////////////
///~ Workout Planner with Dynamic User Authentication

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  X,
  Check,
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import DashboardLayout from '~/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

/////////////////////////////////////////////
// Configuration

// Define the API base URL consistently across the application
//const API_BASE_URL = 'http://localhost:8080/projectBackend/';
// If you are running the API on Heroku or another remote server, uncomment the line below and comment out the above line
 const API_BASE_URL = 'https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api';

/////////////////////////////////////////////
// User Authentication and Data Types

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

const DEFAULT_USER_DATA: UserData = {
  id: 0,
  email: "guest@example.com",
  hashedPassword: "",
  weightPounds: 0,
  heightInches: 0,
  age: 0,
  gender: "U",
  goal: "none",
};

/////////////////////////////////////////////
// Loader Function to Fetch User and Exercises Data

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  console.log('Loading data for userId:', userId);

  try {
    // Verify if user exists
    const verifyUserResponse = await fetch(`${API_BASE_URL}/users`);
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

    // Fetch user data
    const userResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!userResponse.ok) {
      console.error('Failed to fetch user data, status:', userResponse.status);
      throw new Error('Failed to fetch user data');
    }
    const userData = await userResponse.json();
    console.log('Fetched user data:', userData);

    // Fetch exercises for today
    const today = format(new Date(), 'yyyy-MM-dd');
    const exercisesResponse = await fetch(
      `${API_BASE_URL}/exercises/user/${userId}/date/${today}`
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
    console.error('Error in workout loader:', error);
    // Fallback in case of error
    return json<LoaderData>({
      userId,
      userData: DEFAULT_USER_DATA,
      exercises: []
    });
  }
};

///////////////////////////////////////////////
///~ WorkoutPlanner Component

export default function WorkoutPlanner() {
  // Retrieve data from loader
  const { userId, userData, exercises: initialExercises } = useLoaderData<LoaderData>();

  const [selectedTab, setSelectedTab] = useState('Workout Planner');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    sets: '',
    repetitions: '',
    durationMins: '',
  });

  // Initialize workouts with data from loader
  const [workouts, setWorkouts] = useState<Exercise[]>(initialExercises);
  const [isLoading, setIsLoading] = useState(false);

  ///////////////////////////////////////////////
  // Date Navigation Handlers

  const handlePreviousDate = () => setSelectedDate((prev) => addDays(prev, -1));
  const handleNextDate = () => setSelectedDate((prev) => addDays(prev, 1));
  const handleToday = () => setSelectedDate(new Date());

  ///////////////////////////////////////////////
  // Fetch Workouts for Selected Date

  const fetchWorkoutsForDate = async (date: Date) => {
    setIsLoading(true);
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await fetch(`${API_BASE_URL}/exercises/user/${userId}/date/${formattedDate}`);

      if (!response.ok) {
        console.error('Failed to fetch workouts for date:', formattedDate, 'Status:', response.status);
        setWorkouts([]);
        return;
      }

      const workoutsData: Exercise[] = await response.json();
      setWorkouts(workoutsData);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setWorkouts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle date change
  const handleDateChange = async (newDate: Date | undefined) => {
    if (newDate) {
      setSelectedDate(newDate);
      await fetchWorkoutsForDate(newDate);
    }
  };

  ///////////////////////////////////////////////
  // Add Workout Handler

  const handleAddWorkout = async () => {
    if (!newWorkout.name || !newWorkout.sets || !newWorkout.repetitions || !newWorkout.durationMins) {
      alert("Please fill out all fields before adding a workout!");
      return;
    }

    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const response = await fetch(`${API_BASE_URL}/exercises`, { // Removed trailing slash
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Uncomment and set token if authentication is required
        },
        body: JSON.stringify({
          userId: Number(userId),
          date: formattedDate,
          name: newWorkout.name,
          sets: Number(newWorkout.sets),
          repetitions: Number(newWorkout.repetitions),
          durationMins: Number(newWorkout.durationMins),
          isAiSuggestion: false,
          isCompleted: false,
        }),
      });

      if (response.ok) {
        const createdWorkout: Exercise = await response.json();
        setWorkouts((prevWorkouts) => [...prevWorkouts, createdWorkout]);

        // Reset the form and close the popup
        setNewWorkout({
          name: '',
          sets: '',
          repetitions: '',
          durationMins: '',
        });
        setShowAddWorkout(false);
      } else {
        let errorMessage = 'Unknown error';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          console.error('Failed to parse error response:', err);
        }
        console.error("Failed to add the workout. Status:", response.status, "Error:", errorMessage);
        alert(`Failed to add the workout: ${errorMessage}`);
      }
    } catch (error) {
      //console.error("Error adding workout:", error);
      //alert("An unexpected error occurred while adding the workout.");
      //setShowAddWorkout(false);
      window.location.reload();

    }
  };

  ///////////////////////////////////////////////
  // Remove Workout Handler

  const handleRemoveWorkout = async (workoutId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${workoutId}`, { // Use API_BASE_URL
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Uncomment if authentication is required
        },
      });

      if (response.ok) {
        setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== workoutId));
      } else {
        let errorMessage = 'Unknown error';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          console.error('Failed to parse error response:', err);
        }
        console.error("Failed to delete the workout. Status:", response.status, "Error:", errorMessage);
        alert(`Failed to delete the workout: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
      alert("An unexpected error occurred while deleting the workout.");
    }
  };

  ///////////////////////////////////////////////
  // Complete Workout Handler

  const handleCompleteWorkout = async (workout: Exercise) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${workout.id}`, { // Use API_BASE_URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Uncomment if authentication is required
        },
        body: JSON.stringify({
          ...workout,
          isCompleted: true,
        }),
      });

      if (response.ok) {
        // Update the local state
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((w) =>
            w.id === workout.id ? { ...w, isCompleted: true } : w
          )
        );
      } else {
        let errorMessage = 'Unknown error';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          console.error('Failed to parse error response:', err);
        }
        console.error("Failed to update the workout. Status:", response.status, "Error:", errorMessage);
        alert(`Failed to update the workout: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating workout:", error);
      alert("An unexpected error occurred while updating the workout.");
    }
  };

  ///////////////////////////////////////////////
  // Fetch Workouts When Selected Date Changes

  useEffect(() => {
    fetchWorkoutsForDate(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  ///////////////////////////////////////////////
  // 7-Day Timeline Data (Optional Enhancement)

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

  ///////////////////////////////////////////////
  // New: Generate Plan Handler

  const handleGeneratePlan = async () => {
    // Confirm with the user
    if (!window.confirm("Are you sure you want to generate a new workout plan? This will delete existing workouts for this day.")) {
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Delete existing workouts for the selected date
      const deletePromises = workouts.map(workout =>
        fetch(`${API_BASE_URL}/exercises/${workout.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`, // Uncomment if authentication is required
          },
        })
      );

      const deleteResponses = await Promise.all(deletePromises);
      const failedDeletes = deleteResponses.filter(response => !response.ok);

      if (failedDeletes.length > 0) {
        throw new Error("Failed to delete some workouts.");
      }

      // Step 2: Call the OpenAPI Java server to generate new workouts
      const openApiResponse = await fetch('http://localhost:7273/listen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId }), // Send userId within an object
      });

      if (!openApiResponse.ok) {
        throw new Error(`Failed to generate plan. Status: ${openApiResponse.status}`);
      }

      // Step 3: Fetch the updated workouts for the selected date
      await fetchWorkoutsForDate(selectedDate);

      // Step 4: Notify the user
      alert("Workout plan generated successfully!");

    } catch (error) {
      console.error("Error generating workout plan:", error);
      alert("An error occurred while generating the workout plan.");
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////////////////////
  // Render Component

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
                <h2 className="text-2xl font-semibold">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </h2>
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
                <Button onClick={() => setShowAddWorkout(true)}>Add Workout</Button>
                {/* Generate Plan Button */}
                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  onClick={handleGeneratePlan}
                  disabled={isLoading}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isLoading ? "Generating..." : "Generate Plan"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500">Loading workouts...</div>
                </div>
              ) : workouts.length > 0 ? (
                <div className="space-y-4">
                  {workouts.map((workout) => (
                    <div
                      key={workout.id}
                      className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 bg-white border rounded-lg shadow-sm transition-colors relative ${
                        workout.isCompleted ? 'bg-green-50 border-green-500' : 'hover:border-blue-500'
                      }`}
                    >
                      {/* Workout Info */}
                      <div className="flex items-center">
                        <Dumbbell className="h-5 w-5 mr-4 text-blue-500" />
                        <div>
                          <h3 className={`text-lg font-semibold ${workout.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {workout.name}
                          </h3>
                          <p className={`text-sm ${workout.isCompleted ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            {workout.sets} sets of {workout.repetitions} reps
                          </p>
                          <p className={`text-sm ${workout.isCompleted ? 'line-through text-gray-400' : 'text-gray-500'}`}>
                            <strong>Duration:</strong> {workout.durationMins} mins
                          </p>
                          {workout.isCompleted && (
                            <Badge className="mt-1 bg-green-100 text-green-800">Completed</Badge>
                          )}
                        </div>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 mt-2 lg:mt-0">
                        {!workout.isCompleted && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="relative group"
                            onClick={() => handleCompleteWorkout(workout)}
                          >
                            <Check className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-green-500" />
                            <span className="sr-only">Mark as Completed</span>
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveWorkout(workout.id)}
                        >
                          <X className="h-5 w-5" />
                          <span className="sr-only">Remove Workout</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No workouts scheduled for this day.</p>
              )}
            </CardContent>
          </Card>
        </div>

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
                onSelect={handleDateChange}
                className="rounded-md border h-full"
              />
              <Button className="w-full mt-4" variant="outline" onClick={handleToday}>
                Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Workout Popup */}
      {showAddWorkout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
                  min="1"
                  value={newWorkout.sets}
                  onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="repetitions">Repetitions</Label>
                <Input
                  id="repetitions"
                  type="number"
                  min="1"
                  value={newWorkout.repetitions}
                  onChange={(e) => setNewWorkout({ ...newWorkout, repetitions: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="durationMins">Duration (mins)</Label>
                <Input
                  id="durationMins"
                  type="number"
                  min="1"
                  value={newWorkout.durationMins}
                  onChange={(e) => setNewWorkout({ ...newWorkout, durationMins: e.target.value })}
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
                onClick={() => setSelectedDate(new Date(item.date))}
              >
                {/* Dot */}
                <div
                  className={`h-4 w-4 rounded-full ${
                    format(new Date(item.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                  style={{ zIndex: 1 }}
                ></div>

                {/* Day and Type Information */}
                <div className="mt-4 text-sm text-center">
                  <div>{format(new Date(item.date), 'EEE')}</div>
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
