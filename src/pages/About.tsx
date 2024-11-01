import React from 'react';
import { Globe, Users, Zap, MessageSquare } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const values = [
  {
    icon: Globe,
    title: 'Global Perspective, Local Impact',
    description: 'Our distributed team brings diverse insights from different corners of the world, ensuring solutions that work across cultures and markets.'
  },
  {
    icon: Users,
    title: 'Size-Proud',
    description: 'Small by choice, focused by design. Our lean team structure ensures direct communication and exceptional attention to every project.'
  },
  {
    icon: Zap,
    title: 'Tech-Agnostic Innovation',
    description: 'We choose the right tools for your specific needs, not our preferences. Our solutions are built on merit, not market trends.'
  },
  {
    icon: MessageSquare,
    title: 'Straight Shooters',
    description: 'We believe in radical honesty. Sometimes that means recommending less than you asked for, because your success is our priority.'
  }
];

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <PageHeader
        title="Our Story"
        subtitle="We're not your typical tech consultants - and we wear that as a badge of honor."
        className="mb-16"
      />

      {/* Main Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Breaking the Corporate Mold</h2>
            <p className="text-gray-300 mb-6">
              We're a band of five AI enthusiasts who decided to ditch the corporate playbook and build something different. 
              Scattered across the globe but connected by our passion for technology and a shared belief that there's always 
              a better way to do things, we created sixtyoneeighty.
            </p>
            <p className="text-gray-300">
              Why sixtyoneeighty? Because like our name, we believe in doing things differently. We're the kind of team 
              that geeks out over new AI models during the day and debates the best pizza toppings during our virtual 
              hangouts. (The pineapple debate rages on.)
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
              alt="Team collaboration" 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-800/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                  <Icon className="h-8 w-8 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}