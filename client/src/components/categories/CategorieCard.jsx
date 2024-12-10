import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CategorieCard = () => {
  const navigate = useNavigate();
  const categories = [
    { name: 'JavaScript', description: 'Test your knowledge about JavaScript and its features.', href: '/RandomQzPage/JavaScript' },
    { name: 'React', description: 'Answer questions related to React, its components, and hooks.', href: '/RandomQzPage/React' },
    {name:"Paython", description:"Answer questions related to Python,", href:"/RandomQzPage/Python"    },
    { name: 'MongoDB', description: 'Challenge your understanding of MongoDB and NoSQL databases.', href: '/RandomQzPage/MongoDB' },
    { name: 'Node.js', description: 'Test your knowledge of Node.js and its asynchronous nature.', href: '/RandomQzPage/nodejs' },
    { name: 'MERN Stack', description: 'Learn and challenge yourself on the MERN stack (MongoDB, Express, React, Node.js).', href: '/RandomQzPage/MERN Stack' },
    { name: 'IT', description: 'General questions related to IT concepts and technologies.', href: '/RandomQzPage/it' },
    { name: 'DSA', description: 'Test your understanding of data structures and algorithms.', href: '/RandomQzPage/DSA' },
  { name: 'TypeScript', description: 'Learn and challenge yourself on TypeScript and its features.', href: '/RandomQzPage/TypeScript' },
  { name: 'SQL', description: 'Test your knowledge of SQL and relational databases.', href: '/RandomQzPage/SQL' },
    { name: 'Sports', description: 'Test your knowledge about various sports.', href: '/RandomQzPage/sports' },
    { name: 'General Knowledge', description: 'Answer general knowledge questions from various fields.', href: '/RandomQzPage/general-knowledge' },
    { name: 'Science', description: 'Explore questions about physics, chemistry, and biology.', href: '/RandomQzPage/science' },
    { name: 'History', description: 'Challenge your history knowledge from different eras.', href: '/RandomQzPage/history' },
    { name: 'Music', description: 'How well do you know music and songs?', href: '/RandomQzPage/music' },
    { name: 'Movies', description: 'Trivia questions about movies and actors.', href: '/RandomQzPage/movies' },
   
  ];

  return (
    <div className="py-12 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
  <div className="max-w-screen-xl mx-auto px-6">
    <h1 className="text-5xl font-extrabold text-center text-white mb-10 drop-shadow-lg">
      Select Your Quiz Category
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
      {categories.map((category) => (
        <div key={category.name} className="relative bg-white rounded-lg shadow-xl overflow-hidden group transform hover:scale-105 transition-all duration-500">
          <Link to={category.href} className="block h-full">
            <div className="relative">
              <img
                src={`https://via.placeholder.com/400x250?text=${category.name}`}
                alt={category.name}
                className="w-full h-48 object-cover transition-transform transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-0 transition-opacity"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-semibold text-white drop-shadow-lg">{category.name}</h2>
                <p className="text-white mt-2 text-lg drop-shadow-lg">{category.description}</p>
              </div>
            </div>
            <div className="p-6 flex justify-center items-center">
              <button className="py-3 px-6 bg-indigo-600 text-white text-lg rounded-full transition-all transform group-hover:scale-110 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                Start Quiz
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default CategorieCard;
