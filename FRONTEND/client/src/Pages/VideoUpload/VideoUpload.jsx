import React, { useState } from 'react';
import './VideoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: '',
    description: '',
    videoLink: '',
    thumbnail: '',
    videoType: ''
  });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // Handle text input
  const handleInputField = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value
    });
  };

  // Upload file to Cloudinary
  const uploadImage = async (e, type) => {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Youtube');

    try {
      const cloudinaryType = type === 'videoLink' ? 'video/upload' : 'image/upload';
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dsbxrs90o/${cloudinaryType}`,
        data
      );

      setInputField((prev) => ({
        ...prev,
        [type]: response.data.secure_url
      }));

      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.error('Upload error:', err);
    }
  };

  // Submit to backend
  const handleSubmitFunc = async () => {
    const { title, description, videoLink, thumbnail, videoType } = inputField;

    if (!title || !description || !videoLink || !thumbnail || !videoType) {
      alert('All fields are required.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId'); // Stored at login
      const token = localStorage.getItem('token');   // JWT token from login

      await axios.post(
        'https://youtube-app-xd3b.onrender.com/api/video',
        {
          ...inputField,
          userId: userId 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Video uploaded successfully!');
      navigate('/');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Something went wrong during upload.');
    }
  };

  return (
    <div className='videoUpload'>
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video
        </div>

        <div className="uploadForm">
          <input
            type="text"
            placeholder='Title of video'
            className='uploadFormInputs'
            value={inputField.title}
            onChange={(e) => handleInputField(e, "title")}
          />

          <input
            type="text"
            placeholder='Description'
            className='uploadFormInputs'
            value={inputField.description}
            onChange={(e) => handleInputField(e, "description")}
          />

          <select
            value={inputField.videoType}
            onChange={(e) => handleInputField(e, "videoType")}
            className='uploadFormInputs'
          >
            <option value="">Select Video Type</option>
            <option value="music">Music</option>
            <option value="vlog">Vlog</option>
            <option value="comedy">Comedy</option>
            <option value="gaming">Gaming</option>
            <option value="other">Other</option>
          </select>

          <div>
            Thumbnail:
            <input
              type='file'
              accept='image/*'
              onChange={(e) => uploadImage(e, "thumbnail")}
            />
          </div>

          <div>
            Video:
            <input
              type='file'
              accept='video/mp4, video/webm, video/*'
              onChange={(e) => uploadImage(e, "videoLink")}
            />
          </div>

          {loader && (
            <Box sx={{ display: 'flex', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        <div className="uploadBtns">
          <div className="uploadBtn-form" onClick={handleSubmitFunc}>
            Upload
          </div>
          <Link to='/' className="uploadBtn-form">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
