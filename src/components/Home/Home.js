import React, { Fragment, useEffect } from 'react';
import Metadata from '../layout/Metadata';
import ProductCard from './ProductCard';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Navbar from '../layout/navbar/Navbar';

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(state => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Fragment>
          <Metadata title="Food Zone" />
          <Navbar />
          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
