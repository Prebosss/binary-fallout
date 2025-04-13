import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const suits = {
  'S': '♠️',
  'H': '♥️',
  'D': '♦️',
  'C': '♣️'
};

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const Progress = () => {
  const [collection, setCollection] = useState([]);
  const [totalCards] = useState(40); // 4 suits × 10 ranks
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const fetchCollection = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5001/api/cards/collection', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCollection(data.collection);
      } else {
        console.error('Error fetching collection:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching collection:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCollection();
    
    // Listen for updates to the collection
    const handleCollectionUpdated = () => {
      fetchCollection();
    };
    
    document.addEventListener('collectionUpdated', handleCollectionUpdated);
    return () => {
      document.removeEventListener('collectionUpdated', handleCollectionUpdated);
    };
  }, []);
  
  // Calculate progress percentage
  const progressPercentage = Math.round((collection.length / totalCards) * 100);
  
  // Generate all possible cards
  const allPossibleCards = [];
  Object.keys(suits).forEach(suit => {
    ranks.forEach(rank => {
      allPossibleCards.push({ suit, rank, id: `${rank}${suit}` });
    });
  });
  
  // Check if a card is in the collection
  const isCardCollected = (cardId) => {
    return collection.some(card => card.id === cardId);
  };

  // Navigate to draw card page
  const goToDrawCard = () => {
    navigate('/card');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-400 border-r-transparent"></div>
          <p className="mt-4">Loading matrix repair data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      {/* Add the Navbar component */}
      <Navbar />
      
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="max-w-4xl w-full">
          <header className="mb-8 text-center">
            <h2 className="text-2xl mb-2">MATRIX REPAIR PROGRESS</h2>
            <p className="text-sm opacity-70">
              Computational artifacts collected: {collection.length}/{totalCards}
            </p>
            
            <div className="mt-6 h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            
            <div className="flex justify-between text-xs mt-1">
              <span>0%</span>
              <span>{progressPercentage}% complete</span>
              <span>100%</span>
            </div>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {allPossibleCards.map(card => {
              const collected = isCardCollected(card.id);
              
              return (
                <motion.div
                  key={card.id}
                  className={`aspect-w-2 aspect-h-3 border rounded-md overflow-hidden relative ${
                    collected 
                      ? 'border-green-500 bg-green-900/20' 
                      : 'border-gray-700 bg-gray-900/50 grayscale opacity-40'
                  }`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <div className={`text-2xl ${(card.suit === 'H' || card.suit === 'D') && collected ? 'text-red-500' : ''}`}>
                      {suits[card.suit]}
                    </div>
                    <div className="text-xl font-bold mt-1">{card.rank}</div>
                    
                    {collected && (
                      <div className="absolute bottom-1 w-full text-center text-xs">
                        <span className="bg-green-900/70 px-2 py-0.5 rounded">SECURED</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent opacity-30 pointer-events-none"></div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Add the Draw Card button with the same styling as in CardDraw */}
          <div className="mt-8 text-center">
            <button 
              onClick={goToDrawCard}
              className="px-8 py-3 bg-green-800 hover:bg-green-700 text-green-300 
                      font-mono rounded border border-green-600 transition-all 
                      hover:shadow-lg hover:shadow-green-900/50 focus:outline-none"
            >
              Draw Cards
            </button>
          </div>
          
          <div className="mt-8 bg-black/50 border border-green-800 p-4 rounded-md text-sm">
            <h3 className="mb-2 text-lg">DEBUG LOG:</h3>
            <div className="space-y-1 opacity-70">
              {collection.length === 0 ? (
                <p>No computational artifacts collected yet. Begin by drawing cards from the Oracle Deck.</p>
              ) : (
                <>
                  <p>Computational artifacts collected in sequence:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {collection.map((card, index) => (
                      <div key={index} className="font-mono">
                        {`[${index + 1}] ${card.rank}${suits[card.suit]}`}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;