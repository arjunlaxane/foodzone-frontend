import React, { Fragment, useEffect, useState } from 'react';
import Metadata from '../layout/Metadata';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import './ResetPassword.css';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { token } = useParams();
  const [input1, setInput1] = useState(false);
  const [input2, setInput2] = useState(false);

  const { error, success, loading } = useSelector(
    state => state.forgotPassword
  );

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('password', password);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password Updated Successfully');

      navigate('/login');
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="div-1">
                  <LockOpenIcon />
                  <input
                    type={input1 ? 'text' : 'password'}
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
                  <LockIcon />
                  <input
                    type={input2 ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
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
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default ResetPassword;
