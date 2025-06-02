import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearchTerm } from '../../redux/slices/productsSlice';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar({ isMobile, toggleSearch }) {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.products.searchTerm);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const inputRef = useRef(null);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    if (!isMobile || (isMobile && toggleSearch)) {
      inputRef.current?.focus();
    }

    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        dispatch(setSearchTerm(localSearchTerm));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, dispatch, searchTerm, isMobile, toggleSearch]);

  const handleClear = () => {
    setLocalSearchTerm('');
    dispatch(clearSearchTerm());
    inputRef.current?.focus();
  };

  const colors = {
    light: {
      bg: '#F5F2F4',
      border: '#A5A1A4',
      text: '#465542',
      outline: '#C2B823',
      icon: '#465542',
      clear: '#DA2B50',
    },
    dark: {
      bg: '#1f1f1f',
      border: '#444',
      text: '#F5F2F4',
      outline: '#C2B823',
      icon: '#F5F2F4',
      clear: '#DA2B50',
    },
  };

  const theme = darkMode ? colors.dark : colors.light;

  if (isMobile && !toggleSearch) {
    return (
      <button onClick={toggleSearch} className="p-2" aria-label="Open search">
        <FaSearch className="h-6 w-6" style={{ color: theme.icon }} />
      </button>
    );
  }

  return (
    <div className="relative flex items-center w-full max-w-lg mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5" style={{ color: theme.icon }} />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for products..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 rounded-lg shadow-sm transition-all duration-200"
        style={{
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.bg,
          color: theme.text,
          outlineColor: theme.outline,
        }}
      />
      {localSearchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200"
          aria-label="Clear search"
          style={{ color: theme.clear }}
        >
          <FaTimes className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
