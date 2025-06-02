import { useSelector, useDispatch } from 'react-redux';
import { clearCart, loadCartFromStorage } from '../../redux/slices/cartSlice';
import CartItem from '../../components/cart/CartItem';
import {
  selectCartItems,
  selectTotalItems,
  selectSubtotalPrice,
} from '../../redux/slices/cartSlice';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

export default function Cart() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotalPrice);
  const totalQuantity = useSelector(selectTotalItems);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setIsClient(true);
    // تحميل السلة من localStorage عند التحميل الأولي
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch(loadCartFromStorage(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const handleClearCart = () => setShowClearConfirm(true);

  const confirmClearCart = () => {
    dispatch(clearCart());
    setShowClearConfirm(false);
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please log in to proceed to checkout');
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  if (!isClient) return <LoadingSpinner fullPage={false} />;

  return (
    <div className={`py-8 px-4 max-w-6xl mx-auto min-h-[calc(100vh-200px)] ${darkMode ? 'bg-[#1A1A1A]' : 'bg-[#F5F2F4]'}`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
          Shopping Cart
        </h2>
        {items.length > 0 && (
          <button
            onClick={handleClearCart}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3D3D3D]' : 'hover:bg-[#FDEDEE]'}`}
            style={{ color: '#DA2B50' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className={`rounded-xl shadow-sm p-12 text-center ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
          <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${darkMode ? 'bg-[#3D3D3D]' : 'bg-[#A5A1A4]'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke={darkMode ? "#F5F2F4" : "#F5F2F4"} strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
            Your cart is empty
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-[#A5A1A4]' : 'text-[#A5A1A4]'}`}>
            You don't have any products in your shopping cart
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: '#C2B823', color: '#465542' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#465542" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
                Items ({totalQuantity})
              </h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={{ product: item, quantity: item.quantity }} />
                ))}
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-sm flex flex-col gap-4 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
              Order Summary
            </h3>
            <div className={`flex justify-between text-lg font-semibold ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-auto px-6 py-3 rounded-lg text-white font-semibold transition-colors bg-[#C2B823] hover:bg-[#ADA31B]"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className={`p-6 rounded-xl shadow-lg max-w-md w-full ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-[#F5F2F4]' : 'text-black'}`}>
              Confirm Clear Cart
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-600'}`}>
              Are you sure you want to clear all items from your cart?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className={`px-4 py-2 rounded-lg border ${darkMode ? 'border-[#3D3D3D] hover:bg-[#3D3D3D]' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button
                onClick={confirmClearCart}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}