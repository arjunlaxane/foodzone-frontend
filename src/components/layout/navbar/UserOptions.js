import React from 'react';
import { useState } from 'react';
import './UserOptions.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ loading, user }) => {
  const { cartItems } = useSelector(state => state.cart);

  const [img, setImg] = useState(false);
  const alert = useAlert();
  const Options = () => {
    setImg(!img);
  };
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
    alert.success('Logout Successfully');
  };
  return (
    <>
      {loading ? (
        'Loading..'
      ) : (
        <div id="profile-container">
          <img
            src={user.avatar.url ? user.avatar.url : '/profile.png'}
            alt="profile-img"
            className="user-profile"
            onClick={Options}
          />
          {user.role !== 'admin' && img && (
            <>
              <Link to="/account" id="profile-options">
                My Profile
              </Link>
              <Link to="/orders" id="profile-options">
                My Orders
              </Link>
              <Link to="/cart" id="profile-options">
                <ShoppingCartIcon
                  color={cartItems.length > 0 ? 'error' : 'success'}
                />
                {cartItems.length > 0 ? (
                  <span style={cartItems.length > 0 ? { color: 'red' } : ''}>
                    {cartItems.length}
                  </span>
                ) : (
                  ''
                )}
              </Link>
              <Link to="/" id="profile-options" onClick={logOut}>
                Logout
              </Link>
            </>
          )}

          {user.role === 'admin' && img && (
            <>
              <Link to="/admin/dashboard" id="profile-options">
                Dashboard
              </Link>
              <Link to="/account" id="profile-options">
                My Profile
              </Link>
              <Link to="/orders" id="profile-options">
                My Orders
              </Link>
              <Link to="/cart" id="profile-options">
                <ShoppingCartIcon />
                {cartItems.length > 0 ? <p>{cartItems.length}</p> : ''}
              </Link>
              <Link to="/" id="profile-options" onClick={logOut}>
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserOptions;
