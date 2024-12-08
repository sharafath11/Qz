import { Trophy, BookOpen, BarChart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1f2937] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-5xl font-bold text-center text-white mb-8">QuizMaster</h1>
        
        {/* Quiz Challenge Section */}
        <div className="bg-white shadow-xl rounded-lg">
          <div className="p-8">
            <h2 className="text-3xl text-center text-gray-800">Ready to Challenge Your Knowledge?</h2>
            <p className="text-center text-lg text-gray-600 mt-2">Test your skills across various topics!</p>
          </div>
          <div className="flex justify-center p-6">
            <Link to="/start-quiz">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-12 rounded-lg">
                Start Quiz
              </button>
            </Link>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Leaderboard Card */}
          <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-md">
            <div className="text-center p-6">
              <Trophy className="w-12 h-12 mx-auto text-yellow-500" />
              <h3 className="text-2xl text-gray-800 mt-4">Leaderboard</h3>
              <p className="text-gray-600 mt-2">See how you rank against other quiz masters!</p>
            </div>
          </div>

          {/* Topic Selection Card */}
          <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-md">
            <div className="text-center p-6">
              <BookOpen className="w-12 h-12 mx-auto text-green-500" />
              <h3 className="text-2xl text-gray-800 mt-4">Topic Selection</h3>
              <p className="text-gray-600 mt-2">Choose from a wide range of exciting topics!</p>
            </div>
          </div>

          {/* Performance Stats Card */}
          <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-md">
            <div className="text-center p-6">
              <BarChart className="w-12 h-12 mx-auto text-blue-500" />
              <h3 className="text-2xl text-gray-800 mt-4">Performance Stats</h3>
              <p className="text-gray-600 mt-2">Track your progress and improve your scores!</p>
            </div>
          </div>

          {/* Daily Challenges Card */}
          <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-md">
            <div className="text-center p-6">
              <Clock className="w-12 h-12 mx-auto text-red-500" />
              <h3 className="text-2xl text-gray-800 mt-4">Daily Challenges</h3>
              <p className="text-gray-600 mt-2">Take on new quizzes every day to boost your skills!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
