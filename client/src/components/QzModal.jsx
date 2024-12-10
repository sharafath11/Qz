import React from 'react';

import { motion } from 'framer-motion';
const QzModal = ({ isModalOpen, closeModal, questions, answers }) => {
    console.log(isModalOpen, closeModal, questions, answers )
  return (
  
    <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-96 overflow-y-auto" 
        >
          <h2 className="text-3xl font-semibold mb-4">Your Answer Details</h2>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers.find((answer) => answer.questionId === question._id)?.answer;
              const isCorrect = userAnswer === question.correct;

              return (
                <div
                  key={index}
                  className={`p-4 bg-white bg-opacity-10 rounded-lg shadow-lg ${
                    isCorrect ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
                  }`}
                >
                  <h3 className="text-xl font-semibold">{question.question}</h3>
                  <div className="mt-2">
                    {question.options.map((option, i) => (
                      <div
                        key={i}
                        className={`p-2 mt-2 rounded-lg ${
                          userAnswer === option
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-gray-800 text-gray-300'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    {isCorrect ? (
                      <span className="text-green-400">✔ Correct</span>
                    ) : (
                      <span className="text-red-400">✘ Incorrect</span>
                    )}
                  </div>
                  {!isCorrect && (
                    <div className="mt-2 text-gray-400">
                      <span className="font-bold">Correct Answer:</span> {question.correct}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <motion.button
              onClick={closeModal}
              className="bg-green-500 text-white py-2 px-6 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
   
  );
};

export default QzModal;
