import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import DashboardLayout from '~/components/DashboardLayout';

const fetchExercisesForCalendar = async (userId: number, dates: string[]) => {
  const exercisesByDate: Record<string, any[]> = {};

  for (const date of dates) {
    try {
      const response = await fetch(
        `https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/exercises/user/${userId}/date/${date}`
      );
      if (response.ok) {
        const exercises = await response.json();
        exercisesByDate[date] = exercises;
      } else {
        console.error(`Failed to fetch exercises for date ${date}`);
        exercisesByDate[date] = [];
      }
    } catch (error) {
      console.error(`Error fetching data for date ${date}:`, error);
      exercisesByDate[date] = [];
    }
  }

  return exercisesByDate;
};

const Schedule: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [exercisesByDate, setExercisesByDate] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDayExercises, setSelectedDayExercises] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const userId = 1;

  const generateCalendarDates = () => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(date)),
      end: endOfWeek(endOfMonth(date)),
    }).map((day) => format(day, 'yyyy-MM-dd'));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dates = generateCalendarDates();
      const data = await fetchExercisesForCalendar(userId, dates);
      setExercisesByDate(data);
      setLoading(false);
    };

    fetchData();
  }, [date]);

  const handlePreviousMonth = () => setDate((prev) => startOfMonth(new Date(prev.setMonth(prev.getMonth() - 1))));
  const handleNextMonth = () => setDate((prev) => startOfMonth(new Date(prev.setMonth(prev.getMonth() + 1))));

  const openModal = (date: string, exercises: any[]) => {
    setSelectedDayExercises(exercises);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDayExercises([]);
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: endOfWeek(endOfMonth(date)),
  });

  return (
    <DashboardLayout selectedTab="Schedule" setSelectedTab={() => {}}>
      <div className="flex flex-col gap-6">
        {/* Month Navigation */}
        <div className="mb-6">
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <h2 className="text-2xl font-semibold">{format(date, 'MMMM yyyy')}</h2>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <div className="flex justify-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Workout Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading calendar...</p>
              ) : (
                <div className="grid grid-cols-7 gap-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-700">
                      {day}
                    </div>
                  ))}
                  {daysInMonth.map((currentDay) => {
                    const formattedDate = format(currentDay, 'yyyy-MM-dd');
                    const exercises = exercisesByDate[formattedDate] || [];
                    const isCurrentMonth = format(currentDay, 'MM') === format(date, 'MM');

                    return (
                      <div
                        key={formattedDate}
                        className={`relative flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer ${
                          isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'
                        }`}
                        onClick={() => openModal(formattedDate, exercises)}
                      >
                        <span className="text-sm font-semibold">{format(currentDay, 'd')}</span>
                        {exercises.length > 0 && (
                          <span className="text-xs text-gray-600 mt-1">
                            {exercises.length} Exercise{exercises.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Modal for Day's Exercises */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Exercises for {selectedDate ? format(new Date(selectedDate), 'MMMM d, yyyy') : ''}
                </h2>
                <Button variant="ghost" size="icon" onClick={closeModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ul className="space-y-4">
                {selectedDayExercises.length > 0 ? (
                  selectedDayExercises.map((exercise) => (
                    <li key={exercise.id} className="flex flex-col">
                      <span className="font-semibold">{exercise.name}</span>
                      <span>
                        {exercise.sets} sets of {exercise.repetitions} reps
                      </span>
                      {exercise.durationMins && <span>Duration: {exercise.durationMins} mins</span>}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No exercises for this day.</p>
                )}
              </ul>
              <div className="flex justify-end mt-4">
                <Button variant="ghost" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
