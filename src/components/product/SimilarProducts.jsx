import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../redux/slices/productsSlice';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const SimilarProducts = ({ currentProductId, category, darkMode = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category, dispatch]);

  const similarProducts = useMemo(() => {
    return products
      .filter((product) => product.id !== currentProductId)
      .slice(0, 4);
  }, [products, currentProductId]);

  if (status === 'loading') return <p className="text-center py-4">Loading similar products...</p>;
  if (status === 'failed') return <p className="text-center py-4 text-red-500">Failed to load products.</p>;
  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-8 px-4">
      <h3 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 border-b pb-2 ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
        Similar Products
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {similarProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${product.id}`)}
            compact
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;