import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const CategorieCard = () => {
  const navigate=useNavigate()
    const categories = [
        { name: 'Sports', description: 'Test your knowledge about various sports.', href: '/RandomQzPage/sports' },
        { name: 'General Knowledge', description: 'Answer general knowledge questions from various fields.', href: '/quiz/general-knowledge' },
        { name: 'Science', description: 'Explore questions about physics, chemistry, and biology.', href: '/quiz/science' },
        { name: 'History', description: 'Challenge your history knowledge from different eras.', href: '/quiz/history' },
        { name: 'Music', description: 'How well do you know music and songs?', href: '/quiz/music' },
        { name: 'Movies', description: 'Trivia questions about movies and actors.', href: '/quiz/movies' },
      ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {categories.map((category) => (
      <div key={category.name} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
        <Link to={category.href} className="block">
          <img
            src={`https://via.placeholder.com/400x250?text=${category.name}`}
            alt={category.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900">{category.name}</h2>
            <p className="text-gray-600 mt-2">{category.description}</p>
            <button className="mt-4 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"  >
              Start Quiz
            </button>
          </div>
        </Link>
      </div>
    ))}
  </div>
  )
}

export default CategorieCard