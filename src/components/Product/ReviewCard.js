import React from 'react';
import Rating from '@mui/material/Rating';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    size: 'medium',
  };

  return (
    <div className="reviewCard">
      <p>{review.name}</p>

      <Rating {...options} />

      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
