import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  icon: Icon,
  className = '',
  onClick
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-md text-base font-medium transition-all duration-200';
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'border border-gray-300 text-gray-300 hover:bg-gray-800'
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
        {Icon && <Icon className="ml-2 h-5 w-5" />}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        {Icon && <Icon className="ml-2 h-5 w-5" />}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
      {Icon && <Icon className="ml-2 h-5 w-5" />}
    </button>
  );
}