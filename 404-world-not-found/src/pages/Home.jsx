import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import backgroundImage from '../images/peakpx.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen min-w-screen bg-cover bg-center bg-fixed text-green-500 fade-in" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="backdrop-blur-xs min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-6 text-shadow-lg">Binary Fallout</h1>
          <p className="mb-8 text-lg text-shadow-lg">Restore the world, one card at a time.</p>
          <div className="flex flex-row gap-6">
            <button
              onClick={() => navigate('/card')}
              className="border-2  px-6 py-3 rounded-lg shadow-lg"
            >
              Start Game
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border-2 px-6 py-3 rounded-lg shadow-lg"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}