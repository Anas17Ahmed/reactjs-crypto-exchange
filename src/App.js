import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Blogs from './Blogs';

const App = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users') || '[]'));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn') || 'false'));

  // Load users data from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setIsLoggedIn(JSON.parse(isLoggedIn));
    }
  }, []);

  // Update localStorage whenever the users array changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [users, isLoggedIn]);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/login" element={<Login users={users} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup users={users} setUsers={setUsers} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* Add more routes for other pages */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;