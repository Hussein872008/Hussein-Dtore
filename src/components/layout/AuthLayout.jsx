import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? 'bg-[#1a1a1a] text-gray-100' : 'bg-gray-100 text-gray-900'
    }`}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;