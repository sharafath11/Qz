
import React from 'react';
import { motion } from 'framer-motion';

const Options = ({ options, selectedOption, setSelectedOption }) => {
  
  return (
    <div className="space-y-4">
      {options?.map((option, index) => (
        <motion.button
          key={index}
          onClick={() => setSelectedOption(option)}
          className={`w-full py-3 px-6 rounded-lg text-white text-xl font-semibold transition-transform duration-300 ease-in-out transform ${
            selectedOption === option ? 'bg-indigo-600 scale-105' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
};

export default Options;
