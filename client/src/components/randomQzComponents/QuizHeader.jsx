

import React from 'react';
import { motion } from 'framer-motion';

const QuizHeader = ({ level, questionNumber }) => {
  return (
    <div className="flex justify-between mb-6 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold"
      >
        Level: {level}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg font-semibold"
      >
        Question: {questionNumber}
      </motion.div>
    </div>
  );
};

export default QuizHeader;
