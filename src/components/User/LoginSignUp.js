import React, { Fragment, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './LoginSignUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, login, register } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(state => state.user);

  const [input, setInput] = useState(false);
  const [avatar, setAvatar] = useState('/Profile.png');

  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shiftToNeutral');

      switcherTab.current.classList.remove('shiftToRight');

      registerTab.current.classList.remove('shiftToNeutralForm');

      loginTab.current.classList.remove('shiftToLeft');
    } else if (tab === 'register') {
      switcherTab.current.classList.add('shiftToRight');

      switcherTab.current.classList.remove('shiftToNeutral');

      registerTab.current.classList.add('shiftToNeutralForm');

      loginTab.current.classList.add('shiftToLeft');
    }
  };
  const loginSubmit = e => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);
    console.log(myForm);
    dispatch(register(myForm));
  };

  const registerDataChange = e => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader(); //to read file

      reader.onload = () => {
        //right after loading below condn
        if (reader.readyState === 2) {
          //3state: 0-initial,1-processing,2-done
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]); //this will call onload fun
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/account';
  // console.log(location.search); //?redirect=delivery
  // console.log(location.search.split('=')); //(2) ['?redirect', 'delivery']

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, redirect, error, alert, isAuthenticated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={e => switchTabs(e, 'login')}>LOGIN</p>
                  <p onClick={e => switchTabs(e, 'register')}>REGISTER</p>
                </div>

                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    // autoComplete="username"
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={input ? 'text' : 'password'}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    // autoComplete="current-password"
                  />

                  {
                    <span className="show" onClick={() => setInput(!input)}>
                      {input === true ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  }
                </div>
                <Link to="/password/forgot">Forget Password</Link>

                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <AccountCircleIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    // autoComplete="username"
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type={input ? 'text' : 'password'}
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    // autoComplete="current-password"
                  />
                  <span className="show" onClick={() => setInput(!input)}>
                    {input === true ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </span>
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default LoginSignUp;
