import React, { ChangeEvent, useEffect, useState } from 'react';
import { signup } from '../../Servicie/ApiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormState {
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
}

const Signup: React.FC<FormState> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check the user's authentication status
    const userString = localStorage.getItem("user");
    const isAuthenticated = !!userString;
    
    // If the user is already authenticated, redirect them to the home page
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);
  const [formValue, setFormValue] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let error = '';
    if (name === 'email' && !value.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      error = 'Invalid email format';
    }
    if (name === 'password' && value.length < 6) {
      error = 'Password must be at least 6 characters';
    }
    if (name === 'confirmPassword' && value !== formValue.password) {
      error = 'Passwords do not match';
    }

    setErrors({
      ...errors,
      [name]: error,
    });

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form
    let valid = true;
    const newErrors = { ...errors };
    if (!formValue.name) {
      valid = false;
      newErrors.email = 'Name is required';
    }
    if (!formValue.email) {
      valid = false;
      newErrors.email = 'Email is required';
    }
    if (!formValue.password) {
      valid = false;
      newErrors.password = 'Password is required';
    }
    if (!formValue.confirmPassword) {
      valid = false;
      newErrors.confirmPassword = 'Confirm password is required';
    }

    if (!valid) {
      setErrors(newErrors);
    } else {
      console.log(formValue);
      const data = {
        "user": {
          "name": formValue.name,
          "email": formValue.email,
          "password": formValue.password
        }
      }
      signup(data).then((result) => {
        if (result) {
          toast.success(`${result.status.message}`);
          localStorage.setItem("user", JSON.stringify(result.data));
          navigate('/signin')
        }
      });
    }
  };

  return (
    <div data-testid="signup-wrapper">
      <div className="w-1/3 mx-auto mt-5">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                name="name"
                type="text"
                placeholder='Name'
                value={formValue.name}
                onChange={handleChange}
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
              <input
                name="email"
                type="email"
                placeholder='Email'
                value={formValue.email}
                onChange={handleChange}
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
              <input
                name="password"
                type="password"
                placeholder='Password'
                value={formValue.password}
                onChange={handleChange}
                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
              <input
                name="confirmPassword"
                type="password"
                placeholder='Confirm Password'
                value={formValue.confirmPassword}
                onChange={handleChange}
                className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
              />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
            </div>
            <button
              name="Signup"
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
