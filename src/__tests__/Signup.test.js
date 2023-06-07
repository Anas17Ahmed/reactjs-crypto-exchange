import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../Components/Signup';

describe('Signup Component', () => {
  test('Displays validation errors for empty fields', () => {
    render(
      <Router>
        <Signup users={[]} setUsers={() => { }} />
      </Router>);

    // Submit the form without entering any values
    fireEvent.click(screen.getByRole('button', { name: /signup/i }));

    // Check if validation errors are displayed for required fields
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
