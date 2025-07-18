import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game status', () => {
  render(<App />);
  const statusElement = screen.getByText(/Current Player: P1/i);
  expect(statusElement).toBeInTheDocument();
});
