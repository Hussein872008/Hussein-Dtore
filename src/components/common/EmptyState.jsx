import React from 'react';
import { FiAlertCircle, FiSearch, FiPackage } from 'react-icons/fi';

const EmptyState = ({ title, message, action, actionText, icon, darkMode = false }) => {
  const getIcon = () => {
    if (icon) return <span className="text-4xl mb-4">{icon}</span>;

    if (title.toLowerCase().includes('error') || title.toLowerCase().includes('not found')) {
      return <FiAlertCircle className={`text-4xl mb-4 ${darkMode ? 'text-[#DA2B50]' : 'text-[#DA2B50]'}`} />;
    }
    if (title.toLowerCase().includes('search')) {
      return <FiSearch className={`text-4xl mb-4 ${darkMode ? 'text-[#A5A1A4]' : 'text-[#A5A1A4]'}`} />;
    }
    return <FiPackage className={`text-4xl mb-4 ${darkMode ? 'text-[#A5A1A4]' : 'text-[#A5A1A4]'}`} />;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${
        darkMode ? 'bg-[#1A1A1A]' : 'bg-white'
      }`}
    >
      {getIcon()}
      <h3 className={`text-xl font-medium mb-2 ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>{title}</h3>
      <p className={`mb-6 max-w-md ${darkMode ? 'text-[#A5A1A4]' : 'text-[#465542]'}`}>{message}</p>
      {action && (
        <button
          onClick={action}
          className={`px-4 py-2 rounded-lg transition-colors ${
            darkMode
              ? 'bg-[#C2B823] text-[#465542] hover:bg-[#ADA31B]'
              : 'bg-[#C2B823] text-[#465542] hover:bg-[#ADA31B]'
          }`}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
