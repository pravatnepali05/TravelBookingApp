import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import logo from '../assets/Logo.png';
import { useAuth } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// NEW import
import CartIcon from "./Carticon";

const Navbar = () => {
  const isSignedIn = true; // only apply this if the user is signed in
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

 const handeRedirect = () => {
  if (auth?.user?.role === 'admin') {
    navigate('/admin'); // or /admin/dashboard 
  } else {
    navigate('/user');
  }
  closeDropdown();
};

  const handleSignOut = () => {
    setAuth({ user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success('Signed out successfully');
    closeDropdown();
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between w-full h-20 px-6 bg-white shadow">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-32" />
      </div>

      {/* Navigation links in the center */}
      <div className="hidden md:flex space-x-6">
        <a href="/" className="text-gray-800 hover:text-blue-500">Home</a>
        <a href="/contact" className="text-gray-800 hover:text-blue-500">Contact</a>
        <a href="/about" className="text-gray-800 hover:text-blue-500">About</a>
      </div>

      {/* User icon + Cart on the right */}
      <div className="relative flex items-center gap-6">
        {/* Cart Icon */}
        <CartIcon />

        {/* User dropdown */}
        <FaUser
          size={24}
          onClick={handleDropdownToggle}
          className="cursor-pointer text-gray-800"
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-10 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
            <ul>
              <li
                onClick={handeRedirect}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Your Profile
              </li>
              
              {auth?.user ? (
                <li
                  onClick={handleSignOut}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Sign Out
                </li>
              ) : (
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/login">Sign In</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
