import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock questions based on card suits
const questionDatabase = {
  'S': [ // Spades - Algorithms
    {
      question: "What is the time complexity of a binary search?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
      correctAnswer: 2 // index of correct option
    },
    {
      question: "Which sorting algorithm has the best average-case performance?",
      options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"],
      correctAnswer: 2
    }
  ],
  'H': [ // Hearts - Data Structures
    {
      question: "Which data structure operates on a LIFO basis?",
      options: ["Queue", "Stack", "Linked List", "Binary Tree"],
      correctAnswer: 1
    },
    {
      question: "What is the primary advantage of a hash table?",
      options: ["Ordered keys", "O(1) average lookup", "Memory efficiency", "Sequential access"],
      correctAnswer: 1
    }
  ],
  'D': [ // Diamonds - Systems 
    {
      question: "What is a deadlock in operating systems?",
      options: ["A process that consumes too much memory", "When multiple processes are waiting for each other to release resources", "A security vulnerability", "An infinite loop in the code"],
      correctAnswer: 1
    },
    {
      question: "What does RAID stand for?",
      options: ["Random Array of Independent Disks", "Redundant Array of Independent Disks", "Rapid Access for Internal Drives", "Remote Access for Input Devices"],
      correctAnswer: 1
    }
  ],
  'C': [ // Clubs - Networking
    {
      question: "Which protocol is connectionless?",
      options: ["TCP", "HTTP", "UDP", "FTP"],
      correctAnswer: 2
    },
    {
      question: "Which layer of the OSI model deals with routing?",
      options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
      correctAnswer: 2
    }
  ]
};

const QuestionModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    // Listen for the cardDrawn event
    const handleCardDrawn = (event) => {
      const card = event.detail;
      setCurrentCard(card);
      showQuestionForCard(card);
    };

    document.addEventListener('cardDrawn', handleCardDrawn);
    return () => {
      document.removeEventListener('cardDrawn', handleCardDrawn);
    };
  }, []);

  const showQuestionForCard = (card) => {
    // Get a random question for the card's suit
    const suitQuestions = questionDatabase[card.suit];
    if (suitQuestions) {
      const randomIndex = Math.floor(Math.random() * suitQuestions.length);
      setCurrentQuestion(suitQuestions[randomIndex]);
      setSelectedOption(null);
      setFeedback(null);
      setIsVisible(true);
    }
  };

  const checkAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setFeedback({
        isCorrect: true,
        message: "Correct! Matrix repair sequence initiated."
      });
      
      // Add card to collection in localStorage
      const collection = JSON.parse(localStorage.getItem('cardCollection') || '[]');
      if (!collection.some(card => card.id === currentCard.id)) {
        collection.push(currentCard);
        localStorage.setItem('cardCollection', JSON.stringify(collection));
      }
      
      // Trigger an event for the Progress component to update
      document.dispatchEvent(new CustomEvent('collectionUpdated'));
    } else {
      setFeedback({
        isCorrect: false,
        message: "Incorrect. Matrix instability detected."
      });
    }
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && currentQuestion && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="w-full max-w-2xl bg-gray-900 border-2 border-green-500 p-6 rounded-lg shadow-lg shadow-green-500/20 mx-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="text-green-400 font-mono">
              <div className="text-xs mb-6 opacity-50 flex justify-between">
                <span>PROTOCOL: DEBUGGING REALITY</span>
                <span>CARD: {currentCard?.rank}{currentCard?.suit}</span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl mb-2">SYSTEM QUERY:</h3>
                <p className="text-lg">{currentQuestion.question}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectedOption === null && checkAnswer(index)}
                    className={`w-full text-left p-3 border rounded-md transition-all ${
                      selectedOption === null
                        ? 'border-green-700 hover:border-green-500 hover:bg-green-900/30'
                        : selectedOption === index
                          ? currentQuestion.correctAnswer === index
                            ? 'border-green-500 bg-green-900/50'
                            : 'border-red-500 bg-red-900/50'
                          : currentQuestion.correctAnswer === index && selectedOption !== null
                            ? 'border-green-500 bg-green-900/50'
                            : 'border-gray-700 opacity-50'
                    }`}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-center">
                      <span className="mr-2 opacity-70">{index + 1}.</span>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
              
              {feedback && (
                <motion.div
                  className={`p-4 rounded-md mb-6 ${
                    feedback.isCorrect ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-center">{feedback.message}</p>
                </motion.div>
              )}
              
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-green-800 hover:bg-green-700 text-green-300 
                           rounded border border-green-600 transition-all focus:outline-none"
                >
                  Close Terminal
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionModal;