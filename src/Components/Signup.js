import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ users, setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [cnic, setCnic] = useState('');

  const [errors, setErrors] = useState({ name: '', email: '', password: ''});

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCnicChange = (e) => {
    // Handle file upload and set cnic state
    setCnic(e.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate fields
    // Reset errors
    setErrors({});

    // Validate fields
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (email.trim() === '') {
      errors.email = 'Email is required';
    }

    if (password.trim() === '') {
      errors.password = 'Password is required';
    }

    // Add additional field validations as per your requirements

    // If there are errors, update the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Create user object
    const newUser = {
      name,
      email,
      password,
      address,
      cnic,
      coins: []
    };
    
    // Add new user to the array of users
    const updatedUsers = [...users, newUser];

    // Update the users state with the updated array
    setUsers(updatedUsers);

    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setCnic('');

    // Redirect to login page after successful signup
    navigate('/login');
  };

  return (
    <div className="container">
      <h4>Signup</h4>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={handleNameChange} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={handleEmailChange} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" value={address} onChange={handleAddressChange} />
        </div>
        <div className="form-group">
          <label>Upload CNIC (PDF File supported only)</label>
          <input type="file" accept="application/pdf" className="form-control" value={cnic} onChange={handleCnicChange} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
