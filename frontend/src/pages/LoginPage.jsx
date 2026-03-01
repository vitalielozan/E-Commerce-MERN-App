import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput.jsx';
import { validateEmail } from '../services/helper.js';
import axiosInstance from '../services/axiosInstance.js';
import { API_PATHS } from '../services/apiPaths.js';
import { useAuthContext } from '../hooks/useAuthContext.js';
import AuthLayout from '../layout/AuthLayout.jsx';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(t('auth.errors.invalidEmail'));
      return;
    }
    if (!password) {
      setError(t('auth.errors.enterPassword'));
      return;
    }
    setError('');
    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
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
      <div className="flex h-3/4 flex-col justify-center md:h-full lg:w-[70%]">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {t('auth.welcomeBack')}
        </h3>
        <p className="mt-[5px] mb-6 text-xs text-gray-700 dark:text-gray-400">
          {t('auth.loginSubtitle')}
        </p>

        <form onSubmit={handleLogin}>
          <CustomInput
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label={t('auth.emailAddress')}
            placeholder="john@example.com"
            type="text"
          />
          <CustomInput
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label={t('auth.password')}
            placeholder={t('auth.minChars')}
            type="password"
          />
          {error && <p className="pb-2.5 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            title="Login"
            className="btn"
            onClick={() => navigate('/')}
          >
            {t('auth.login')}
          </button>
          <p className="mt-3 text-[13px] text-gray-700 dark:text-gray-400">
            {t('auth.noAccount')}{' '}
            <Link className="font-medium text-blue-600 underline" to="/signup">
              {t('auth.signUp')}
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
