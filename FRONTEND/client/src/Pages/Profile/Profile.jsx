
import React, { useState, useEffect } from 'react';
import './Profile.css';
import Sidenavbar from '../../Components/SideNavbar/sidenavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        try {
           
            const userRes = await axios.get(`https://youtube-app-xd3b.onrender.com/user/${id}`);
            setUser(userRes.data);

            
            const videoRes = await axios.get(`https://youtube-app-xd3b.onrender.com/api/${id}/channel`);
            setData(videoRes.data.videos); 
        } catch (err) {
            console.error("Failed to fetch profile data:", err);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [id]);

    return (
        <div className='profile'>
            <Sidenavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
                <div className="profile_top_section">
                    <div className="profile_top_section_profile">
                        <img
                            className='profile_top_section_img'
                            src={user?.profilePic || "https://via.placeholder.com/150"}
                            alt="Profile"
                        />
                    </div>

                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_Name">{user?.channelName}</div>
                        <div className="profile_top_section_info">
                            {user?.userName} • {data.length} videos
                        </div>
                        <div className="profile_top_section_info">
                            {user?.about || "No description provided."}
                        </div>
                    </div>
                </div>

                <div className="profile_videos">
                    <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon /></div>

                    <div className="profileVideos">
                        {
                            data.map((item) => (
                                <Link to={`/watch/${item._id}`} className="profileVideo_block" key={item._id}>
                                    <div className="profileVideo_block_thumbnail">
                                        <img
                                            className='profileVideo_block_thumbnail_img'
                                            src={item?.thumbnail || "https://via.placeholder.com/300x180"}
                                            alt={item?.title}
                                        />
                                    </div>
                                    <div className="profileVideo_block_detail">
                                        <div className="profileVideo_block_detail_name">{item?.title}</div>
                                        <div className="profileVideo_block_detail_about">
                                            {item?.createdAt?.slice(0, 10)}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
