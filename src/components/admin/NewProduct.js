import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import React, { Fragment, useEffect, useState } from 'react';
import Metadata from '../layout/Metadata';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import './NewProduct.css';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/navbar/Navbar';

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector(state => state.newProduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]); //array

  const categories = [
    'Veg',
    'Non-veg',
    'Chinese',
    'Biryani',
    'Pizza',
    'Juice',
    'Street food',
  ];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Product Created Successfully');
      navigate('/admin/dashboard');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('Stock', Stock);

    images.forEach(image => {
      myForm.append('images', image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = e => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(old => [...old, reader.result]);
          setImages(old => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <Navbar />
      <Metadata title="Create Food" />

      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1>Create Item</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Dish Name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <CurrencyRupeeIcon />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div>
            <DescriptionIcon />

            <textarea
              placeholder="Dish Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
            <AccountTreeIcon />
            <select onChange={e => setCategory(e.target.value)}>
              <option value="">Dish Type</option>
              {categories.map(cate => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <StorageIcon />
            <input
              type="number"
              placeholder="Stock"
              required
              onChange={e => setStock(e.target.value)}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              multiple
              onChange={createProductImagesChange}
            />
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Create
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewProduct;
