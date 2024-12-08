import CategorieCard from "../components/CategorieCard";
import Header from "../components/Header";




export default function CategoriesPage() {
  return (
   <>
    <Header/>
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Quiz Categories</h1>
        <p className="text-lg text-gray-700 mb-12">Choose a category to start your quiz!</p>
        <CategorieCard/>
      </div>
    </div>
   </>

  );
}
