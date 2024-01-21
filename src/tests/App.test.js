import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders App', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const heading = screen.getByText(/Ad Free Wordle/i);
  expect(heading).toBeInTheDocument();
});
