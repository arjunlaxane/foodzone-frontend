import React, { useEffect, useState } from 'react';
import './Products.css';
import ProductCard from '../Home/ProductCard';
import Metadata from '../layout/Metadata';
import { Typography } from '@mui/material';
import Navbar from '../layout/navbar/Navbar';
import Loader from '../layout/Loader/Loader';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
const categories = [
  'Veg',
  'Non veg',
  'Chinese',
  'Biryani',
  'Pizza',
  'Juice',
  'Street food',
];

const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { products, loading, error } = useSelector(state => state.products);

  const [suggestion, setSuggestion] = useState(true);
  const [category, setCategory] = useState('');

  const [filter, setFilter] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState(products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, alert, error]);

  const handleFilter = event => {
    const searchWord = event.target.value;
    setKeyword(searchWord);
    const newFilter = products.filter(value => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilter([]);
    } else {
      setFilter(newFilter);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const res = products.filter(val => {
      return (
        val.name.slice(0, 2).toLowerCase() === keyword.slice(0, 2).toLowerCase()
      );
    });
    setData(res);
  };

  const handleReset = e => {
    e.preventDefault();
    setData(products);
    setKeyword('');
    setFilter([]);
  };

  const handleCategory = catItem => {
    const res = products.filter(cat => {
      return cat.category === catItem;
    });
    setCategory(res);
  };

  const parastyles = {
    display: suggestion ? 'block' : 'none',
  };
  window.onclick = () => setSuggestion(!suggestion);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="products-container">
            <Metadata title="Tasty Food" />
            <div className="main-container">
              <div className="input-container">
                <Typography component="h4">Products</Typography>

                <div className="filterBox">
                  <ul className="categoryBox">
                    {categories.map(category => (
                      <li
                        className="category-link"
                        key={category}
                        onClick={() => handleCategory(`${category}`)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>

                <form className="search">
                  <div>
                    <input
                      type="text"
                      placeholder="Search Products..."
                      onChange={handleFilter}
                      value={keyword}
                    />
                    {filter.length > 0 && (
                      <div className="dataResult" style={parastyles}>
                        {filter.slice(0, 10).map(value => (
                          <Link key={value._id} to={`/product/${value._id}`}>
                            <p>{value.name} </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <button onClick={handleSubmit}>
                      <SearchIcon fontSize="small" />
                    </button>
                    <button onClick={handleReset}>Reset</button>
                  </div>
                </form>
              </div>

              {category.length > 0 ? (
                <div className="products">
                  {category.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="products">
                  {data &&
                    data.map(product => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
