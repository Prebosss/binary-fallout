import { useNavigate } from 'react-router-dom';
import NavbarPublic from '../components/NavbarPublic';
import backgroundImage from '../images/character.webp';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen min-w-screen bg-center bg-cover bg-fixed text-green-300 fade-in font-theme relative overflow-hidden" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* VHS effect */}
      <div className="vhs-overlay absolute inset-0"></div>

      <div className="backdrop-blur-lg min-h-screen flex flex-col relative z-10">
        <NavbarPublic />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 
            className="text-[6rem] font-bold italic text-shadow-lg vhs-shift" 
            data-text="BINARY FALLOUT"
          >
            BINARY FALLOUT
          </h1>
          <p className="mb-8 text-lg font-semibold text-shadow-lg font-mono">Restore the foundations of reality, one challenge at a time.

</p>
          <div className="flex flex-row gap-6">
            <button
              onClick={() => navigate('/card')}
              className="border-2  px-6 py-3 rounded-lg shadow-lg cursor-pointer font-mono hover:shadow-xl hover:shadow-green-900/50 ease-in duration-200"
            >
              Try it out
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border-2 px-6 py-3 rounded-lg shadow-lg cursor-pointer font-mono hover:shadow-xl hover:shadow-green-900/50 ease-in duration-200"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
