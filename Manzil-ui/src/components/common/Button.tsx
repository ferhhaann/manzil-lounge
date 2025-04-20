
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}: ButtonProps) => {
  const baseClasses = 'btn transition-all duration-300 inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    primary: 'bg-hotel-navy hover:bg-opacity-90 text-white shadow-sm',
    secondary: 'bg-hotel-beige hover:bg-hotel-darkBeige text-hotel-navy shadow-sm',
    accent: 'bg-hotel-gold hover:bg-opacity-90 text-white shadow-sm',
    outline: 'border border-hotel-navy hover:bg-hotel-navy/5 text-hotel-navy',
    ghost: 'hover:bg-hotel-beige/50 text-hotel-navy'
  };
  
  const sizeClasses = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 py-3 text-base'
  };
  
  return (
    <button 
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
