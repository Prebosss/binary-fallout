// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-w-screen bg-white text-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center min-w-full"> 
        <h1 className="text-4xl font-bold mb-6">🃏 404: World Not Found</h1>
        <p className="mb-8 text-lg">Restore the world, one card at a time.</p>
        <div className="flex flex-row gap-6">
            <button
            onClick={() => navigate('/game')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
            >
            Start Game
            </button>
            <button
            onClick={() => navigate('/about')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
            >
            Read More
            </button>
        </div>
      </div>
    </div>
  );
}