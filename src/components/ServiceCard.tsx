import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, features }) => {
  return (
    <div className="p-8 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition">
      <Icon className="h-12 w-12 text-purple-500 mb-6" />
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-400">
            • {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;