import { Link } from '@remix-run/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartBar,
  faClipboardList,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

// Initialize ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type CalendarValue = Date | Date[] | null;

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('Statistics');
  const [date, setDate] = useState<CalendarValue>(new Date());

  const formattedDate = format(date as Date, "EEEE, MMMM d, yyyy");
  const handlePreviousDate = () => setDate(addDays(date as Date, -1));
  const handleNextDate = () => setDate(addDays(date as Date, 1));
  const handleToday = () => setDate(new Date());

  // Sample weight data
  const weightData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [70, 69, 68, 67, 66, 65, 64],
        borderColor: '#990000',
        backgroundColor: '#FFCC00',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* sidebar */}
      <aside className="w-64 bg-usc-crimson text-white flex flex-col justify-between p-6">
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
        <Link to="/" className="text-lg hover:text-usc-gold mt-8">
          Log Out
        </Link>
      </aside>

      {/* main content area */}
      <div className="flex-1 flex flex-col">
        {/* main content and sidebar */}
        <div className="flex flex-1">
          {/* main content area */}
          <main className="p-6 flex-1 overflow-y-auto space-y-6">
            {/* date navigation */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={handlePreviousDate} className="text-usc-crimson hover:text-usc-gold transition">
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-800">{formattedDate}</h2>
              <button onClick={handleNextDate} className="text-usc-crimson hover:text-usc-gold transition">
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>
            </div>

            {/* Weight Tracker Chart */}
            <section className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Weight Tracker</h2>
              <Line data={weightData} options={options} />
            </section>
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
