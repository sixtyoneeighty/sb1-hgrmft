import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              sixtyoneeighty
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-300 hover:text-purple-400 transition">Services</Link>
            <Link to="/about" className="text-gray-300 hover:text-purple-400 transition">About</Link>
            <Link to="/industry-pulse" className="text-gray-300 hover:text-purple-400 transition">Industry Pulse</Link>
            <Link to="/workshop" className="text-gray-300 hover:text-purple-400 transition">Workshop</Link>
            <Link to="/contact" className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-b border-gray-800">
            <Link
              to="/services"
              className="block px-3 py-2 text-gray-300 hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-300 hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/industry-pulse"
              className="block px-3 py-2 text-gray-300 hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Industry Pulse
            </Link>
            <Link
              to="/workshop"
              className="block px-3 py-2 text-gray-300 hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Workshop
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-purple-500 hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;