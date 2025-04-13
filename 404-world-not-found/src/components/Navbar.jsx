import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  // Define which links should appear based on the current page
  const isHome = path === "/";
  const isCardPage = path === "/card";
  const isProgressPage = path === "/progress";

  return (
    <nav className="w-full flex justify-between items-center px-12 py-8 text-green-400 font-theme text-xl font-bold text-shadow-lg">
      <div className="font-bold tracking-widest">
        <Link to="/">HOME</Link>
      </div>
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
        
        {/* Keep the ABOUT and LOGIN links from your original navbar */}
        <Link to="/about" className="hover:underline">
          ABOUT
        </Link>
        <Link to="/login" className="hover:underline">
          LOGIN
        </Link>
      </div>
    </nav>
  );
}