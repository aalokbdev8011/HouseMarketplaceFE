import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  email: string;
  name: string
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  const getFirstLetter = (email: string) => {
    return email ? email[0].toUpperCase() : '';
  };

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");

    // Use navigate function to navigate to the home page
    navigate("/");
  };

  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">House Market Place</Link>

        {user ? (
          <div className="flex justify-center items-center">
            
            <nav className="space-x-4">
              <Link to="/favorites" className="text-white hover:text-blue-300">Favorites</Link>
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <p className='ml-2 text-green-500'>Welcome, {user.name}</p>
            <div className="rounded-full w-12 h-12 bg-blue-300 flex items-center justify-center text-white text-2xl font-bold ml-3">
              {getFirstLetter(user.email)}
            </div>
          </div>
        ) : (
          <div>
            <nav className="space-x-4">
              <Link to="/signin" className="text-white hover:text-blue-300">Sign in</Link>
              <Link to="/signup" className="text-white hover:text-blue-300">Sign up</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
