import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-12 py-8 text-green font-theme text-xl font-bold text-shadow-lg">
      <div className="font-bold tracking-widest">
        <Link to="/">HOME</Link>
      </div>
      <div className="flex space-x-6">
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
