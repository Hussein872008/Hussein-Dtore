import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductGrid from '../components/product/ProductGrid';
import { FaArrowUp } from 'react-icons/fa';

const Home = () => {
  const { hash } = useLocation();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isVisible, setIsVisible] = useState(false);

  const mode = darkMode ? 'dark' : 'light';

  const themeStyles = {
    container: {
      light: 'bg-primaryBg text-darkText',
      dark: 'bg-darkBg text-lightText'
    },
    heading: {
      light: 'text-darkGreen',
      dark: 'text-yellowAccent'
    },
    subtext: {
      light: 'text-grayMedium',
      dark: 'text-gray-400'
    },
    transition: 'transition-colors duration-300 ease-in-out'
  };

  useEffect(() => {
    if (hash === '#products') {
      const element = document.getElementById('products');
      if (element) {
        const yOffset = 150;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [hash]);

  // Check scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`min-h-screen p-6 ${themeStyles.transition} ${themeStyles.container[mode]}`}>
      <header className={`mb-8 text-center ${themeStyles.transition}`}>
        <h1 className={`text-4xl font-bold ${themeStyles.transition} ${themeStyles.heading[mode]}`}>
          Welcome to Hussein's Store
        </h1>
        <p className={`mt-2 ${themeStyles.transition} ${themeStyles.subtext[mode]}`}>
          Discover our amazing products and offers
        </p>
      </header>

      <section id="products">
        <ProductGrid />
      </section>

      {/* Back to Top Button - Mobile Only */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg md:hidden ${
            darkMode ? 'bg-yellowAccent text-darkText' : 'bg-darkGreen text-primaryBg'
          }`}
          aria-label="Back to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Home;