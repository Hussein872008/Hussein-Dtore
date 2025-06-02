import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import QuantityControls from './QuantityControls';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(item.product.id));
    } else {
      dispatch(updateQuantity({ productId: item.product.id, quantity: newQuantity }));
    }
  };

  return (
    <li className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mb-4 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
      <div className="flex items-start md:items-center gap-4 flex-1">
        <div className="relative">
          <img
            src={item.product.thumbnail}
            alt={item.product.title}
            className="w-24 h-24 object-cover rounded-lg border"
            style={{ borderColor: darkMode ? '#3D3D3D' : '#E5E7EB' }}
            loading="lazy"
            onError={(e) => e.target.src = '/placeholder-product.jpg'}
          />
          {item.quantity > 1 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {item.quantity}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-[#F5F2F4]' : 'text-gray-800'}`}>
                {item.product.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-500'}`}>
                {item.product.brand}
              </p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.product.id))}
              className={`p-1 transition-colors ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
              aria-label={`Remove ${item.product.title}`}
              data-testid={`remove-${item.product.id}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-600'}`}>
                Price:
              </span>
              <span className={`font-medium ${darkMode ? 'text-[#C2B823]' : 'text-blue-600'}`}>
                {formatPrice(item.product.price)}
              </span>
            </div>
            
            <QuantityControls
              quantity={item.quantity}
              onIncrease={() => handleQuantityChange(item.quantity + 1)}
              onDecrease={() => handleQuantityChange(item.quantity - 1)}
              onUpdate={handleQuantityChange}
              productId={item.product.id}
              max={item.product.stock}
              darkMode={darkMode}
            />
          </div>
          
          <div className="mt-3">
            <p className={`font-semibold ${darkMode ? 'text-[#F5F2F4]' : 'text-gray-800'}`}>
              Total: <span className={darkMode ? 'text-[#C2B823]' : 'text-green-600'}>
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
      brand: PropTypes.string,
      stock: PropTypes.number,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(CartItem);