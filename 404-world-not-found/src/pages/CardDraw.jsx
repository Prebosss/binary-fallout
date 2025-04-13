import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import backgroundImage from '../images/AdobeStock_831376640.jpeg';


const suits = {
  'S': '♠️',
  'H': '♥️',
  'D': '♦️',
  'C': '♣️'
};

const CardDraw = () => {
  const [card, setCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Check if there's a saved card in localStorage
    const savedCard = localStorage.getItem('currentCard');
    if (savedCard) {
      setCard(JSON.parse(savedCard));
    }
  }, []);

  const drawCard = () => {
    if (isDrawing) return;
    
    setIsDrawing(true);
    setIsFlipped(false);
    
    // Generate a random card
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const suitKeys = Object.keys(suits);
    
    const newRank = ranks[Math.floor(Math.random() * ranks.length)];
    const newSuit = suitKeys[Math.floor(Math.random() * suitKeys.length)];
    
    const newCard = {
      rank: newRank,
      suit: newSuit,
      id: `${newRank}${newSuit}`
    };
    
    // Save to localStorage
    localStorage.setItem('currentCard', JSON.stringify(newCard));
    
    setTimeout(() => {
      setCard(newCard);
      setIsFlipped(true);
      setIsDrawing(false);
    
      // Wait another 1.4 seconds before triggering the question modal
      setTimeout(() => {
        const event = new CustomEvent('cardDrawn', { detail: newCard });
        document.dispatchEvent(event);
      }, 1400); // 2s total delay = 600ms + 1400ms
    }, 600);
  };

  return (
    <div className="text-green-400 flex flex-col min-w-screen min-h-screen bg-cover font-theme"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Navbar at the top */}
      <Navbar />
  
      {/* Main content centered below the navbar */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 backdrop-blur-sm">
        <div className="mb-10 text-center">
          <h2 className="text-5xl mb-6 glitch-text">ORACLE DECK MAINFRAME</h2>
          <p className="text-md opacity-70 max-w-2xl mb-6">
            Draw a card to summon a challenge from the corrupted matrix. Correct answers repair the fractured code!
          </p>
        </div>
  
        <div className="relative w-64 h-96 mb-8">
          {card && (
            <motion.div 
              className="absolute inset-0 bg-gray-900 border-2 border-green-500 rounded-lg shadow-lg overflow-hidden"
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={{ duration: 0.6 }}
              style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div 
                  className={`text-6xl mb-2 ${card.suit === 'H' || card.suit === 'D' ? 'text-red-600' : 'text-white'}`}
                >
                  {suits[card.suit]}
                </div>
                <div className="text-7xl font-bold">{card.rank}</div>
              </div>
  
              {/* Card scanlines effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-400/5 to-transparent opacity-30"></div>
            </motion.div>
          )}
  
          {/* Card back */}
          <motion.div 
            className="absolute inset-0 bg-black border-2 border-green-500 rounded-lg flex items-center justify-center overflow-hidden"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
          >
            <div className="text-center relative z-10">
              <div className="text-xl mb-4 font-mono">ORACLE DECK</div>
              <div className="text-xs opacity-70">PROJECT: REGENESIS</div>
            </div>
  
            {/* Card back pattern */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-12 opacity-20 pointer-events-none">
              {Array(96).fill().map((_, i) => (
                <div key={i} className={`border border-green-500 ${Math.random() > 0.7 ? 'bg-green-500/20' : ''}`}></div>
              ))}
            </div>
          </motion.div>
        </div>
  
        <button 
          onClick={drawCard}
          disabled={isDrawing}
          className="px-8 py-3 bg-green-800 hover:bg-green-700 text-green-300 
                    font-mono rounded border border-green-600 transition-all 
                    hover:shadow-lg hover:shadow-green-900/50 focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDrawing ? 'Processing...' : 'Draw Card'}
        </button>
  
        <div className="mt-4 text-xs opacity-50 font-mono">
          {card ? `Last drawn: ${card.rank}${suits[card.suit]}` : 'No cards drawn yet'}
        </div>
      </div>
    </div>
  );
};

export default CardDraw;