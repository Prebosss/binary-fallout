import Navbar from '../components/Navbar';
import backgroundImage from '../images/peakpx.jpg';

export default function About() {
  return (
    <div className="relative min-h-screen min-w-screen overflow-hidden font-theme fade-in">
      {/* Background Image with Blur */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(8px)', // This blurs the actual image
        }}
      />
      
      {/* Content Overlay with Backdrop Blur */}
      <div className="relative z-10 min-h-screen flex flex-col backdrop-blur-lg">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-green-300 text-shadow-lg pt-20">
          <h1 className="text-[4.5rem] font-bold mb-12">ERROR 404: EARTH NOT FOUND</h1>
          <p className="text-xl font-extrabold max-w-5xl text-center">
             The digital tapestry of our reality has frayed. A catastrophic anomaly, a rogue cascade of corrupted code, has fractured the Earth's simulation matrix. Landscapes flicker, time stutters, and the very fabric of existence threatens to unravel. Fortunately, a failsafe, a contingency protocol known as 'Project: ReGenesis,' has been activated. Before you lies the 'Oracle Deck,' a set of digital cards imbued with the essence of computational knowledge. Each draw summons a challenge, a riddle woven from the threads of computer science, categorized by suit and weighted by rank. Your mastery of algorithms, data structures, and computer architecture is the key to patching the fractured code, restoring equilibrium, and rewriting the Earth's destiny. The fate of our world rests on your ability to debug reality itself!
          </p>
        </main>
      </div>
    </div>
  );
}