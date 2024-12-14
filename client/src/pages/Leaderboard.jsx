import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { BaseUrl, getRequest } from '../utils/services';
import Loading from '../components/Loading';



export default function Leaderboard() {
  const [userDetails,setUserDetail]=useState();
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(`http://localhost:4000/user/leader-board`);
        setUserDetail(response);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchData();
    
  }, []);
  console.log(userDetails)
  return (
   <>
   <Header/>
   {loading?<Loading/>:<div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Leaderboard</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
            {userDetails.users.map((player, index) => (
  <tr key={index} className="border-b hover:bg-gray-100">
    <td className="py-3 px-4 text-left text-indigo-600">
      {index === 0 ? (
        <span role="img" aria-label="gold-trophy">
          🏆
        </span>
      ) : index === 1 ? (
        <span role="img" aria-label="silver-trophy">
          🥈
        </span>
      ) : index === 2 ? (
        <span role="img" aria-label="bronze-trophy">
          🥉
        </span>
      ) : (
        index + 1
      )}
    </td>
    <td className="py-3 px-4 text-left">{player.name}</td>
    <td className="py-3 px-4 text-left">{player.correctAnswer}</td>
    </tr>
              ))}


            </tbody>
          </table>
        </div>
      </div>
    </div>}
   </>
  );
}
