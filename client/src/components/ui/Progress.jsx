import React from 'react';

const Progress = ({
  value,
  max = 100,
  size = "medium", // default size is medium
  color = "blue", // default color is blue
  showLabel = true, // whether to show progress label
  className = "",
  ...props
}) => {
  // Define the styles for each color
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600",
    purple: "bg-purple-600",
    gray: "bg-gray-400",
  };

  // Define the styles for each size
  const sizes = {
    small: "h-2",
    medium: "h-4",
    large: "h-6",
  };

  // Calculate the percentage of the progress
  const percentage = (value / max) * 100;

  // Base styles for the progress bar container
  const baseStyles = "w-full rounded-full bg-gray-200";

  // Combining styles dynamically
  const progressBarStyles = `${baseStyles} ${sizes[size]} ${colors[color]}`;

  return (
    <div className={`w-full ${className}`} {...props}>
      <div className="relative">
        <div className={progressBarStyles} style={{ width: `${percentage}%` }} />
        {showLabel && (
          <span
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold"
            style={{ left: `${percentage}%` }}
          >
            {`${Math.round(percentage)}%`}
          </span>
        )}
      </div>
    </div>
  );
};

export default Progress;
