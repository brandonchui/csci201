import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Nav: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-usc-crimson text-white p-4 relative">
      <div className="max-w-4xl mx-auto flex items-center justify-center relative">


        <Link to="/" className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          CSCI201 Project
        </Link>


        <div className="ml-auto relative">
          <button onClick={toggleDropdown} className="hover:text-usc-gold focus:outline-none">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>


          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                View Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
