import { Link } from 'react-router-dom';
import Header from '../components/Header';

const leaderboardData = [
  { rank: 1, name: 'John Doe', score: 1200 },
  { rank: 2, name: 'Jane Smith', score: 1150 },
  { rank: 3, name: 'Sam Brown', score: 1100 },
  { rank: 4, name: 'Alice Johnson', score: 1050 },
  { rank: 5, name: 'Michael Lee', score: 1000 },
];

export default function Leaderboard() {
  return (
   <>
   <Header/>
   <div className="min-h-screen bg-gray-100 py-8">
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
              {leaderboardData.map((player) => (
                <tr key={player.rank} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4 text-left text-indigo-600">{player.rank}</td>
                  <td className="py-3 px-4 text-left">{player.name}</td>
                  <td className="py-3 px-4 text-left">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
   </>
  );
}
