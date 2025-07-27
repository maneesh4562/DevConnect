import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-indigo-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DevConnect</h3>
            <p className="text-gray-300">
              A platform for developers to connect, share projects, and build a professional network.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/developers" className="text-gray-300 hover:text-white">
                  Developers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">
              Have questions or suggestions? Reach out to us.
            </p>
            <a
              href="mailto:info@devconnect.com"
              className="text-indigo-300 hover:text-white"
            >
              info@devconnect.com
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {year} DevConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;