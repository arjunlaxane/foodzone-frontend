import { Button } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Metadata from '../layout/Metadata';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from '../../actions/productAction';
import Navbar from '../layout/navbar/Navbar';
const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector(state => state.products);

  const { error: deleteError, isDeleted } = useSelector(state => state.product);

  const deleteProductHandler = id => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product Deleted Successfully');
      navigate('/admin/dashboard');
      dispatch({ type: DELETE_PRODUCT_RESET }); //to make isDeleted false otherwise it will keep calling
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, navigate, deleteError, isDeleted]);

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 300, flex: 1 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 800,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 300,
      flex: 1,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 300,
      flex: 1,
    },

    {
      field: 'actions',
      flex: 1,
      headerName: 'Actions',
      minWidth: 300,
      type: 'number',
      sortable: false,
      renderCell: params => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach(item => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <Navbar />

      <Metadata title={`ALL PRODUCTS - Admin`} />
      <div className="productListContainer">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </Fragment>
  );
};
export default ProductList;
