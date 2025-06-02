import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCreditCard, FaPaypal, FaBitcoin, FaLock, FaCheckCircle } from 'react-icons/fa';
import { MdLocationOn, MdLocalShipping } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  selectCartItems,
  selectSubtotalPrice,
  clearCart
} from '../redux/slices/cartSlice';

const CheckOut = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const shippingCost = 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'zipCode', 'country'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (paymentMethod === 'credit') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        toast.error('Please enter your card details');
        return false;
      }
      
      if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        toast.error('Please enter a valid card number');
        return false;
      }
      
      if (formData.cvv.length < 3) {
        toast.error('Please enter a valid CVV');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const order = { 
      ...formData, 
      paymentMethod,
      items: cartItems,
      total,
      orderDate: new Date().toISOString(),
      orderId: `ORD-${Math.floor(Math.random() * 1000000)}`
    };

    setOrderDetails(order);
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    console.log('Order confirmed:', orderDetails);
    
    toast.success(
      <div>
        <div className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" />
          <span>Order placed successfully!</span>
        </div>
        <div className="text-sm mt-1">Order ID: {orderDetails.orderId}</div>
      </div>,
      { autoClose: 3000 }
    );
    
    dispatch(clearCart());
    setShowConfirmation(false);
    
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className={`min-h-screen py-8 ${darkMode ? 'bg-[#1A1A1A] text-[#F5F2F4]' : 'bg-gray-100 text-[#465542]'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-[#C2B823]' : 'text-[#465542]'}`}>
          Checkout ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h1>
        
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-lg p-6 max-w-md w-full ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-[#C2B823]' : 'text-[#465542]'}`}>
                Confirm Your Order
              </h2>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Order Summary:</h3>
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t my-3 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold mb-1">Shipping to:</h3>
                  <p>{formData.address}, {formData.city}, {formData.zipCode}, {formData.country}</p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-1">Payment Method:</h3>
                  <p>
                    {paymentMethod === 'credit' && 'Credit/Debit Card'}
                    {paymentMethod === 'paypal' && 'PayPal'}
                    {paymentMethod === 'crypto' && 'Crypto Currency'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmOrder}
                  className={`px-4 py-2 rounded-md ${darkMode ? 'bg-[#C2B823] hover:bg-[#DA2B50]' : 'bg-[#465542] hover:bg-[#DA2B50]'} text-white`}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className={`rounded-lg shadow-md p-6 mb-6 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-[#C2B823]' : 'text-[#465542]'}`}>
                <MdLocationOn className="mr-2" /> Shipping Information
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="EG">Egypt</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="AE">United Arab Emirates</option>
                    </select>
                  </div>
                </div>

                <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-[#C2B823]' : 'text-[#465542]'}`}>
                  <FaCreditCard className="mr-2" /> Payment Method
                </h2>

                <div className="mb-6">
                  <div className="flex flex-col space-y-3">
                    <label className={`flex items-center p-4 rounded-md cursor-pointer ${darkMode ? 'bg-[#3D3D3D] hover:bg-[#4D4D4D]' : 'bg-gray-100 hover:bg-gray-200'} ${paymentMethod === 'credit' && (darkMode ? 'border-[#C2B823]' : 'border-[#465542]')} border-2`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'credit'}
                        onChange={() => setPaymentMethod('credit')}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <FaCreditCard className="text-xl mr-2" />
                        <span>Credit/Debit Card</span>
                      </div>
                    </label>

                    <label className={`flex items-center p-4 rounded-md cursor-pointer ${darkMode ? 'bg-[#3D3D3D] hover:bg-[#4D4D4D]' : 'bg-gray-100 hover:bg-gray-200'} ${paymentMethod === 'paypal' && (darkMode ? 'border-[#C2B823]' : 'border-[#465542]')} border-2`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <FaPaypal className="text-xl mr-2 text-blue-500" />
                        <span>PayPal</span>
                      </div>
                    </label>

                    <label className={`flex items-center p-4 rounded-md cursor-pointer ${darkMode ? 'bg-[#3D3D3D] hover:bg-[#4D4D4D]' : 'bg-gray-100 hover:bg-gray-200'} ${paymentMethod === 'crypto' && (darkMode ? 'border-[#C2B823]' : 'border-[#465542]')} border-2`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'crypto'}
                        onChange={() => setPaymentMethod('crypto')}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <FaBitcoin className="text-xl mr-2 text-orange-500" />
                        <span>Crypto Currency</span>
                      </div>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'credit' && (
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required={paymentMethod === 'credit'}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required={paymentMethod === 'credit'}
                          placeholder="MM/YY"
                          className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-700'}`}>
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required={paymentMethod === 'credit'}
                        placeholder="123"
                        className={`w-full rounded-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-8">
                  <Link
                    to="/cart"
                    className={`px-4 py-2 rounded-md ${darkMode ? 'text-[#C2B823] hover:text-[#DA2B50]' : 'text-[#465542] hover:text-[#DA2B50]'}`}
                  >
                    ← Back to Cart
                  </Link>
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-md font-medium ${darkMode ? 'bg-[#C2B823] hover:bg-[#DA2B50]' : 'bg-[#465542] hover:bg-[#DA2B50]'} text-white transition-colors`}
                  >
                    Complete Order ({formatPrice(total)})
                  </button>
                </div>
              </form>
            </div>

            <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FaLock className="mr-2" />
                <span className={darkMode ? 'text-[#A5A1A4]' : ''}>Secure payment</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-500'}`}>
                Your payment information is processed securely. We do not store your credit card details.
              </p>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className={`rounded-lg shadow-md p-6 sticky top-8 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-[#C2B823]' : 'text-[#465542]'}`}>
                <MdLocalShipping className="mr-2" /> Order Summary
              </h2>

              <div className="mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className={darkMode ? 'text-[#A5A1A4]' : 'text-gray-600'}>Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className={darkMode ? 'text-[#A5A1A4]' : 'text-gray-600'}>Shipping</span>
                  <span className="font-medium">{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className={darkMode ? 'text-[#A5A1A4]' : 'text-gray-600'}>Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-[#C2B823]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className={`p-4 rounded-md mb-6 ${darkMode ? 'bg-[#3D3D3D]' : 'bg-gray-100'}`}>
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-[#C2B823]' : 'text-[#465542]'}`}>Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className={`flex-grow rounded-l-md p-2 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-300'} border`}
                  />
                  <button
                    className={`px-4 py-2 rounded-r-md ${darkMode ? 'bg-[#C2B823] hover:bg-[#DA2B50]' : 'bg-[#465542] hover:bg-[#DA2B50]'} text-white`}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className={`p-4 rounded-md ${darkMode ? 'bg-[#3D3D3D]' : 'bg-gray-100'}`}>
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-[#C2B823]' : 'text-[#465542]'}`}>Delivery Options</h3>
                <div className="space-y-2">
                  <label className={`flex items-center p-3 rounded-md cursor-pointer ${darkMode ? 'hover:bg-[#4D4D4D]' : 'hover:bg-gray-200'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      defaultChecked
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Standard Delivery</div>
                      <div className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-600'}`}>3-5 business days • {formatPrice(9.99)}</div>
                    </div>
                  </label>
                  <label className={`flex items-center p-3 rounded-md cursor-pointer ${darkMode ? 'hover:bg-[#4D4D4D]' : 'hover:bg-gray-200'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Express Delivery</div>
                      <div className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-600'}`}>1-2 business days • {formatPrice(19.99)}</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;