import React from 'react'

const StatsCard = ({ icon, value, label }) => {
    return (
        <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
          <div className="text-indigo-300 mb-2">{icon}</div>
          <div className="text-2xl font-bold text-white mb-1">
            {label === "Completed" || label === "Correct" ? `${value}/100` : value}
          </div>
          <div className="text-indigo-200 text-sm">{label}</div>
        </div>
      );
}

export default StatsCard