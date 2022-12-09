import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';
import Navbar from '../layout/navbar/Navbar';
import './Profile.css';

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector(state => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${user.name}'s Profile`} />
          <Navbar />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user?.avatar?.url} alt={user.name} />
              <Link to="/me/update">Update Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Profile;
