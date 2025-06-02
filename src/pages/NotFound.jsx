import React from 'react';
import { useSelector } from 'react-redux';

const NotFound = () => {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center text-center p-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <button
        onClick={() => window.history.back()}
        className={`px-4 py-2 rounded ${
          darkMode
            ? 'bg-[#465542] hover:bg-[#3b482e] text-white'
            : 'bg-gray-800 hover:bg-gray-700 text-white'
        }`}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
