// NavbarPublic.jsx - For Home, About, and Login pages
import { Link } from "react-router-dom";

export default function NavbarPublic() {
  return (
    <nav className="w-full flex justify-between items-center px-12 py-8 text-green-400 font-theme text-xl font-bold text-shadow-lg">
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