import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function PageHeader({ title, subtitle, className = '' }: PageHeaderProps) {
  return (
    <div className={`text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        {title}
      </h1>
      <p className="text-xl text-gray-300">
        {subtitle}
      </p>
    </div>
  );
}