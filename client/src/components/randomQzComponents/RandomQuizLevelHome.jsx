
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Brain, Zap, CheckCircle } from "lucide-react";
import StatsCard from "./StatsCard";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RandomQuizLevelHome() {
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.user.user);
  const parsms=useParams();
  

 
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  {console.log(parsms.cat)}
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          Quiz Master
        </h1>

        <div className="relative w-64 h-64 mx-auto mb-8">
  <svg className="w-full h-full" viewBox="0 0 100 100">
    <circle
      className="text-purple-300 opacity-20"
      strokeWidth="8"
      stroke="currentColor"
      fill="transparent"
      r="44"
      cx="50"
      cy="50"
    />
    <motion.circle
      initial={{ pathLength: 0 }}
      animate={{
        pathLength: user.level / 100,
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="text-indigo-500"
      strokeWidth="8"
      strokeLinecap="round"
      stroke="currentColor"
      fill="transparent"
      r="44"
      cx="50"
      cy="50"
    />
  </svg>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="text-6xl font-bold text-white mb-1"
    >
      {user.level}
    </motion.div>
    <div className="text-indigo-200 text-xl font-semibold">Level</div>
  </div>
</div>


<div className="grid grid-cols-3 gap-4 mb-8">
  <StatsCard 
    icon={<CheckCircle className="w-6 h-6" />} 
    value={user.quizHistory
      .length*20}
    label="Questions Attended" 
  />
  <StatsCard 
    icon={<Brain className="w-6 h-6" />} 
    value={user.correctAnswer} 
    label="Correct Answers" 
  />
<StatsCard 
  icon={<Zap className="w-6 h-6" />} 
  value={user.wrongAnswer} // Dynamic value for wrong answers
  label="Wrong Answers" 
/>


</div>


        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
        >
         <Link to={`/RandomQz-start/${parsms.cat}`}>Start Next Quiz</Link>

            
          
        </motion.button>
      </motion.div>
    </div>
  );
}

