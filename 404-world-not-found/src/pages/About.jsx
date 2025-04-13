import NavbarPublic from '../components/NavbarPublic';
import backgroundImage from '../images/peakpx.jpg';

export default function About() {
  return (
    <div className="relative min-h-screen min-w-screen overflow-hidden font-theme fade-in">
      {/* Background Image with Blur */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center vhs-overlays"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(8px)', // This blurs the actual image
        }}
      />
      <div className="vhs-overlay absolute inset-0"></div>
      {/* Content Overlay with Backdrop Blur */}
      <div className="relative z-10 min-h-screen flex flex-col backdrop-blur-lg">
        <NavbarPublic />
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-green-300 text-shadow-lg pt-20">
          <h1 className="text-[4.5rem] font-bold mb-12 text-green-500 font-theme font-bold text-shadow-lg vhs-shift italic"
          data-text="ERROR 404: EARTH NOT FOUND">ERROR 404: EARTH NOT FOUND</h1>
          <p className="text-lg font-normal font-mono max-w-5xl text-center">
          The digital tapestry of our reality has frayed. A catastrophic anomaly, a rogue cascade of corrupted code, has fractured the Earth's simulation matrix. Landscapes flicker, time stutters, and the very fabric of existence threatens to unravel. Amidst this apocalyptic chaos, a contingency protocol known as 'Project: ReGenesis' has been activated.

          You, a skilled student from UCF, armed with the knowledge from your Foundation Exam, stand as humanity's last hope. Before you lies the 'Knightmare Deck,' a set of digital cards imbued with the essence of computational knowledge. Each draw summons a challenge, a riddle woven from the threads of computer science, categorized by suit and weighted by rank. Your mastery of algorithms, data structures, and computer architecture is the key to patching the fractured code, restoring equilibrium, and rewriting the Earth's destiny.

          As you use your exam skills to debug reality itself, the fate of our world hinges on your ability to restore the very foundations of existence and reclaim a future once lost.          </p>
        </main>
      </div>
    </div>
  );
}