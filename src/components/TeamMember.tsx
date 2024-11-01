import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  expertise: string[];
}

export default function TeamMember({ name, role, image, expertise }: TeamMemberProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition">
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-purple-400 mb-3">{role}</p>
        <div className="flex flex-wrap gap-2">
          {expertise.map((skill, index) => (
            <span
              key={index}
              className="text-sm px-3 py-1 rounded-full bg-gray-700/50 text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}