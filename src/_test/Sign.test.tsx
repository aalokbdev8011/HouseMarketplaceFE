import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Signup from '../components/Signup';
import { act } from 'react-dom/test-utils';
import { toast } from 'react-toastify';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('../Servicie/ApiService.tsx', () => ({
    signup: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
    },
}));

const navigate = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

test('User navigates to Signup Page', () => {
    render(<Signup />);
    const divElement = screen.getByTestId('signup-wrapper');
    expect(divElement).toBeInTheDocument();
});

test('Renders form all elements', () => {
    render(<Signup />);
    // Check that the form elements are present
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
});

// test('handleSubmit should submit the form with valid data', async () => {
//     const { getByPlaceholderText, getByTestId } = render(<Signup />);
//     const nameInput = getByPlaceholderText('Name');
//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const confirmPasswordInput = getByPlaceholderText('Confirm Password');
//     const submitButton = getByTestId('signup-btn');

//     // Set form values
//     fireEvent.change(nameInput, { target: { value: 'John Doe' } });
//     fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });
//     fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

//     // Submit the form
//     fireEvent.click(submitButton);

//     act(() => {
//         fireEvent.click(submitButton);
//     });
//     expect(toast.success).toHaveBeenCalledWith('Successfully signed up');
//     expect(navigate).toHaveBeenCalledWith('/signin');
// });
