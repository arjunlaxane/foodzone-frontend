import './App.css';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import About from './components/layout/About/About';
import Contact from './components/layout/contact/Contact';
import LoginSignUp from './components/User/LoginSignUp';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/routes/ProtectedRoutes';
import UpdateProfile from './components/User/UpdateProfile';
import MyOrders from './components/Order/MyOrders';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import NotFound from './components/layout/NotFound/NotFound';
import OrderDetails from './components/Order/OrderDetails';
import DashBoard from './components/admin/DashBoard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import { API } from './global';
function App() {
  const { isAuthenticated } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    const getStripeapiKey = async () => {
      try {
        if (isAuthenticated) {
          const { data } = await axios.get(`${API}/api/v1/stripeapikey`);
          setStripeApiKey(data.stripeApiKey);
        }
      } catch (err) {
        return console.log('error>>', err);
      }
    };
    getStripeapiKey();
  }, [isAuthenticated]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', '<Droi></Droi>d Serif'],
      },
    });

    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<LoginSignUp />} />{' '}
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<ProtectedRoute Component={Cart} />} />
          <Route
            path="/account"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path="/me/update"
            element={<ProtectedRoute Component={UpdateProfile} />}
          />
          <Route
            path="/orders"
            element={<ProtectedRoute Component={MyOrders} />}
          />
          <Route
            path="/password/update"
            element={<ProtectedRoute Component={UpdatePassword} />}
          />
          <Route path="/cart" element={<ProtectedRoute Component={Cart} />} />
          <Route
            path="/login/delivery"
            element={<ProtectedRoute Component={Shipping} />}
          />
          <Route
            path="/order/confirm"
            element={<ProtectedRoute Component={ConfirmOrder} />}
          />
          <Route
            path="/paymentsuccess"
            element={<ProtectedRoute Component={OrderSuccess} />}
          />
          <Route
            path="/order/:id"
            element={<ProtectedRoute Component={OrderDetails} />}
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute isAdmin={true} Component={DashBoard} />}
          />
          <Route
            path="/admin/products"
            element={<ProtectedRoute isAdmin={true} Component={ProductList} />}
          />
          <Route
            path="/admin/product"
            element={<ProtectedRoute isAdmin={true} Component={NewProduct} />}
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true} Component={UpdateProduct} />
            }
          />
          <Route
            path="/admin/orders"
            element={<ProtectedRoute isAdmin={true} Component={OrderList} />}
          />
          <Route
            path="/admin/order/:id"
            element={<ProtectedRoute isAdmin={true} Component={ProcessOrder} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute isAdmin={true} Component={UsersList} />}
          />
          <Route
            path="/admin/user/:id"
            element={<ProtectedRoute isAdmin={true} Component={UpdateUser} />}
          />
          <Route path="*" element={<Navigate replace to="/404" />} />
          <Route path="/404" element={<NotFound />} />
          {stripeApiKey && (
            <Route
              path="/payment/process"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute Component={Payment} />
                </Elements>
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
