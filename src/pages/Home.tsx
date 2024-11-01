import React from 'react';
import { ArrowRight, Cpu, Lightbulb, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-gray-900"></div>
        <div 
          className="relative min-h-[90vh] flex items-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Tech Rebels with a Purpose
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                We're five AI enthusiasts who combine cutting-edge technology with fresh perspectives to create solutions that actually make sense for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-300 hover:bg-gray-800 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition">
              <Cpu className="h-12 w-12 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Custom Solutions</h3>
              <p className="text-gray-400">
                We craft unique AI solutions that fit your business like a glove, bringing fresh perspectives and cutting-edge expertise to every project.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition">
              <Lightbulb className="h-12 w-12 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Strategic Vision</h3>
              <p className="text-gray-400">
                Think of us as your AI translation team - we speak both 'tech' and 'human,' helping uncover possibilities you might not have considered.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition">
              <Scale className="h-12 w-12 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Scalable Technology</h3>
              <p className="text-gray-400">
                We build for both today and tomorrow, ensuring your technology can handle whatever comes next without breaking your budget.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}