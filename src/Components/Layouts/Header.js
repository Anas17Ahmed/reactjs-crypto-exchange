import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    // Implement logout functionality
    e.preventDefault();
    setIsLoggedIn(false);

    // Redirect to login on successful logout
    navigate('/login');
  };

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate(isLoggedIn ? '/dashboard' : 'login');
    }
  }, []);

  return (
    <header className="container py-4">
      <nav>
        <ul className="nav">
          {isLoggedIn && <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>}
          {isLoggedIn && <li className="nav-item">
            <Link to="/blogs" className="nav-link">Blogs</Link>
          </li>}
          {isLoggedIn && <li className="nav-item">
            <Link to="/logout" className="nav-link" onClick={handleLogout}>Logout</Link>
          </li>} 
          {!isLoggedIn && <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>}
          {!isLoggedIn && <li className="nav-item">
            <Link to="/signup" className="nav-link">Signup</Link>
          </li>}
          {/* <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
