import { useState } from "react";
import { UserCircle, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import logo_image from "../assets/footer_logo.jpeg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (user) {
      await logout();
    }
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-100 shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-green-600 font-bold text-xl"
        >
          <img src={logo_image} alt="Logo" className="h-8 w-8" />
          <span className="hidden sm:inline">Wishlist</span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <UserCircle className="w-8 h-8 text-gray-600" />
          <span className="font-medium text-gray-800">
            {user?.username || "User"}
          </span>
          <button
            onClick={handleClick}
            className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {!user ? "Login" : "Logout"}
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute right-4 top-full mt-2 w-48 bg-white shadow-lg rounded-md px-4 py-3 z-50 border">
          <div className="flex items-center gap-2 mb-3">
            <UserCircle className="w-6 h-6 text-gray-600" />
            <span className="font-medium text-gray-800">
              {user?.username || "User"}
            </span>
          </div>
          <button
            onClick={handleClick}
            className="w-full text-left px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {!user ? "Login" : "Logout"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
