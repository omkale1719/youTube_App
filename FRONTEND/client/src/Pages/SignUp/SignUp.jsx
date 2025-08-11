import React, { useState } from 'react';
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    'https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain'
  );

  const [signUpField, setSignUpField] = useState({
    channelName: '',
    userName: '',
    password: '',
    about: '',
    profilePic: uploadedImageUrl,
  });

  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Youtube');

    try {
      setProgressBar(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dsbxrs90o/image/upload',
        data
      );
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl,
      });
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed.');
    } finally {
      setProgressBar(false);
    }
  };

  const handleSignup = async () => {
    setProgressBar(true);
    try {
      const res = await axios.post(
        'http://localhost:4000/auth/signUp',
        signUpField
      );
      toast.success('Signup successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Signup failed. Please check server or CORS settings.');
    } finally {
      setProgressBar(false);
    }
  };

  return (
    <div className="signUp">
      <div className="signup_card">
        <div className="signUp_title">
          <YouTubeIcon sx={{ fontSize: '54px' }} className="login_youtubeImage" />
          SignUp
        </div>

        <div className="signUp_Inputs">
          <input
            type="text"
            className="signUp_Inputs_inp"
            placeholder="Channel Name"
            value={signUpField.channelName}
            onChange={(e) => handleInputField(e, 'channelName')}
          />
          <input
            type="text"
            className="signUp_Inputs_inp"
            placeholder="Username"
            value={signUpField.userName}
            onChange={(e) => handleInputField(e, 'userName')}
          />
          <input
            type="password"
            className="signUp_Inputs_inp"
            placeholder="Password"
            value={signUpField.password}
            onChange={(e) => handleInputField(e, 'password')}
          />
          <input
            type="text"
            className="signUp_Inputs_inp"
            placeholder="About Your Channel"
            value={signUpField.about}
            onChange={(e) => handleInputField(e, 'about')}
          />

          <div className="image_upload_signup">
            <input type="file" onChange={uploadImage} />
            <div className="image_upload_signup_div">
              <img
                className="image_default_signUp"
                src={uploadedImageUrl}
                alt="Profile"
              />
            </div>
          </div>

          <div className="signUpBtns">
            <div className="signUpBtn" onClick={handleSignup}>
              SignUp
            </div>
            <Link to="/" className="signUpBtn">
              Home Page
            </Link>
          </div>

          {progressBar && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
