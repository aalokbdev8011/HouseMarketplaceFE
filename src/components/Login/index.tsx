import React, { ChangeEvent, useEffect, useState } from 'react';
import { login } from '../../Servicie/ApiService';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../ButtonLoader';

interface FormState {
  email?: string,
  password?: string,
}

const Login: React.FC<FormState> = () => {
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
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormState>({
    email: '',
    password: '',
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

    setErrors({
      ...errors,
      [name]: error,
    });

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form

    let valid = true;
    const newErrors = { ...errors };
    if (!formValue.email) {
      valid = false;
      newErrors.email = 'Email is required';
    }
    if (!formValue.password) {
      valid = false;
      newErrors.password = 'Password is required';
    }

    if (!valid) {
      setErrors(newErrors);
    } else {
      setSubmitBtnDisable(true)
      const data = {
        "user": {
          "email": formValue.email,
          "password": formValue.password
        }
      }
      await login(data).then((result) => {
        if (result) {
          localStorage.setItem("user", JSON.stringify(result));
          localStorage.setItem("jwtToken", JSON.stringify("Bearer " + result.token))
          navigate('/')
        }
      });

    }
    setSubmitBtnDisable(false);

  };

  return (
    <div data-testid="login-wrapper" className='flex h-[90.3vh] bg-gradient-to-r from-blue-300 to-cyan-700'>
      <div className="md:w-[500px] w-[85%] mx-auto flex items-center">
        <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full">
          <h2 className="text-2xl text-cyan-800 font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className='mb-3'>

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
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
                  placeholder="Password"
                  value={formValue.password}
                  onChange={handleChange}
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}

              </div>
            </div>
            <button
              name="Login"
              type="submit"
              className="w-full bg-gradient-to-r from-blue-300 to-cyan-700 text-white p-2 rounded shadow-md hover:shadow-lg flex justify-center items-center"
              disabled={submitBtnDisable}
            >
              {submitBtnDisable ? <ButtonLoader /> : "Signin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
