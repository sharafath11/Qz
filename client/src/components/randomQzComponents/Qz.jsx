import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BaseUrl } from '../../utils/services';
import QuizHeader from './QuizHeader';
import QuestionSection from './QuestionSection';
import Options from './Options';
import QuizCompletion from './QuizCompletion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { setUser } from '../../redux/userSlice';
import QzModal from '../QzModal';
import NoQuestionsPage from '../NoQuestionsPage';

export default function Qz({params}) {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [load, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); 
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    // This effect will run every time a new option is selected or the question number changes
    if (selectedOption !== null) {
      const currentQuestion = questions[questionNumber - 1];

      // Update the answers state
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId: currentQuestion._id, answer: selectedOption },
      ]);

      // If the answer is correct, increase the score
      if (selectedOption === currentQuestion.correct) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  }, [selectedOption, questionNumber]); // Dependency on selectedOption and questionNumber

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/Qz/randomQz`, {
        level: user.level, 
        cat: params
      });
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  function HandleBack() {
    navigate(`/RandomQzPage/${params}`);
  }

  const currentQuestion = questions[questionNumber - 1];

  const handleNextQuestion = async () => {
    if (!selectedOption) {
      setErrorMessage("Please select an answer to proceed.");
      return; 
    }

    // If it's the last question, set quiz as completed
    if (questionNumber === questions.length) {
      setQuizCompleted(true);
      await sendQuizResult();
      return;
    }

    setSelectedOption(null);
    setErrorMessage(""); 
    setQuestionNumber((prev) => prev + 1);
  };

  const sendQuizResult = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/Qz/submitQuiz`, {
        score,
        token,
        numberOfQuestions: questions.length
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (questions.length === 0) {
    return <NoQuestionsPage />;
  }

  return (
    load ? (
      <Loading />
    ) : (
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
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">{errorMessage}</div>
            )}
  
            <motion.div className="w-full">
              {questionNumber === questions.length ? (
                <motion.button
                  onClick={quizCompleted ? HandleBack : handleNextQuestion}
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
  
          {quizCompleted && (
            <QuizCompletion score={score} totalQuestions={questions.length} />
          )}
        </motion.div>
  
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Answer Details"
          className="modal bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white p-8 rounded-lg max-w-3xl mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <QzModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            questions={questions}
            answers={answers}
          />
        </Modal>
      </div>
    )
  );
}
