import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const divElement = screen.getByTestId('app');
  expect(divElement).toBeInTheDocument();
});
