import { Link } from '@remix-run/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faClipboardList, faCalendarAlt, faUtensils, faCog, faDumbbell, faRobot, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

type CalendarValue = Date | Date[] | null;

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('Workouts');
  const [date, setDate] = useState<CalendarValue>(new Date());

  const formattedDate = format(date as Date, "EEEE, MMMM d, yyyy");

  const handlePreviousDate = () => setDate(addDays(date as Date, -1));
  const handleNextDate = () => setDate(addDays(date as Date, 1));
  const handleToday = () => setDate(new Date());

  return (
    <div className="flex h-screen bg-gray-100">
      {/* sidebar */}
      <aside className="w-64 bg-usc-crimson text-white flex flex-col justify-between p-6">
        <div>
          {/*<div className="text-3xl font-bold mb-8">WorkoutPlanner</div>*/}
          <nav className="space-y-6">
            <Link to="/dashboard" onClick={() => setSelectedTab('Dashboard')} className={`block text-lg flex items-center space-x-2 ${selectedTab === 'Dashboard' ? 'text-usc-gold' : ''}`}>
              <FontAwesomeIcon icon={faHome} /> <span>Dashboard</span>
            </Link>
            {/*<Link to="/#" onClick={() => setSelectedTab('Workouts')} className={`block text-lg flex items-center space-x-2 ${selectedTab === 'Workouts' ? 'text-usc-gold' : ''}`}>*/}
            {/*  <FontAwesomeIcon icon={faClipboardList} /> <span>Workout Plan</span>*/}
            {/*</Link>*/}
            <Link to="/statistics" onClick={() => setSelectedTab('Statistics')} className={`block text-lg flex items-center space-x-2 ${selectedTab === 'Statistics' ? 'text-usc-gold' : ''}`}>
              <FontAwesomeIcon icon={faChartBar} /> <span>Statistics</span>
            </Link>

            {/*<Link to="/schedule" onClick={() => setSelectedTab('Schedule')} className={`block text-lg flex items-center space-x-2 ${selectedTab === 'Schedule' ? 'text-usc-gold' : ''}`}>*/}
            {/*  <FontAwesomeIcon icon={faCalendarAlt} /> <span>Schedule</span>*/}
            {/*</Link>*/}
            {/*<Link to="/diet" onClick={() => setSelectedTab('Diet')} className={`block text-lg flex items-center space-x-2 ${selectedTab === 'Diet' ? 'text-usc-gold' : ''}`}>*/}
            {/*  <FontAwesomeIcon icon={faUtensils} /> <span>Diet Plan</span>*/}
            {/*</Link>*/}
            {/*<Link to="/settings" onClick={() => setSelectedTab('Settings')} className={`block text-lg flex items-center space-x-2 ${selectedTab === 'Settings' ? 'text-usc-gold' : ''}`}>*/}
            {/*  <FontAwesomeIcon icon={faCog} /> <span>Settings</span>*/}
            {/*</Link>*/}

          </nav>
        </div>
        <Link to="/" className="text-lg hover:text-usc-gold mt-8">Log Out</Link>
      </aside>

      {/* main content area */}
      <div className="flex-1 flex flex-col">
        {/* top navigation */}

        {/*<header className="bg-white p-4 shadow-md flex justify-between items-center">*/}
        {/*  <h1 className="text-2xl font-bold text-gray-800">Workout Plan</h1>*/}
        {/*  <input type="text" placeholder="Search..." className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-usc-gold" />*/}
        {/*</header>*/}

        {/* workout list and right sidebar */}
        <div className="flex flex-1">
          {/* workout list */}
          <main className="p-6 flex-1 overflow-y-auto space-y-4">
            {/* date display with navigation */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={handlePreviousDate} className="text-usc-crimson hover:text-usc-gold transition">
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-800">{formattedDate}</h2>
              <button onClick={handleNextDate} className="text-usc-crimson hover:text-usc-gold transition">
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>

            </div>

            {/* generate workout button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Plan List</h2>
              <button className="flex items-center bg-usc-gold text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition">
                <FontAwesomeIcon icon={faRobot} className="mr-2" /> Generate Workout with AI
              </button>
            </div>

            {/* workout items */}
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-white shadow rounded-lg">
                <FontAwesomeIcon icon={faDumbbell} className="text-usc-gold text-2xl mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-usc-crimson">Lunges</h3>
                  <p className="text-sm text-gray-600">3 sets of 12 reps</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white shadow rounded-lg">
                <FontAwesomeIcon icon={faDumbbell} className="text-usc-gold text-2xl mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-usc-crimson">Push-Ups</h3>
                  <p className="text-sm text-gray-600">4 sets of 15 reps</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white shadow rounded-lg">
                <FontAwesomeIcon icon={faDumbbell} className="text-usc-gold text-2xl mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-usc-crimson">Squats</h3>
                  <p className="text-sm text-gray-600">3 sets of 10 reps</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white shadow rounded-lg">
                <FontAwesomeIcon icon={faDumbbell} className="text-usc-gold text-2xl mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-usc-crimson">Plank</h3>
                  <p className="text-sm text-gray-600">3 sets of 1 minute</p>
                </div>
              </div>
            </div>
          </main>

          {/* right sidebar - calendar */}
          <aside className="w-80 bg-white p-6 border-l border-gray-200 shadow-md relative">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Calendar</h2>
            <Calendar
              onChange={(value) => setDate(value)}
              value={date}
              className="custom-calendar"
            />

            {/* today button */}
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
