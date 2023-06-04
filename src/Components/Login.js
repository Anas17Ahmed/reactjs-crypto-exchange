import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ users, setIsLoggedIn, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginAttempts, setLoginAttempts] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const showToast = (type, message) => {
    // Implement toaster component to display messages
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Verify email and password
    const user = users.find((user) => user.email === email);
    if (user) {
      if (user.password === password) {
        // Successful login
        setErrorMessage('');
        // Display success message in toaster
        showToast('success', 'Login Successful');

        setIsLoggedIn(true);
        setCurrentUser(user);

        // Redirect to dashboard on successful login
        navigate('/dashboard');
      } else {
        // Incorrect password
        const attempts = loginAttempts[user.name] || 0;
        const updatedAttempts = attempts + 1;
        setLoginAttempts({ ...loginAttempts, [user.name]: updatedAttempts });
        if (updatedAttempts === 3) {
          // User blocked after 3 incorrect attempts
          setErrorMessage(`${user.name} is blocked`);
          setIsBlocked(true);
        } else {
          setErrorMessage('Incorrect password');
          // Display error message in toaster
          showToast('error', 'Incorrect password');
        }
      }
    } else {
      // User not found
      setErrorMessage('User not found');
    }
  };

  return (
    <div className="container">
      <h4>Login</h4>
      {errorMessage && <div className="error text-danger">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isBlocked}>Login</button>
      </form>
    </div>
  );
};

export default Login;