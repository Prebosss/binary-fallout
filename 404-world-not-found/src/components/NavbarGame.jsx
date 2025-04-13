// NavbarGame.jsx - For Card and Progress pages
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/login"; // Import the logout function

export default function NavbarGame() {
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting after logout
  const path = location.pathname;

  // Define which links should appear based on the current page
  const isCardPage = path === "/card";
  const isProgressPage = path === "/progress";
  
  const handleLogout = () => {
    // Call the logout function from your API
    logoutUser();
    console.log("Logged out successfully");
    // Redirect to login page after logout
    navigate('/');
  };

  return (
    <nav className="w-full flex justify-between items-center px-12 py-8 text-green-400 font-theme text-xl font-bold text-shadow-lg">
        <Link to="/" className="hover:underline">
            HOME
        </Link>
      <div className="flex space-x-6">
        {/* Show DRAW link except when on the card page */}
        {!isCardPage && (
          <Link to="/card" className="hover:underline">
            DRAW
          </Link>
        )}
        
        {/* Show INVENTORY link except when on the progress page */}
        {!isProgressPage && (
          <Link to="/progress" className="hover:underline">
            INVENTORY
          </Link>
        )}
        
        <button 
          onClick={handleLogout} 
          className="hover:underline cursor-pointer"
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
}