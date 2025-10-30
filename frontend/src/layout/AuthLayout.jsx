import React from 'react';
import ThemeToggle from '../components/ThemeToggle.jsx';

function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="h-screen w-screen bg-gray-100/50 px-12 pt-8 pb-12 text-gray-900 md:w-[60vw] dark:bg-gray-800/50 dark:text-gray-300">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">
          TV-Maxx
        </h3>
        <ThemeToggle />
        {children}
      </div>
      <div className="bg-auth-bg-img relative hidden h-screen w-[40vw] overflow-hidden bg-blue-100 bg-cover bg-center bg-no-repeat p-8 md:block dark:bg-sky-900">
        <div className="absolute -top-7 -left-5 h-48 w-48 rounded-[40px] bg-blue-500" />
        <div className="absolute top-[30%] -right-10 h-56 w-48 rounded-[40px] border-20 border-cyan-600" />
        <div className="absolute top-[25%] right-15">
          <h1 className="text-3xl font-semibold">
            Shop TV Online Store! Buying a new TV can be an easy experience with
            us.
          </h1>
        </div>
        <div className="absolute -bottom-7 -left-5 h-56 w-48 rounded-[40px] bg-sky-700" />

        <img
          src="./card2.jpg"
          alt="Grafic Trend"
          className="absolute bottom-20 w-56 rounded-xl shadow-lg shadow-blue-400/15 lg:w-[90%]"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
