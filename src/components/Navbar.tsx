import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide';

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
            <Link to="/contact" className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;