import React from 'react';
import { Brain, Code, LineChart /* etc */ } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: Brain | Code | LineChart /* etc */;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon: Icon, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center px-6 py-3 rounded-md text-base font-medium transition
        ${variant === 'primary' 
          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
          : 'border border-gray-300 text-gray-300 hover:bg-gray-800'
        }
        ${className}
      `}
      {...props}
    >
      {children}
      {Icon && <Icon className="ml-2 h-5 w-5" />}
    </button>
  );
};

export default Button;