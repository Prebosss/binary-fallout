import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import backgroundImage from '../images/AdobeStock_1373984100.jpeg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen min-w-screen bg-center bg-cover bg-fixed text-green-300 fade-in font-theme " 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="backdrop-blur-lg min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-[6rem] font-bold  text-shadow-lg italic">BINARY FALLOUT</h1>
          <p className="mb-8 text-2xl text-shadow-lg">Restore reality, one card at a time.</p>
          <div className="flex flex-row gap-6">
            <button
              onClick={() => navigate('/card')}
              className="border-2  px-6 py-3 rounded-lg shadow-lg cursor-pointer
"
            >
              Start Game
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border-2 px-6 py-3 rounded-lg shadow-lg cursor-pointer
"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}