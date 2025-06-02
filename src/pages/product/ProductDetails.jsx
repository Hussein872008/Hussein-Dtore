import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { selectProductDetails } from '../../redux/slices/productDetailsSlice';
import ProductGallery from '../../components/product/ProductGallery';
import RatingStars from '../../components/common/RatingStars';
import SocialShare from '../../components/social/SocialShare';
import SimilarProducts from '../../components/product/SimilarProducts';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';

// حالات الزر المحددة مسبقًا
const BUTTON_STATES = {
  DEFAULT: { text: 'Add to Cart', className: 'bg-[#465542] hover:bg-[#3b482e]' },
  ADDED: { text: 'Added!', className: 'bg-[#C2B823] cursor-default text-[#465542]' },
  IN_CART: { text: 'Remove from Cart', className: 'bg-[#DA2B50] hover:bg-[#a6213f]' }
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductDetails);
  const cartItems = useSelector(state => state.cart.items);
  const darkMode = useSelector(state => state.theme.darkMode);
  const isInCart = Array.isArray(cartItems) && cartItems.some(item => item.id === product.id);

  const [buttonState, setButtonState] = useState('DEFAULT');
  const [activeTab, setActiveTab] = useState('description');

  // تحديث حالة الزر عند تغير حالة السلة
  useEffect(() => {
    if (buttonState !== 'ADDED') {
      setButtonState(isInCart ? 'IN_CART' : 'DEFAULT');
    }
  }, [isInCart, buttonState]);

const handleAddToCart = () => {
  if (isInCart || buttonState === 'IN_CART') {
    dispatch(removeFromCart(product.id));
    setButtonState('DEFAULT');
    toast.success(`${product.title} has been removed from cart`);
  } else {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setButtonState('ADDED');
    
    toast.success(
      <div className="flex items-center gap-2">
        <span>{product.title} has been added to the cart</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/cart');
          }}
          className="text-blue-500 underline"
        >
          View Cart
        </button>
      </div>,
      {
        duration: 3000,
        style: {
          background: darkMode ? '#2D2D2D' : '#fff',
          color: darkMode ? '#F5F2F4' : '#333',
        }
      }
    );

    const timer = setTimeout(() => {
      setButtonState('IN_CART');
    }, 1000);
    
    return () => clearTimeout(timer);
  }
};

  const handleBuyNow = () => {
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
    navigate('/cart');
  };

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className={`p-4 text-center ${darkMode ? 'text-red-300' : 'text-red-500'}`}>
        Unable to display the product at the moment. Please try again later.
      </div>
    );
  }

  return (
    <div className={`p-2 sm:p-4 max-w-6xl mx-auto min-h-[calc(100vh-200px)] transition-colors duration-300 ${darkMode ? 'bg-darkBg text-lightText' : 'bg-white text-darkText'}`}>
      <nav className={`flex mb-4 text-xs sm:text-sm overflow-x-auto whitespace-nowrap py-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
        <button onClick={() => navigate('/')} className={`hover:${darkMode ? 'text-yellowAccent' : 'text-blue-600'}`}>
          Home
        </button>
        <span className="mx-2">/</span>
        <button
          onClick={() => navigate(`/category/${product.category}`)}
          className={`hover:${darkMode ? 'text-yellowAccent' : 'text-blue-600'}`}
        >
          {product.category}
        </button>
        <span className="mx-2">/</span>
        <span className={`${darkMode ? 'text-lightText' : 'text-gray-800'} font-medium`}>
          {product.title}
        </span>
      </nav>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-6 mb-6 sm:mb-10 transition-colors duration-300 ${darkMode ? 'bg-darkCardBg' : 'bg-white'
        }`}>
        <ProductGallery product={product} darkMode={darkMode} />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${darkMode ? 'text-lightText' : 'text-gray-800'
              }`}>
              {product.title}
            </h1>
            <div className={`text-xs sm:text-sm mb-3 sm:mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
              <span className={`${darkMode ? 'text-yellowAccent' : 'text-blue-600'} font-medium`}>
                {product.brand}
              </span> | {product.category}
            </div>

            <div className="mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-green-500">
                ${product.price}
              </span>
              {product.discountPercentage && (
                <>
                  <span className={`ml-1 sm:ml-2 text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'
                    } line-through`}>
                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-red-500">
                    ({product.discountPercentage}% OFF)
                  </span>
                </>
              )}
            </div>

            <div className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-3 sm:mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              <RatingStars rating={product.rating} size="sm" darkMode={darkMode} />
              <span>
                ({product.stock} in stock)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
        onClick={handleAddToCart}
        className={`flex-1 text-white py-2 sm:py-3 rounded-lg transition-colors active:scale-95 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${BUTTON_STATES[buttonState].className}`}
        disabled={buttonState === 'ADDED'}
      >
        {buttonState === 'ADDED' ? (
          <>
            <FaCheck size={14} /> {BUTTON_STATES[buttonState].text}
          </>
        ) : (
          <>
            <FaShoppingCart size={14} /> {BUTTON_STATES[buttonState].text}
          </>
        )}
      </button>
            <button
              onClick={handleBuyNow}
              className={`flex-1 ${darkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white py-2 sm:py-3 rounded-lg transition-colors active:scale-95 text-sm sm:text-base`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <Tabs.Root
        defaultValue="description"
        className="mt-4 sm:mt-6"
        onValueChange={(value) => setActiveTab(value)}
      >
        <Tabs.List className={`flex overflow-x-auto border-b mb-4 sm:mb-6 space-x-4 sm:space-x-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
          {[
            { id: 'description', label: 'Description' },
            { id: 'specs', label: 'Specifications' },
            { id: 'shipping', label: 'Shipping & Returns' },
            { id: 'reviews', label: 'Reviews' },
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={`text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === tab.id
                  ? `${darkMode ? 'text-yellowAccent border-b-2 border-yellowAccent' : 'text-[#DA2B50] border-b-2 border-[#DA2B50]'}`
                  : `${darkMode ? 'text-gray-400 hover:text-yellowAccent' : 'text-gray-700 hover:text-[#C2B823]'}`
                } pb-2 transition-colors`}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="description">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
          >
            {product.description}
          </motion.div>
        </Tabs.Content>

        <Tabs.Content value="specs">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
          >
            <div><strong className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Brand:</strong> {product.brand}</div>
            <div><strong className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Category:</strong> {product.category}</div>
            <div><strong className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Rating:</strong> {product.rating}</div>
            <div><strong className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Stock:</strong> {product.stock}</div>
          </motion.div>
        </Tabs.Content>

        <Tabs.Content value="shipping">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`text-xs sm:text-sm space-y-1 sm:space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'
              }`}
          >
            <div>
              <strong>Shipping Info:</strong> {product.shippingInformation || 'Delivery within 3-5 business days'}
            </div>
            <div>
              <strong>Return Policy:</strong> {product.returnPolicy || 'Free returns within 14 days'}
            </div>
          </motion.div>
        </Tabs.Content>

        <Tabs.Content value="reviews">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 sm:space-y-4"
          >
            {product.reviews?.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className={`border-b pb-2 sm:pb-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                  <div className="flex items-center mb-1">
                    <RatingStars rating={review.rating} size="xs" darkMode={darkMode} />
                    <span className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      {review.reviewerName}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    {review.comment}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} text-sm sm:text-base`}>
                No reviews yet.
              </p>
            )}
          </motion.div>
        </Tabs.Content>
      </Tabs.Root>

      <SocialShare product={product} darkMode={darkMode} />

      <SimilarProducts currentProductId={product.id} category={product.category} darkMode={darkMode} />
    </div>
  );
};

export default ProductDetails;