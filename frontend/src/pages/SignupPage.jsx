import React, { useState } from 'react';
import CustomInput from '../components/CustomInput.jsx';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { Link, useNavigate } from 'react-router';
import { validateEmail, validatePassword } from '../services/helper.js';
import axiosInstance from '../services/axiosInstance.js';
import { API_PATHS } from '../services/apiPaths.js';
import AuthLayout from '../layout/AuthLayout.jsx';
import { useTranslation } from 'react-i18next';

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useAuthContext();
  const { t } = useTranslation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError(t('auth.errors.enterName'));
      return;
    }
    if (!validateEmail(email)) {
      setError(t('auth.errors.invalidEmail'));
      return;
    }
    if (!validatePassword(password)) {
      setError(t('auth.errors.invalidPassword'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('auth.errors.passwordMismatch'));
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
        setError(t('auth.errors.generic'));
      }
    }
  };

  return (
    <AuthLayout>
      <div className="mt-10 flex h-auto flex-col justify-center md:mt-0 md:h-full lg:w-full">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t('auth.createAccount')}
        </h3>
        <p className="mt-[5px] mb-6 text-xs text-gray-700 dark:text-gray-400">
          {t('auth.signupSubtitle')}
        </p>
        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CustomInput
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label={t('auth.fullName')}
              placeholder={t('auth.yourName')}
              type="text"
            />
            <CustomInput
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label={t('auth.emailAddress')}
              placeholder="john@example.com"
              type="text"
            />
            <div className="col-span-2">
              <CustomInput
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label={t('auth.password')}
                placeholder={t('auth.password')}
                type="password"
              />
            </div>
            <div className="col-span-2">
              <CustomInput
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                label={t('auth.confirmPassword')}
                placeholder={t('auth.confirmPassword')}
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
            {t('auth.signUpButton')}
          </button>
          <p className="mt-3 text-[13px] text-gray-700 dark:text-gray-400">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link className="font-medium text-blue-600 underline" to="/login">
              {t('auth.loginLink')}
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignupPage;
