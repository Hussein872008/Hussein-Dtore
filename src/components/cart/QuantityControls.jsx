import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuantityControls = ({
  quantity,
  onIncrease,
  onDecrease,
  onUpdate,
  min = 1,
  max = 99,
  productId,
  darkMode = false,
}) => {
  const [inputValue, setInputValue] = useState(quantity);

  useEffect(() => {
    setInputValue(quantity);
  }, [quantity]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      const newQuantity = parseInt(value);
      if (!isNaN(newQuantity)) {
        if (newQuantity > max) {
          toast.warn(`Maximum available quantity is ${max}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          onUpdate(max);
        } else {
          onUpdate(newQuantity);
        }
      }
    }
  };

  const handleBlur = (e) => {
    let newQuantity = parseInt(e.target.value) || min;
    newQuantity = Math.max(min, Math.min(max, newQuantity));
    setInputValue(newQuantity);
    onUpdate(newQuantity);
  };

  const handleIncrease = () => {
    if (quantity >= max) {
      toast.warn(`Maximum available quantity is ${max}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      onIncrease();
    }
  };

  return (
    <div className={`flex items-center border rounded-lg overflow-hidden ${darkMode ? 'border-[#3D3D3D] bg-[#3D3D3D]' : 'border-[#A5A1A4] bg-[#F5F2F4]'}`}>
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`px-3 py-2 hover:bg-[#E1DEDF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${darkMode ? 'bg-[#3D3D3D] text-[#F5F2F4]' : 'bg-[#F5F2F4] text-[#465542]'}`}
        aria-label="Decrease quantity"
        data-testid={`decrease-${productId}`}
      >
        -
      </button>

      <input
        type="number"
        lang="en"
        dir="ltr"
        value={inputValue}
        min={min}
        max={max}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-12 text-center border-x outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none py-2 ${darkMode ? 'border-[#3D3D3D] bg-[#2D2D2D] text-[#F5F2F4]' : 'border-[#A5A1A4] bg-white text-[#465542]'}`}
        aria-label="Product quantity"
        data-testid={`quantity-input-${productId}`}
      />

      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={`px-3 py-2 hover:bg-[#E1DEDF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${darkMode ? 'bg-[#3D3D3D] text-[#F5F2F4]' : 'bg-[#F5F2F4] text-[#465542]'}`}
        aria-label="Increase quantity"
        data-testid={`increase-${productId}`}
      >
        +
      </button>
    </div>
  );
};

QuantityControls.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  darkMode: PropTypes.bool,
};

export default React.memo(QuantityControls);