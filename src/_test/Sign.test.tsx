import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Signup from '../components/Signup';

test('User navigates to Signup Page', () => {
    render(<Signup />);
    const divElement = screen.getByTestId('signin-wrapper');
    expect(divElement).toBeInTheDocument();
});

test('Renders form all elements', () => {
    render(<Signup />);
    // Check that the form elements are present
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('lastName')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
});

test('displays validation errors', () => {
    render(<Signup />);
    const submitButton = screen.getByText('Signup');
  
    fireEvent.click(submitButton);
  
    // You can assert that error messages are displayed for the respective fields
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    // Add more assertions for other validation errors
  });