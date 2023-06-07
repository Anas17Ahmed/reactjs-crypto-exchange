import { render, screen } from '@testing-library/react';
import Footer from '../Components/Layouts/Footer';

describe('Footer Component', () => {
  test('Displays required content', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/crypto exchange/i);
    expect(linkElement).toBeInTheDocument();
  });
});