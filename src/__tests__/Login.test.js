import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Components/Login';

describe('Login Component', () => {
  test('Displays validation errors for empty fields', () => {
    render(
      <Router>
        <Login users={[]} setIsLoggedIn={() => { }} setCurrentUser={() => { } }/>
      </Router>);

    // Submit the form without entering any values
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check if validation errors are displayed for required fields
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
