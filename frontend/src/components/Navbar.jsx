import { UserCircle } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import logo_image from "../assets/footer_logo.jpeg";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-md bg-gray-100">
      <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
        <Link to="/dashboard" className="flex flex-row gap-3">
          <img src={logo_image} alt="Logo" className="h-8 w-8" />
          <span>Wishlist</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <UserCircle className="w-8 h-8 text-gray-600" />
        <span className="font-medium text-gray-800">
          {user?.username || "User"}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
