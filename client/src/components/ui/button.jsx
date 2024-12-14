import React from 'react';

const Button = ({
  children,
  onClick,
  variant = "primary", // default variant is primary
  size = "medium", // default size is medium
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles = "font-semibold rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Define the styles for each variant
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    link: "text-blue-600 hover:underline focus:ring-blue-500",
  };

  // Define the styles for each size
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  // Combine the styles dynamically
  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      onClick={onClick}
      className={buttonStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
