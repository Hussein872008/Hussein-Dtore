import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiMenu } from 'react-icons/fi';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CategoryList = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCategoryPage = location.pathname.startsWith('/category/');
  const menuRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const colors = {
    background: darkMode ? 'bg-[#2D2D2D]' : 'bg-[#F5F2F4]',
    text: darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]',
    errorText: darkMode ? 'text-[#FF6B6B]' : 'text-[#DA2B50]',
    buttonBg: darkMode ? 'bg-[#C2B823]' : 'bg-[#C2B823]',
    buttonHover: darkMode ? 'hover:bg-[#A5A1A4]' : 'hover:bg-[#A5A1A4]',
    buttonText: darkMode ? 'text-[#F5F2F4]' : 'text-[#F5F2F4]',
    activeBg: darkMode ? 'bg-[#C2B823]' : 'bg-[#C2B823]',
    activeText: darkMode ? 'text-[#F5F2F4]' : 'text-[#F5F2F4]',
    hoverBg: darkMode ? 'hover:bg-[#3D3D3D]' : 'hover:bg-[#A5A1A4]',
    border: darkMode ? 'border-[#C2B823]' : 'border-[#C2B823]',
    menuBg: darkMode ? 'bg-[#2D2D2D]' : 'bg-[#F5F2F4]',
    menuBorder: darkMode ? 'border-[#3D3D3D]' : 'border-[#C2B823]',
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/category-list');
        if (Array.isArray(response.data) && response.data.every(item => typeof item === 'string')) {
          setCategories(response.data);
        } else {
          throw new Error('Invalid data format received from API');
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (error) {
    return (
      <div className={`${colors.background} p-4 rounded-lg shadow`}>
        <div className={`${colors.errorText} text-center p-4`}>{error}</div>
        <button
          onClick={() => window.location.reload()}
          className={`w-full mt-2 ${colors.buttonBg} ${colors.buttonText} py-2 rounded ${colors.buttonHover} transition-colors`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`${colors.background} p-4 rounded-lg shadow relative`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold ${colors.text}`}>Categories</h2>
        {isCategoryPage && (
          <Link
            to="/"
            className={`flex items-center text-sm text-[#C2B823] hover:${colors.text} transition-colors`}
          >
            <FiChevronLeft className="ml-1" />
            Back to Home
          </Link>
        )}

        <button
          className="md:hidden flex items-center text-[#C2B823] hover:${colors.text} transition-colors"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle Categories Menu"
        >
          <FiMenu size={24} />
        </button>
      </div>

      <div className="hidden md:flex flex-wrap gap-2">
        <Link
          to="/"
          onClick={() => window.location.reload()}
          className={`px-3 py-2 rounded ${location.pathname === '/'
              ? `${colors.activeBg} ${colors.activeText}`
              : `${colors.hoverBg} ${colors.text}`
            } transition-colors`}
        >
          All Products
        </Link>

        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category}`}
            className={`px-3 py-2 rounded ${location.pathname === `/category/${category}`
                ? `${colors.activeBg} ${colors.activeText}`
                : `${colors.hoverBg} ${colors.text}`
              } transition-colors`}
          >
            {category}
          </Link>
        ))}
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`md:hidden mt-2 ${colors.menuBg} rounded-lg shadow border ${colors.menuBorder} p-3 absolute left-4 right-4 z-40`}
        >
          <nav className="flex flex-col gap-2 max-h-64 overflow-y-auto">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`px-3 py-2 rounded ${location.pathname === '/'
                  ? `${colors.activeBg} ${colors.activeText}`
                  : `${colors.hoverBg} ${colors.text}`
                } transition-colors`}
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded ${location.pathname === `/category/${category}`
                    ? `${colors.activeBg} ${colors.activeText}`
                    : `${colors.hoverBg} ${colors.text}`
                  } transition-colors`}
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default CategoryList;