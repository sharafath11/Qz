import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoQuestionsPage = () => {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold">Oops! No Questions Available</h1>
        <p className="text-lg">It seems like there are no questions available at the moment. Please check back later.</p>
        <div className="mt-6">
        <button
  onClick={() => navigate("/categories")}
  className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-6 rounded-full transition duration-300"
>
  Go Categories Select Different One 😀
</button>

        </div>
      </div>
      <div className="mt-10">
        <img 
          src="https://t3.ftcdn.net/jpg/01/01/89/46/360_F_101894688_RVSZUtDfPR6Cr5eBDQI7Qo5pZ01jmyK3.jpg" 
          alt="No questions illustration"
          className="w-72 h-72 object-cover rounded-full mx-auto"
        />
      </div>
    </div>
  );
};

export default NoQuestionsPage;
