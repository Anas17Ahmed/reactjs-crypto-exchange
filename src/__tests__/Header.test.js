import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Components/Layouts/Header';

describe('Header Component', () => {
  test('Displays logged in content', () => {
    render(
      <Router>
        <Header isLoggedIn={true} setIsLoggedIn={() => { }} />
      </Router>
    );

    const dashboardLinkElement = screen.getByText(/dashboard/i);
    expect(dashboardLinkElement).toBeInTheDocument();

    const blogsLinkElement = screen.getByText(/blogs/i);
    expect(blogsLinkElement).toBeInTheDocument();

    const logoutLinkElement = screen.getByText(/logout/i);
    expect(logoutLinkElement).toBeInTheDocument();
  });

  test('Displays logged out content', () => {
    render(
      <Router>
        <Header isLoggedIn={false} setIsLoggedIn={() => { }} />
      </Router>
    );
    const loginLinkElement = screen.getByText(/login/i);
    expect(loginLinkElement).toBeInTheDocument();

    const signupLinkElement = screen.getByText(/signup/i);
    expect(signupLinkElement).toBeInTheDocument();
  });
});