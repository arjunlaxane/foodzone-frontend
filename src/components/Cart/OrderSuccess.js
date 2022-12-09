import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './OrderSuccess.css';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemsFromCart } from '../../actions/cartAction';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const payMoney = async () => {
    for (let i = 0; i < cartItems.length; i++) {
      const ID = await cartItems[i].product;
      dispatch(removeItemsFromCart(ID));
    }
  };
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders" onClick={payMoney}>
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
