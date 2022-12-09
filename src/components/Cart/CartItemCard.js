import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './CartItemCard.css';

const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <div className="CartItemCard">
      <Link to={`/product/${item.product}`}>
        <img src={item.image} alt={item.name} />
      </Link>
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>

        <span>{`Price:₹${item.price}`}</span>

        <Button onClick={() => deleteCartItem(item.product)} color="error">
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
