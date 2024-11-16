import { Link } from '@remix-run/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartBar,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import { Card, CardContent, CardHeader, CardTitle } from "app/components/ui/card";
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

///////////////////////////////////////////////////////
//FAKE DATA
type CalendarValue = Date | Date[] | null;

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
//FAKE DATA
///////////////////////////////////////////////////////

export default function Statistics() {
  //sidebar
  const [selectedTab, setSelectedTab] = useState('Statistics');
  const [date, setDate] = useState<CalendarValue>(new Date());

  const formattedDate = format(date as Date, "EEEE, MMMM d, yyyy");
  const handlePreviousDate = () => setDate(addDays(date as Date, -1));
  const handleNextDate = () => setDate(addDays(date as Date, 1));
  const handleToday = () => setDate(new Date());

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <aside className="w-64 bg-usc-crimson text-white flex flex-col justify-between p-6">
        <div>
          <nav className="space-y-6">
            <Link
              to="/dashboard"
              onClick={() => setSelectedTab('Dashboard')}
              className={`block text-lg flex items-center space-x-2 ${selectedTab === 'Dashboard' ? 'text-usc-gold' : ''}`}
            >
              <FontAwesomeIcon icon={faHome} /> <span>Dashboard</span>
            </Link>
            <Link
              to="/statistics"
              onClick={() => setSelectedTab('Statistics')}
              className={`block text-lg flex items-center space-x-2 ${selectedTab === 'Statistics' ? 'text-usc-gold' : ''}`}
            >
              <FontAwesomeIcon icon={faChartBar} /> <span>Statistics</span>
            </Link>
          </nav>
        </div>
        <Link to="/" className="text-lg hover:text-usc-gold mt-8">Log Out</Link>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1">
          <main className="p-6 flex-1 overflow-y-auto space-y-6">
            {/* DATE NAV */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={handlePreviousDate} className="text-usc-crimson hover:text-usc-gold transition">
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-800">{formattedDate}</h2>
              <button onClick={handleNextDate} className="text-usc-crimson hover:text-usc-gold transition">
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Loss Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-usc-crimson">-4 kg</div>
                  <div className="text-gray-600 mt-2">Since starting</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-usc-crimson">15</div>
                  <div className="text-gray-600 mt-2">This month</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-usc-crimson">80%</div>
                  <div className="text-gray-600 mt-2">Of target weight</div>
                </CardContent>
              </Card>
            </div>

            {/* WEIGHT PROG CHART */}
            <Card>
              <CardHeader>
                <CardTitle>Weight Progress Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weightData}
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
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* EXERCISE PROG CHART */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Exercise Progress</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
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
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </main>

          {/* RIGHT SIDEBAR CALENDAR*/}
          <aside className="w-80 bg-white p-6 border-l border-gray-200 shadow-md relative">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Calendar</h2>
            <Calendar
              onChange={(value) => setDate(value)}
              value={date}
              className="custom-calendar"
            />

            {/* today */}
            <button
              onClick={handleToday}
              className="absolute bottom-0 left-0 w-full px-4 py-3 bg-usc-gold text-white text-center rounded-none shadow hover:bg-yellow-500 transition"
            >
              Today
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}