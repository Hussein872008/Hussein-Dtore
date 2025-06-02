import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaHeart, FaSignOutAlt, FaSearch, FaMoon, FaSun, FaEnvelope } from 'react-icons/fa';
import SearchBar from '../search/SearchBar';
import { useAuth } from '../../context/authContext';
import { selectCartItems } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { clearCart } from '../../redux/slices/cartSlice';
import { clearFavorites } from '../../redux/slices/favoritesSlice';
import { toggleDarkMode } from '../../redux/slices/themeSlice';

export default function Navbar() {
  const { items } = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites?.items || []);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const uniqueProductsCount = cartItems.length;
  const favoritesCount = favorites.length;

  const showSearchBar = !['/cart', '/checkout', "/favorites", "/contact"].includes(pathname);

  const colors = {
    primary: darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]',
    primaryHover: darkMode ? 'hover:text-[#F5F2F4cc]' : 'hover:text-[#465542cc]',
    yellow: 'text-[#C2B823]',
    yellowHover: 'hover:text-[#a0a21a]',
    pink: 'text-[#DA2B50]',
    pinkHover: 'hover:text-[#a6213f]',
    gray: darkMode ? 'text-[#D1D1D1]' : 'text-[#A5A1A4]',
    grayHover: darkMode ? 'hover:text-[#F5F2F4]' : 'hover:text-[#7a7779]',
    red: 'text-[#DA2B50]',
    redHover: 'hover:text-[#a6213f]',
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileSearch(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const cancelLogout = () => setShowLogoutModal(false);

  const confirmLogout = async () => {
    try {
      await logout();
      dispatch(clearCart());
      dispatch(clearFavorites());
      setUserMenuOpen(false);
      setShowLogoutModal(false);
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  const getInitials = (user) => {
    if (!user) return '';
    if (user.displayName) {
      return user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return '';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch);

  return (
    <>
      <nav className={`${darkMode ? 'bg-[#1A1A1A]' : 'bg-[#F5F2F4]'} shadow px-6 py-4 sticky top-0 z-50`}>
        {isMobile ? (
<>
  <div className="flex justify-center mb-2">
    <a
      href="/"
      className={`${colors.primary} font-bold text-2xl transition ${
        pathname === '/' ? colors.primaryHover + ' font-extrabold' : colors.primaryHover
      }`}
    >
      🛍️ Hussein's Shop
    </a>
  </div>

  <div className="flex justify-around items-center mb-2">
    {showSearchBar && (
      <button
        onClick={toggleMobileSearch}
        aria-label="Search"
        className={`${colors.primaryHover} text-2xl p-2`}
      >
        <FaSearch />
      </button>
    )}

    <Link
      to="/cart"
      className={`relative ${colors.gray} transition ${
        pathname === '/cart' ? colors.yellow : ''
      } hover:text-[#a0a21a] font-semibold text-2xl`}
      aria-label="Cart"
    >
      <FaShoppingCart />
      {uniqueProductsCount > 0 && (
        <span className="absolute -top-3 -right-3 bg-[#C2B823] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {uniqueProductsCount}
        </span>
      )}
    </Link>

    <Link
      to="/favorites"
      className={`relative ${colors.gray} transition ${
        pathname === '/favorites' ? colors.pink : ''
      } hover:text-[#a6213f] font-semibold text-2xl`}
      aria-label="Favorites"
    >
      <FaHeart />
      {favoritesCount > 0 && (
        <span className="absolute -top-3 -right-3 bg-[#DA2B50] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {favoritesCount}
        </span>
      )}
    </Link>

    <Link
      to="/contact"
      className={`relative ${colors.gray} transition ${
        pathname === '/contact' ? colors.primary : colors.grayHover
      } font-semibold text-2xl`}
      aria-label="Contact"
    >
      <FaEnvelope />
    </Link>

    {user ? (
      <div className="relative user-menu">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="bg-[#C2B823] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold cursor-pointer select-none"
          aria-label="User menu"
          aria-expanded={userMenuOpen}
        >
          {getInitials(user)}
        </button>

        {userMenuOpen && (
          <div
            className={`absolute right-0 mt-2 w-40 ${
              darkMode ? 'bg-[#2D2D2D]' : 'bg-white'
            } rounded-md shadow-lg py-1 z-50`}
          >
            <div
              className={`px-4 py-2 text-sm ${
                darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'
              } border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}
            >
              {user.displayName || user.email}
            </div>

            <button
              onClick={() => {
                setShowLogoutModal(true);
                setUserMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${
                darkMode
                  ? 'text-[#F5F2F4] hover:bg-[#3D3D3D]'
                  : 'text-[#465542] hover:bg-[#F5F2F4]'
              } flex items-center gap-2`}
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <Link
        to="/login"
        className={`flex items-center justify-center ${colors.gray} font-semibold transition hover:text-[#465542]`}
        aria-label="Login"
      >
        <div className="bg-[#C2B823] text-white rounded-full w-8 h-8 flex items-center justify-center">
          <FaUser size={14} />
        </div>
      </Link>
    )}

    <button
      onClick={handleToggleDarkMode}
      aria-label="Toggle Dark/Light mode"
      className={`${colors.primaryHover} text-2xl p-2`}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  </div>

  {showMobileSearch && showSearchBar && (
    <div className="mb-4 px-2">
      <SearchBar isMobile={true} toggleSearch={showMobileSearch} darkMode={darkMode} />
    </div>
  )}
</>

        ) : (
          <div className="flex flex-row justify-between items-center">
            <Link
              to="/"
              className={`${colors.primary} font-bold text-2xl transition ${pathname === '/' ? colors.primaryHover + ' font-extrabold' : colors.primaryHover
                }`}
            >
              🛍️ Hussein's Shop
            </Link>

            {(showSearchBar) && (
              <div className="md:w-1/3 px-4">
                <SearchBar isMobile={false} toggleSearch={false} darkMode={darkMode} />
              </div>
            )}

            <div className="flex items-center gap-6">
              <Link
                to="/"
                className={`${colors.gray} font-semibold transition ${pathname === '/' ? colors.primary + ' font-semibold' : colors.grayHover
                  } hover:text-[#465542]`}
              >
                Home
              </Link>

              <Link
                to="/#products"
                className={`${colors.gray} font-semibold transition ${pathname === '/#products' ? colors.primary + ' font-semibold' : colors.grayHover
                  } hover:text-[#465542]`}
              >
                Products
              </Link>

              <a
                href="#about"
                className={`${colors.gray} font-semibold transition ${pathname === '/about' ? colors.primary + ' font-semibold' : colors.grayHover
                  } hover:text-[#465542]`}
              >
                About
              </a>

              <Link
                to="/contact"
                className={`${colors.gray} font-semibold transition ${pathname === '/contact' ? colors.primary + ' font-semibold' : colors.grayHover
                  } hover:text-[#465542]`}
              >
                Contact
              </Link>

              <button
                onClick={handleToggleDarkMode}
                aria-label="Toggle Dark/Light mode"
                className="text-2xl p-2 text-[#465542] hover:text-[#a0a21a]"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              {user ? (
                <div className="relative user-menu">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="bg-[#C2B823] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold cursor-pointer select-none"
                    aria-label="User menu"
                    aria-expanded={userMenuOpen}
                  >
                    {getInitials(user)}
                  </button>

                  {userMenuOpen && (
                    <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} rounded-md shadow-lg py-1 z-50`}>
                      <div className={`px-4 py-2 text-sm ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'} border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
                        {user.displayName || user.email}
                      </div>

                      <button
                        onClick={() => {
                          setShowLogoutModal(true);
                          setUserMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-[#F5F2F4] hover:bg-[#3D3D3D]' : 'text-[#465542] hover:bg-[#F5F2F4]'} flex items-center gap-2`}
                      >
                        <FaSignOutAlt size={14} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`${colors.gray} font-semibold transition hover:text-[#465542]`}
                  aria-label="Login"
                >
                  <div className="bg-[#C2B823] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <FaUser size={14} />
                  </div>
                </Link>
              )}

              <Link
                to="/cart"
                className={`relative ${colors.gray} transition ${pathname === '/cart' ? colors.yellow : ''
                  } hover:text-[#a0a21a] font-semibold text-2xl`}
                aria-label="Cart"
              >
                <FaShoppingCart />
                {uniqueProductsCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#C2B823] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {uniqueProductsCount}
                  </span>
                )}
              </Link>

              <Link
                to="/favorites"
                className={`relative ${colors.gray} transition ${pathname === '/favorites' ? colors.pink : ''
                  } hover:text-[#a6213f] font-semibold text-2xl`}
                aria-label="Favorites"
              >
                <FaHeart />
                {favoritesCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#DA2B50] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>

{showLogoutModal && (
  <div
    role="dialog"
    aria-modal="true"
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      className={`rounded-md p-6 max-w-sm mx-auto ${darkMode ? 'bg-[#2D2D2D] text-[#F5F2F4]' : 'bg-white text-[#465542]'}`}
    >
      <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
      <p className={`mb-6 ${darkMode ? 'text-[#D1D1D1]' : 'text-[#7a7779]'}`}>Are you sure you want to log out?</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={cancelLogout}
          className={`px-4 py-2 rounded border transition ${
            darkMode
              ? 'border-[#3D3D3D] text-[#F5F2F4] hover:bg-[#3D3D3D]'
              : 'border-gray-300 text-[#465542] hover:bg-gray-100'
          }`}
        >
          Cancel
        </button>
        <button
          onClick={confirmLogout}
          className={`px-4 py-2 rounded transition ${
            darkMode
              ? 'bg-[#DA2B50] text-white hover:bg-[#a6213f]'
              : 'bg-[#DA2B50] text-white hover:bg-[#a6213f]'
          }`}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}
