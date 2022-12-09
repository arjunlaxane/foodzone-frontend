import React, { Fragment, useEffect, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Metadata from '../layout/Metadata';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import './UpdatePassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { clearErrors, updatePassword } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
import Navbar from '../layout/navbar/Navbar';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector(state => state.profile);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('oldPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Profile Updated Successfully');

      navigate('/account');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  const [input1, setInput1] = useState(false);
  const [input2, setInput2] = useState(false);
  const [input3, setInput3] = useState(false);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <Navbar />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type={input1 ? 'text' : 'password'}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                  />

                  {
                    <span onClick={() => setInput1(!input1)}>
                      {input1 === true ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  }
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={input2 ? 'text' : 'password'}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  {
                    <span onClick={() => setInput2(!input2)}>
                      {input2 === true ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  }
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type={input3 ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  {
                    <span onClick={() => setInput3(!input3)}>
                      {input3 === true ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  }
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default UpdatePassword;
