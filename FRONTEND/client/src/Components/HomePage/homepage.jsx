import React from 'react'
import './homepage.css'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect } from 'react';

 const options = [
  "All",
  "Cricket",
  "Bollywood Music",
  "Live",
  "Mixes",
  "Gaming",
  "Debates",
  "Coke Studio India",
  "Indian Politics",
  "Hindi Serials",
  "Comedy",
  "Travel Vlogs",
  "Technology",
  "Education",
  "Spiritual",
  "Food & Cooking",
];

const Homepage = ({sideNavbar}) => {
const [data,setData]=useState([]);

useEffect(() => {
    axios.get('https://youtube-app-xd3b.onrender.com/api/allVideo').then(res => {
      console.log(res.data.videos)
      setData(res.data.videos);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {
          options.map((item, index) => {
            return (
              <div key={index} className="homePage_option">
                {item}
              </div>
            );
          })
        }
      </div>


<div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
 {
          data?.map((item, ind) => {
            return (
              <Link to={`/watch/${item._id}`} className="youtube_Video">

    <div className="youtube_thumbnailBox">
      <img src= {item.thumbnail} alt='thumblinels' className='youtube_thumbnailPic'></img>
        <div className="youtube_timingThumbnail">
          28:12
        </div>
    </div>
    <div className="youtubeTitleBox">
      <div className="youtubeTitleBoxProfile">
        <img src={item?.user?.profilePic} className="youtube_thumbnail_Profile"></img>
      </div>
      <div className="youtubeTitleBox_Title">
        <div className="youtube_videoTitle">{item?.title}</div>
          <div className="youtube_channelName">{item?.user?.channelName}</div>
          <div className="youtubeVideo_views">{item?.like}</div>
        </div>
    </div>
  </Link>
         );
          })
        }
  
</div>

    </div>
  )
}


export default Homepage