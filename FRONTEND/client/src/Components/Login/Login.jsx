import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setloginmodal }) => {
  const [LoginField, setLoginField] = useState({ Username: '', Password: '' });
  const [loading, setLoading] = useState(false);

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...LoginField,
      [name]: event.target.value
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://youtube-clone-1-1cwd.onrender.com/auth/login',
        {
          userName: LoginField.Username,
          password: LoginField.Password
        },
        { withCredentials: true }
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('userProfilePic', response.data.user.profilePic);
      toast.success('Login Successful!');
      window.location.reload();
    } catch (err) {
      toast.error('Invalid Credentials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login_card">
        <div className="titleCard_login">
          <YouTubeIcon sx={{ fontSize: '54px', color: 'red' }} className="login_youtubeImage" />
          Login
        </div>
        <div className="loginCredentials">
          <div className="userNameLogin">
            <input
              type="text"
              className="userNameLoginUserName"
              placeholder="Username"
              value={LoginField.Username}
              onChange={(e) => handleOnChangeInput(e, 'Username')}
            />
          </div>
          <div className="userNameLogin">
            <input
              type="password"
              className="userNameLoginUserName"
              placeholder="Password"
              value={LoginField.Password}
              onChange={(e) => handleOnChangeInput(e, 'Password')}
            />
          </div>
        </div>
        <div className="login_buttons">
          <div className="login-btn" onClick={handleLogin}>
            {loading ? 'Loading...' : 'Login'}
          </div>
          <Link to="/signup" className="login-btn" onClick={() => setloginmodal()}>
            SignUp
          </Link>
          <div className="login-btn" onClick={() => setloginmodal()}>
            Cancel
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
