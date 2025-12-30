import React, { useState } from 'react';
import CustomInput from '../components/CustomInput.jsx';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { Link, useNavigate } from 'react-router';
import { validateEmail, validatePassword } from '../services/helper.js';
import axiosInstance from '../services/axiosInstance.js';
import { API_PATHS } from '../services/apiPaths.js';
import AuthLayout from '../layout/AuthLayout.jsx';

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useAuthContext();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError('Please enter your name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a vald email adress.');
      return;
    }
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters, include uppercase, number, and special character.'
      );
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    // Signup API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError(null);
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="mt-10 flex h-auto flex-col justify-center md:mt-0 md:h-full lg:w-full">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create an Account
        </h3>
        <p className="mt-[5px] mb-6 text-xs text-gray-700 dark:text-gray-400">
          Join us today entring your details below
        </p>
        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CustomInput
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Your Name"
              type="text"
            />
            <CustomInput
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Adress"
              placeholder="john@example.com"
              type="text"
            />
            <div className="col-span-2">
              <CustomInput
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="col-span-2">
              <CustomInput
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                label="Confirm your Passwort"
                placeholder="Confirm password"
                type="password"
                autoComplete="off"
              />
            </div>
          </div>
          {error && <p className="pb-2.5 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            title="SignUp"
            className="btn"
            onClick={() => navigate('/login')}
          >
            SIGN UP
          </button>
          <p className="mt-3 text-[13px] text-gray-700 dark:text-gray-400">
            Already have an account?
            <Link className="font-medium text-blue-600 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignupPage;
