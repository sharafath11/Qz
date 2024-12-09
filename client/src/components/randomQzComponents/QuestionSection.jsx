

import React from 'react';
import { motion } from 'framer-motion';

const QuestionSection = ({ question }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-center mb-6 text-2xl font-bold text-white"
    >
      {question}
    </motion.div>
  );
};

export default QuestionSection;
