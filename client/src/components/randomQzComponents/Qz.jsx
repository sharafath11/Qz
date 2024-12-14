
import { useState, useEffect } from "react";
import { Card,CardContent,CardDescription,CardFooter,CardTitle,CardHeader, } from "../ui/Qz";
import Button from "../ui/button";
import Progress from "../ui/Progress";
import { CheckCircle2, XCircle, ArrowRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../Loading";
import { getRequest, postRequest } from "../../utils/services";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    correctAnswer: "Oxygen"
  }
];

const TIMER_DURATION = 60;

export default function QuizInterface() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [loading,setLoading]=useState(true);
  const [quizData,setQuizData]=useState([])

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(TIMER_DURATION);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResult(false);
    setTimeLeft(TIMER_DURATION);
  };

  useEffect(() => {
    document.body.className = "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500";
    return () => {
      document.body.className = "";
    };
  }, []);
useEffect(()=>{
 getData();

},[]);
 async function getData(){
  const data=postRequest("http://localhost:4000/Qz/randomQz/",{cat:null,level:"1"});
   console.log(data);
   setLoading(false)
 }
  useEffect(() => {
    if (!isAnswered && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsAnswered(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isAnswered, showResult, currentQuestion]);

  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  const timerProgress = (timeLeft / TIMER_DURATION) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {loading? <Loading/>:(<Card className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-white/20 backdrop-blur-sm border-b border-white/10">
          <CardTitle className="text-3xl font-bold text-center text-white">Cosmic Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <Progress value={progress} className="w-3/4 h-2" />
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-white/20"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="175.92"
                        strokeDashoffset={175.92 * (1 - timerProgress / 100)}
                        className="text-white"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Question {currentQuestion + 1} of {quizData.length}
                </p>
                <h2 className="text-2xl font-semibold mb-6 text-white">{quizData[currentQuestion].question}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      className={`h-auto py-4 px-6 text-left justify-start text-lg transition-all duration-300 transform hover:scale-105 ${
                        isAnswered && option === quizData[currentQuestion].correctAnswer
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : isAnswered && option === selectedAnswer
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-white/20 hover:bg-white/30 text-white"
                      }`}
                      disabled={isAnswered}
                    >
                      {option}
                      {isAnswered && option === quizData[currentQuestion].correctAnswer && (
                        <CheckCircle2 className="ml-auto h-5 w-5" />
                      )}
                      {isAnswered && option === selectedAnswer && option !== quizData[currentQuestion].correctAnswer && (
                        <XCircle className="ml-auto h-5 w-5" />
                      )}
                    </Button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h2>
                <p className="text-xl text-white mb-6">Your score: {score} out of {quizData.length}</p>
                <Button onClick={resetQuiz} className="bg-white text-purple-600 hover:bg-purple-100">
                  Restart Quiz
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        {!showResult && (
          <CardFooter className="flex justify-between items-center bg-white/10 backdrop-blur-sm border-t border-white/10">
            <p className="text-lg font-semibold text-white">Score: {score}</p>
            <Button 
              onClick={handleNextQuestion} 
              disabled={!isAnswered}
              className="bg-white text-purple-600 hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion === quizData.length - 1 ? "Finish" : "Next Question"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        )}
      </Card>)}
    </div>
  );
}
