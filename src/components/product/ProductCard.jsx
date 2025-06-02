import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItems } from '../../redux/slices/cartSlice';
import { addFavorite, removeFavorite } from '../../redux/slices/favoritesSlice';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaCheck, FaImage } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCard = ({ product, isLoading, showFavoriteButton = true, darkMode = false }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const cartItems = useSelector(selectCartItems);
  const { user } = useAuth();

  const isFavorite = favorites?.some(item => item?.id === product?.id) || false;
  const isInCart = cartItems?.some(item => item?.product?.id === product?.id) || false;

  const [buttonText, setButtonText] = useState(isInCart ? 'Remove from Cart' : 'Add to Cart');
  const [buttonState, setButtonState] = useState(isInCart ? 'inCart' : 'default');
  const [isHovering, setIsHovering] = useState(false);
  const [imgError, setImgError] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.info('Please sign in to add items to favorites', { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      if (isFavorite) {
        dispatch(removeFavorite(product.id));
      } else {
        dispatch(addFavorite(product));
      }
    } catch (error) {
      console.error('Failed to update favorites', error);
      toast.error('Failed to update favorites', { position: "top-right", autoClose: 3000 });
    }
  };

  const handleCartAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isInCart || buttonState === 'inCart') {
        dispatch(removeFromCart(product.id));
        setButtonText('Add to Cart');
        setButtonState('default');
      } else {
        dispatch(addToCart({ ...product, quantity: 1 }));
        setButtonText('Added!');
        setButtonState('added');

        setTimeout(() => {
          setButtonText('Remove from Cart');
          setButtonState('inCart');
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to update cart', error);
    }
  };

  const buttonClasses = {
    default: 'bg-[#465542] hover:bg-[#3b482e]',
    added: 'bg-[#C2B823] cursor-default text-[#465542]',
    inCart: 'bg-[#DA2B50] hover:bg-[#a6213f]',
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
        className={`rounded-2xl shadow-sm border overflow-hidden flex flex-col h-full ${darkMode ? 'bg-[#2D2D2D] border-[#3D3D3D]' : 'bg-white border-[#A5A1A4]'}`}
      >
        <div className="relative h-48">
          <Skeleton height={192} className="w-full" baseColor={darkMode ? "#3D3D3D" : undefined} highlightColor={darkMode ? "#4D4D4D" : undefined} />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <Skeleton count={1} height={24} className="mb-2" baseColor={darkMode ? "#3D3D3D" : undefined} highlightColor={darkMode ? "#4D4D4D" : undefined} />
          <Skeleton count={2} height={16} className="mb-3" baseColor={darkMode ? "#3D3D3D" : undefined} highlightColor={darkMode ? "#4D4D4D" : undefined} />
          <div className="flex justify-between mb-4">
            <Skeleton width={80} height={24} baseColor={darkMode ? "#3D3D3D" : undefined} highlightColor={darkMode ? "#4D4D4D" : undefined} />
            <Skeleton width={60} height={20} baseColor={darkMode ? "#3D3D3D" : undefined} highlightColor={darkMode ? "#4D4D4D" : undefined} />
          </div>
          <Skeleton height={40} baseColor={darkMode ? "#3D3D3D" : undefined} highlightColor={darkMode ? "#4D4D4D" : undefined} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl shadow-sm hover:shadow-lg transition-shadow border overflow-hidden flex flex-col h-full group ${darkMode ? 'bg-[#2D2D2D] border-[#3D3D3D]' : 'bg-white border-[#A5A1A4]'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {showFavoriteButton && (
        <motion.button
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
            isFavorite ? 'bg-[#DA2B50]/20 text-[#DA2B50]' : `${darkMode ? 'bg-[#3D3D3D]/90 text-[#A5A1A4]' : 'bg-white/90 text-[#A5A1A4]'} hover:text-[#DA2B50]`
          } ${isHovering ? 'opacity-100' : 'opacity-80 hover:opacity-100'} shadow-md z-10`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFavorite ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
        </motion.button>
      )}

      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className={`relative overflow-hidden flex justify-center items-center rounded-t-2xl h-48 ${darkMode ? 'bg-[#3D3D3D]' : 'bg-[#F5F2F4]'}`}>
          {!imgError ? (
            <motion.img 
              src={product.thumbnail} 
              alt={product.title}
              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={() => setImgError(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <FaImage className={`text-6xl ${darkMode ? 'text-[#A5A1A4]' : 'text-[#A5A1A4]'}`} />
          )}
          {product.discountPercentage && (
            <motion.div 
              className="absolute top-2 left-2 bg-[#DA2B50] text-white text-xs font-bold px-2 py-1 rounded"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {Math.round(product.discountPercentage)}% OFF
            </motion.div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className={`font-semibold text-lg mb-1 ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'} group-hover:text-[#C2B823] transition line-clamp-1`}>
            {product.title}
          </h3>

          <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-[#A5A1A4]' : 'text-[#A5A1A4]'}`}>
            {product.description}
          </p>

          <div className="flex justify-between items-center mb-4 font-medium">
            <div className="flex items-center gap-2">
              <span className={`text-lg ${darkMode ? 'text-[#C2B823]' : 'text-green-600'}`}>
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage && (
                <span className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-[#A5A1A4]'} line-through`}>
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>
            <span className={`flex items-center gap-1 text-sm ${darkMode ? 'text-[#C2B823]' : 'text-yellow-500'}`}>
              ⭐ <span>{product.rating?.toFixed(1) || 'N/A'}</span>
            </span>
          </div>

          <motion.button
            onClick={handleCartAction}
            disabled={buttonState === 'added'}
            className={`mt-auto w-full py-2 rounded-lg transition text-white flex items-center justify-center gap-2 ${
              buttonClasses[buttonState]
            }`}
            whileHover={{ scale: buttonState === 'added' ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonState === 'added' ? <><FaCheck /> Added!</> : <><FaShoppingCart /> {buttonText}</>}
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default React.memo(ProductCard);
