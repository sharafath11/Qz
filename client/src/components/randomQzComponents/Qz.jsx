import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BaseUrl } from '../../apiConfig';
import QuizHeader from './QuizHeader';
import QuestionSection from './QuestionSection';
import Options from './Options';
import QuizCompletion from './QuizCompletion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { setUser } from '../../redux/userSlice';

export default function Qz() {
  const navigate = useNavigate();
  const [level] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [errorMessage, setErrorMessage] = useState(""); 
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/Qz/randomQz`, {
        params: {
          level: user.level
        }
      });
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
 function HandleBack(){
  navigate("/")
 }
  const currentQuestion = questions[questionNumber - 1];

  const handleNextQuestion = async () => {
    if (!selectedOption) {
      setErrorMessage("Please select an answer to proceed.");
      return;  // Don't proceed if no answer is selected
    }

    // Save the user's selected answer
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: currentQuestion._id, answer: selectedOption },
    ]);

    if (selectedOption === currentQuestion.correct) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedOption(null);
    setErrorMessage("");  // Clear the error message if the user selects an answer

    if (questionNumber === questions.length) {
      setQuizCompleted(true);
      await sendQuizResult();
      return;
    }

    setQuestionNumber((prev) => prev + 1);
  };

  const sendQuizResult = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/Qz/submitQuiz`, {
        score,
        token,
      });

      if (response.status === 200) {
        console.log("Quiz result submitted successfully");
        const updatedUser = response.data.user;

        dispatch(setUser({
          user: updatedUser,
          token: token, 
        }));
      }
    } catch (error) {
      console.error("Error submitting quiz result:", error);
    }
  };

  const checkAnswers = () => {
    setIsModalOpen(true); // Open the modal to show the answers
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md w-full"
      >
        <QuizHeader level={user.level} questionNumber={questionNumber} />
        <QuestionSection question={currentQuestion?.question} />
        <Options
          options={currentQuestion?.options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className="mt-6">
          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">
              {errorMessage}
            </div>
          )}

          <motion.div className="w-full">
            {questionNumber === questions.length ? (
              <motion.button
                onClick={quizCompleted?HandleBack:handleNextQuestion}  // Proceed to quiz completion
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Finish Quiz
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next Question
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Check Answers Button */}
        {quizCompleted && (
          <div className="mt-4">
            <motion.button
              onClick={checkAnswers}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Check Answers
            </motion.button>
          </div>
        )}

        {/* Quiz Completion */}
        {quizCompleted && <QuizCompletion score={score} totalQuestions={questions.length} />}
      </motion.div>

      {/* Modal to Display Answer Details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Answer Details"
        className="modal bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white p-8 rounded-lg max-w-3xl mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
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
      </Modal>
    </div>
  );
}
