import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CartItemCard from './CartItemCard';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = id => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=delivery');
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map(item => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard deleteCartItem={deleteCartItems} item={item} />

                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
            <div className="cartGrossTotal">
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>

                <p>{`₹${cartItems.reduce(
                  (sum, item) => sum + item.quantity * item.price,
                  0
                )}`}</p>
              </div>

              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
