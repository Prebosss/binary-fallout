// src/pages/About.jsx
import Navbar from '../components/Navbar';
import backgroundImage from '../images/peakpx.jpg';


export default function About() {
  return (
     <div 
          className="min-h-screen min-w-screen backdrop-blur-sm bg-cover bg-center bg-fixed text-green-500 flex flex-col" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 backdrop-blur-sm text-shadow-lg">
        <h1 className="text-5xl font-bold mb-12 position">ERROR 404: EARTH NOT FOUND</h1>
        <p className="text-lg font-extrabold max-w-5xl text-center mt-10">
        The digital tapestry of our reality has frayed. A catastrophic anomaly, a rogue cascade of corrupted code, has fractured the Earth's simulation matrix. Landscapes flicker, time stutters, and the very fabric of existence threatens to unravel. Fortunately, a failsafe, a contingency protocol known as 'Project: ReGenesis,' has been activated. Before you lies the 'Oracle Deck,' a set of digital cards imbued with the essence of computational knowledge. Each draw summons a challenge, a riddle woven from the threads of computer science, categorized by suit and weighted by rank. Your mastery of algorithms, data structures, and computer architecture is the key to patching the fractured code, restoring equilibrium, and rewriting the Earth's destiny. The fate of our world rests on your ability to debug reality itself!</p>
      </main>
    </div>
  );
}