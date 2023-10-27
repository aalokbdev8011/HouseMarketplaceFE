import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Details from './pages/Details';
import Favorites from './pages/Favorites';

function App() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <BrowserRouter>
      <div data-testid="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel-details/:id" element={<Details />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          {/* Conditionally open the /create-properties route for admin users */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <ToastContainer />
      </div>

    </BrowserRouter>
  );
}

export default App;
