import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('Displays required content', () => {
    render(<App />);
    const linkElement = screen.getByText(/crypto exchange/i);
    expect(linkElement).toBeInTheDocument();
  });
});