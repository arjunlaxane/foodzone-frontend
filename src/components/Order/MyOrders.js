import React, { Fragment, useEffect } from 'react';
import './MyOrders.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DetailsIcon from '@mui/icons-material/Details';
import Navbar from '../layout/navbar/Navbar';
const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector(state => state.myOrders);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: params => {
        return (
          <Link to={`/order/${params.getValue(params.id, 'id')}`}>
            <DetailsIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <Metadata title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              checkboxSelection
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default MyOrders;
