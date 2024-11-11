import { Link } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Index() {
  return (
    <div className="flex flex-col items-center text-center px-6 py-16 bg-white text-gray-800 space-y-12">
      <div className="mb-8">
        <img src="/logo.png" alt="FitLife Logo" className="h-24 w-auto mx-auto" />
      </div>

      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-bold text-usc-crimson mb-4 tracking-wide leading-tight">
          Empower Your Fitness Journey
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center text-lg font-medium text-white px-6 py-3 rounded-lg bg-usc-gold hover:bg-yellow-500 transition ease-in-out duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Get Started <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mt-12">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-usc-crimson text-2xl font-semibold">Track Progress</div>
          <p className="text-gray-600 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-usc-crimson text-2xl font-semibold">Personalized Plans</div>
          <p className="text-gray-600 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-usc-crimson text-2xl font-semibold">Stay Motivated</div>
          <p className="text-gray-600 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div>
    </div>
  );
}
