import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import CardDraw from './pages/CardDraw';
import QuestionModal from './components/QuestionModal';
import Progress from './pages/Progress';
import EndScreen from './pages/EndScreen';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import TestGemini from "./pages/TestGemini";

const App = () => {
  const [allCardsCollected, setAllCardsCollected] = useState(false);
  
  useEffect(() => {
    // Check if all cards have been collected
    const checkCollection = () => {
      const collection = JSON.parse(localStorage.getItem('cardCollection') || '[]');
      const totalCards = 40; // 4 suits × 10 ranks
      setAllCardsCollected(collection.length >= totalCards);
    };
    
    // Initial check
    checkCollection();
    
    // Listen for updates to the collection
    document.addEventListener('collectionUpdated', checkCollection);
    return () => {
      document.removeEventListener('collectionUpdated', checkCollection);
    };
  }, []);
  
  return (
    <Router>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test-gemini" element={<TestGemini />} />
          <Route path="/card" element={
            <>
              <CardDraw />
              <QuestionModal />
            </>
          } />
          <Route path="/progress" element={<Progress />} />
        </Routes>
        {/* End Screen - will show when all cards are collected */}
        {allCardsCollected && <EndScreen />}
    </Router>
  );
};

export default App;