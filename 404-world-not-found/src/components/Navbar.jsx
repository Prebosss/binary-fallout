import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-12 py-8 text-green font-theme text-xl">
      <div className="font-bold tracking-widest">
        <Link to="/">Binary Fallout</Link>
      </div>
      <div className="flex space-x-6">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/test-gemini" className="hover:underline">
          Test Gemini
        </Link>
      </div>
    </nav>
  );
}
