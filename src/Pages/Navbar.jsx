import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Course', path: '/course' },
    { name: 'Track Record', path: '/p&lrecords' },
    { name: 'Copy Trading', path: '/copy&trading' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-28">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src="/T.png" alt="Logo" className="h-24 object-contain" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                to={link.path}
                className={`px-4 py-2 relative font-medium transition-all duration-300 ${
                  location.pathname === link.path ? 'text-blue-400' : 'text-white'
                }`}
              >
                {/* Hover Border */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-400/30 transition-all duration-300"></div>

                {/* Link Text */}
                <span className="relative z-10">{link.name}</span>

                {/* Bottom Hover Line */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <span className="text-xl">{isOpen ? '✖' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 hover:bg-gray-700 ${
                location.pathname === link.path ? 'text-blue-400' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
