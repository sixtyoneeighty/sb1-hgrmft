import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Code, LineChart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                sixtyoneeighty
              </span>
            </Link>
            <p className="mt-4 text-gray-400">
              Tech rebels with expertise, combining cutting-edge AI knowledge with unconventional thinking.
            </p>
          </div>

          <div className="hidden md:block"></div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-purple-400">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-purple-400">About</Link></li>
              <li><Link to="/industry-pulse" className="text-gray-400 hover:text-purple-400">Industry Pulse</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;