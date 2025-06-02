import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return (
    <div className="px-4 py-2 rounded-md"
         style={{
           backgroundColor: '#F5F2F4',
           color: '#DA2B50',        
           border: '1px solid #DA2B50'
         }}
    >
      {message}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
