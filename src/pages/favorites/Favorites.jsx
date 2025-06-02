import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product/ProductCard';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import EmptyState from '../../components/common/EmptyState';
import { FaHeart, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Favorites() {
  const { items: favorites, status, error } = useSelector(state => state.favorites);
  const isLoading = status === 'loading';
  const isError = status === 'failed';
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-[60vh]"
      >
        <ClipLoader color="#3B82F6" size={50} />
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-500 mt-20"
      >
        <motion.p
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Error loading favorites: {error}
        </motion.p>
        <motion.button 
          onClick={() => navigate('/')} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.button>
      </motion.div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <EmptyState
          title="No Favorites Yet"
          message="You haven't added any products to your favorites list."
          action={() => navigate('/')}
          actionText="Browse Products"
          icon={<FaHeart className="text-red-500" />}
          darkMode={darkMode}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`container mx-auto px-4 py-8 ${darkMode ? 'bg-[#1A1A1A] min-h-screen' : 'bg-white'}`}
    >
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h2 
          className={`text-2xl font-bold ${darkMode ? 'text-[#F5F2F4]' : 'text-gray-800'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Favorite Products <span className={`${darkMode ? 'text-[#A5A1A4]' : 'text-gray-500'}`}>({favorites.length})</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/" 
            className={`${darkMode ? 'text-[#C2B823] hover:text-[#ADA31B]' : 'text-blue-600 hover:text-blue-800'} font-medium transition flex items-center gap-1`}
          >
            Continue Shopping
            <FaArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {favorites.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            layout
          >
            <ProductCard 
              product={product} 
              showFavoriteButton={false}
              darkMode={darkMode}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}