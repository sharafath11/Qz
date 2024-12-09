

import React from 'react';
import { motion } from 'framer-motion';

const QuizCompletion = ({ score, totalQuestions }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-6 text-center text-white"
    >
      <div className="text-4xl font-bold">Quiz Completed!</div>
      <div className="text-xl mt-2">Your Score: {score}/{totalQuestions}</div>
    </motion.div>
  );
};

export default QuizCompletion;
