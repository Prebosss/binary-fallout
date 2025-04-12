import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EndScreen = () => {
  const [showScreen, setShowScreen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const navigate = useNavigate();
  
  const fullText = `> PROJECT: REGENESIS COMPLETE
> SIMULATION PARAMETERS RESTORED
> REALITY MATRIX STABILIZED
> TIMELINE INTEGRITY: 99.8%
> INITIALIZATION OF NEW EPOCH AUTHORIZED

Congratulations, Operator. Your expertise in computational theory has saved our fractured world. The digital tapestry has been rewoven, the anomalies corrected, and the cascade halted. Time flows normally once again.

The Oracle Deck returns to its dormant state, its purpose fulfilled.

But the code speaks of new vulnerabilities on the horizon...

Our world may need your skills again someday.`;

  useEffect(() => {
    // Check if all cards have been collected
    const collection = JSON.parse(localStorage.getItem('cardCollection') || '[]');
    const allCards = 40; // 4 suits × 10 ranks
    
    if (collection.length >= allCards) {
      setShowScreen(true);
      
      // Typing effect
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(prevText => prevText + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, []);
  
  const handleRestart = () => {
    // Clear localStorage
    localStorage.removeItem('cardCollection');
    localStorage.removeItem('currentCard');
    
    // Redirect to home page
    navigate('/');
  };
  
  if (!showScreen) {
    return null;
  }
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full max-w-3xl mx-auto font-mono">
        <div className="mb-10">
          <motion.h1 
            className="text-4xl md:text-6xl text-green-400 text-center mb-2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            SIMULATION RESTORED
          </motion.h1>
          
          <motion.div 
            className="h-1 bg-green-500 w-full opacity-70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </div>
        
        <div className="bg-black border-2 border-green-700 rounded-lg p-6 min-h-96 shadow-lg shadow-green-900/30 relative overflow-hidden">
          {/* Terminal text */}
          <pre className="text-green-400 whitespace-pre-wrap text-sm md:text-base">
            {typedText}
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
          </pre>
          
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-green-500/1 via-green-500/3 to-green-500/1 animate-scanline"></div>
          
          {/* CRT effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-green-500/10 to-transparent opacity-30"></div>
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8 }}
        >
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-green-800 hover:bg-green-700 text-green-300 
                     font-mono rounded-md border border-green-600 transition-all 
                     hover:shadow-lg hover:shadow-green-900/50 focus:outline-none"
          >
            INITIALIZE NEW SIMULATION
          </button>
          
          <p className="text-green-500 mt-4 text-sm opacity-70">
            Warning: This will reset all progress and clear your collection.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EndScreen;