import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, clearProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../../components/product/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: products, status, error } = useSelector((state) => state.products);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (categoryName) {
      dispatch(fetchProductsByCategory(categoryName));
    }

    return () => {
      dispatch(clearProducts());
    };
  }, [categoryName, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#1a1a1a] text-gray-100' : 'bg-gray-50 text-gray-900'}`}
    >
      <div className="container mx-auto px-4 py-6">
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Category: <span className={darkMode ? 'text-[#C2B823]' : 'text-[#465542]'}>{categoryName}</span>
          </motion.h1>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => navigate(-1)}
              className={`text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-[#7aa2f7] hover:text-[#9ab5ff]' : 'text-blue-600 hover:text-blue-800'} hover:underline`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode='wait'>
          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <motion.p
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5 
                }}
                className="text-lg"
              >
                Loading products...
              </motion.p>
            </motion.div>
          )}

          {status === 'failed' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg max-w-2xl mx-auto ${darkMode ? 'bg-[#2a2a2a] text-red-300' : 'bg-red-50 text-red-600'}`}
            >
              <p className="font-medium">Error loading products:</p>
              <p className="text-sm mt-1">{error}</p>
            </motion.div>
          )}

          {status === 'succeeded' && products.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-lg text-center max-w-2xl mx-auto ${darkMode ? 'bg-[#2a2a2a] text-gray-300' : 'bg-white text-gray-600 shadow-sm'}`}
            >
              <p className="text-lg font-medium">No products found in this category.</p>
              <button
                onClick={() => navigate('/products')}
                className={`mt-4 px-4 py-2 rounded-md font-medium transition-colors ${darkMode ? 'bg-[#C2B823] hover:bg-[#D8C949] text-gray-900' : 'bg-[#465542] hover:bg-[#3b482e] text-white'}`}
              >
                Browse All Products
              </button>
            </motion.div>
          )}

          {status === 'succeeded' && products.length > 0 && (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <ProductCard product={product} darkMode={darkMode} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CategoryProducts;