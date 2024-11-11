import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 text-gray-700 p-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        <p className="text-sm mt-2">&copy; {currentYear} asdf. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
