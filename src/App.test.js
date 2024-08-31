import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the input field and error message when no Pokémon is entered', () => {
  render(<App />);
  
  // Test if the input field is present
  expect(screen.getByPlaceholderText(/enter the pokémon/i)).toBeInTheDocument();

  // Test if the error message is displayed when the input is empty
  expect(screen.getByText(/please enter a pokémon name/i)).toBeInTheDocument();
});
