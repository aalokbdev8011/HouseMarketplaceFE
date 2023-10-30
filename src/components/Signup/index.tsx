import React, { ChangeEvent, useEffect, useState } from 'react';
import { signup } from '../../Servicie/ApiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../ButtonLoader';

interface FormState {
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
}

const Signup: React.FC<FormState> = () => {
  const navigate = useNavigate();
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
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
      setSubmitBtnDisable(true);
      const data = {
        "user": {
          "name": formValue.name,
          "email": formValue.email,
          "password": formValue.password
        }
      }
      await signup(data).then((result) => {
        if (result) {
          toast.success(`${result.status.message}`);
          navigate('/signin')
        }
      });
      setSubmitBtnDisable(false);
    }
  };

  return (
    <div data-testid="signup-wrapper" className='flex h-[90.3vh] bg-gradient-to-r from-blue-300 to-cyan-700'>
      <div className="md:w-[500px] w-[85%] mx-auto flex items-center">
        <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full">
          <h2 className="text-2xl text-cyan-800 font-bold text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className='mb-3'>
                <input
                  name="name"
                  type="text"
                  placeholder='Name'
                  value={formValue.name}
                  onChange={handleChange}
                  className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className='mb-3'>

                <input
                  name="email"
                  type="email"
                  placeholder='Email'
                  value={formValue.email}
                  onChange={handleChange}
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className='mb-3'>

                <input
                  name="password"
                  type="password"
                  placeholder='Password'
                  value={formValue.password}
                  onChange={handleChange}
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}
              </div>
              <div className='mb-3'>

                <input
                  name="confirmPassword"
                  type="password"
                  placeholder='Confirm Password'
                  value={formValue.confirmPassword}
                  onChange={handleChange}
                  className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
              </div></div>
            <button
              name="Signup"
              type="submit"
              data-testid="signup-btn"
              aria-label="Submit"
              className="w-full bg-gradient-to-r from-blue-300 to-cyan-700 text-white p-2 rounded shadow-md hover:shadow-lg flex justify-center items-center"
              disabled={submitBtnDisable}
            >
              {submitBtnDisable ? <ButtonLoader /> : "Signup" }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
