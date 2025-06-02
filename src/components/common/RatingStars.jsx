import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const RatingStars = ({ rating, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const roundedRating = Math.round(rating);

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[...Array(5)].map((_, i) => {
        const full = i < roundedRating;

        return (
          <span
            key={i}
            className={`${sizeClasses[size]} ${
              full ? 'text-[#C2B823]' : 'text-gray-300'
            }`}
          >
            {full ? <AiFillStar /> : <AiOutlineStar />}
          </span>
        );
      })}
    </div>
  );
};

export default RatingStars;
