import React from 'react';
import ThemeToggle from '../components/ThemeToggle.jsx';

function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="h-screen w-screen bg-gray-100/50 px-12 pb-12 pt-8 text-gray-900 dark:bg-gray-800/50 dark:text-gray-300 md:w-[60vw]">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">
          TV-Maxx
        </h3>
        <ThemeToggle />
        {children}
      </div>
      <div className="bg-auth-bg-img relative hidden h-screen w-[40vw] overflow-hidden bg-blue-100 bg-cover bg-center bg-no-repeat p-8 dark:bg-sky-900 md:block">
        <div className="absolute -left-5 -top-7 h-48 w-48 rounded-[40px] bg-blue-500" />
        <div className="absolute -right-10 top-[30%] h-56 w-48 rounded-[40px] border-[20px] border-cyan-600" />
        <div className="right-15 absolute top-[25%]">
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
