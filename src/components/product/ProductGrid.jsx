import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllProducts } from '../../redux/slices/productsSlice';
import ProductCard from './ProductCard';
import CategoryList from '../category/CategoryList';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsGrid() {
  const dispatch = useDispatch();
  const { items: products, searchTerm, status, error } = useSelector((state) => state.products);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`container mx-auto px-4 py-6 ${darkMode ? 'dark bg-[#1A1A1A] text-[#F5F2F4]' : ''}`}
      >
        <LoadingSpinner fullPage />
      </motion.div>
    );
  }

  if (status === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`container mx-auto px-4 py-6 ${darkMode ? 'dark bg-[#1A1A1A] text-[#F5F2F4]' : ''}`}
      >
        <EmptyState
          title="Error loading products"
          message={error || "Failed to load products. Please try again later."}
          action={() => dispatch(fetchAllProducts())}
          actionText="Retry"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`container mx-auto px-4 py-6 ${darkMode ? 'dark bg-[#1A1A1A] text-[#F5F2F4]' : ''}`}
    >
      <motion.div 
        className="mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CategoryList />
      </motion.div>

      <div id='products' className='pt-3'>
        <motion.h1 
          className={`text-2xl font-bold mb-6 pb-5 ${darkMode ? 'text-[#F5F2F4]' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          All Products
        </motion.h1>

        <AnimatePresence mode='wait'>
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState
                title="No products found"
                message={searchTerm ?
                  `No products match your search for "${searchTerm}". Try different keywords.` :
                  "No products available at the moment. Please check back later."}
                icon="🔍"
                darkMode={darkMode}
              />
            </motion.div>
          ) : (
            <motion.div
              key="products-grid"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredProducts.map((product, index) => (
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
}