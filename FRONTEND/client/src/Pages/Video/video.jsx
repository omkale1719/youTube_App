import React, { useState, useEffect } from 'react'
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'

const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    const fetchVedioById = async () => {
        await axios.get(`https://youtube-app-xd3b.onrender.com/api/getVideoById/${id}`).then((response) => {
            console.log(response.data.video);
            setData(response.data.video)
            setVideoURL(response.data.video.videoLink)
        }).catch(err => {
            console.log(err);
        })
    }

    const getCommentByVideoId = async () => {
        await axios.get(`https://youtube-app-xd3b.onrender.com/commentApi/comment/${id}`).then((response) => {
            console.log(response);
            setComments(response.data.comments)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchVedioById();
        getCommentByVideoId();
    }, [])

    const handleComment = async () => {
    if (!message.trim()) {
        toast.error("Please write something before commenting");
        return;
    }
    try {
        const body = { message };
        const resp = await axios.post(
            `https://youtube-app-xd3b.onrender.com/commentApi/comment/${id}`,
            body,
            { withCredentials: true }
        );
        const newComment = resp.data.comment;
        setComments([newComment, ...comments]);
        setMessage("");
    } catch (err) {
        toast.error("Currentaly This is not Working....");
        console.error(err);
    }
};


    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && <video width="400" controls autoPlay className='video_youtube_video'>
                        <source src={videoUrl} type='video/mp4' />
                        <source src={videoUrl} type='video/webm' />
                    </video>}
                </div>

                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>

                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.user?.profilePic} alt="profile" />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName"> {data?.user?.channelName} </div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subscribeBtnYoutube">Subscribe</div>
                        </div>

                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbUpOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfLikes">
                                    {data?.like}
                                </div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock">
                                <ThumbDownAltOutlinedIcon />
                            </div>
                        </div>
                    </div>

                    <div className="youtube_video_About">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>

                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>

                    {/* Self Comment */}
                    <div className="youtubeSelfComment">
                        <img
                            className="video_youtubeSelfCommentProfile"
                           src={data?.user?.profilePic}
                        />
                        <div className="addAComment">
                            <input
                                type="text"
                                className="addAcommentInput"
                                placeholder="Add A Comment..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)} 
                            />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment" onClick={() => setMessage("")}>Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Comment</div> {/* FIXED HERE */}
                            </div>
                        </div>
                    </div>

                    {/* Other Comments */}
                    <div className="youtubeOthersComments">
                        {comments.map((item) => (
                            <div className="youtubeSelfComment" key={item?._id}>
                                <img className='video_youtubeSelfCommentProfile' src={item?.user?.profilePic} alt="user" />
                                <div className="others_commentSection">
                                    <div className="others_commentSectionHeader">
                                        <div className="channelName_comment">{item?.user?.channelName}</div>
                                        <div className="commentTimingOthers">{item?.createdAt.slice(0, 10)}</div>
                                    </div>
                                    <div className="otherCommentSectionComment">
                                        {item?.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

           
          <div className="videoSuggestions">
  {/* Example Video Suggestion Block */}
  <div className="videoSuggestionsBlock">
    <div className="video_suggetion_thumbnail">
      <img
        className="video_suggetion_thumbnail_img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtIq5-Ekqrv13qBtUlwpjvEo9uPbOqdDSVRLnIDU4Q2rBCLwKBwIAX1c&s"
        alt="Video Thumbnail"
      />
    </div>

    <div className="video_suggetions_About">
      <div className="video_suggetions_About_title">
        Example Video Title That Fits in Two Lines
      </div>
      <div className="video_suggetions_About_Profile">
        Code_With_omm
      </div>
    </div>
  </div>
  <div className="videoSuggestionsBlock">
    <div className="video_suggetion_thumbnail">
      <img
        className="video_suggetion_thumbnail_img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtIq5-Ekqrv13qBtUlwpjvEo9uPbOqdDSVRLnIDU4Q2rBCLwKBwIAX1c&s"
        alt="Video Thumbnail"
      />
    </div>

    <div className="video_suggetions_About">
      <div className="video_suggetions_About_title">
        Example Video Title That Fits in Two Lines
      </div>
      <div className="video_suggetions_About_Profile">
        Code_With_omm
      </div>
    </div>
  </div>
  <div className="videoSuggestionsBlock">
    <div className="video_suggetion_thumbnail">
      <img
        className="video_suggetion_thumbnail_img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtIq5-Ekqrv13qBtUlwpjvEo9uPbOqdDSVRLnIDU4Q2rBCLwKBwIAX1c&s"
        alt="Video Thumbnail"
      />
    </div>

    <div className="video_suggetions_About">
      <div className="video_suggetions_About_title">
        Example Video Title That Fits in Two Lines
      </div>
      <div className="video_suggetions_About_Profile">
        Code_With_omm
      </div>
    </div>
  </div>
  <div className="videoSuggestionsBlock">
    <div className="video_suggetion_thumbnail">
      <img
        className="video_suggetion_thumbnail_img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzcuSpgmadsIfC5w6debTR23nD5YM3fR4mNQu3kEXWJExaIJQP97xRgqw&s"
        alt="Video Thumbnail"
      />
    </div>

    <div className="video_suggetions_About">
      <div className="video_suggetions_About_title">
        Example Video Title That Fits in Two Lines
      </div>
      <div className="video_suggetions_About_Profile">
        Code_With_omm
      </div>
    </div>
  </div>
  <div className="videoSuggestionsBlock">
    <div className="video_suggetion_thumbnail">
      <img
        className="video_suggetion_thumbnail_img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtIq5-Ekqrv13qBtUlwpjvEo9uPbOqdDSVRLnIDU4Q2rBCLwKBwIAX1c&s"
        alt="Video Thumbnail"
      />
    </div>

    <div className="video_suggetions_About">
      <div className="video_suggetions_About_title">
        Example Video Title That Fits in Two Lines
      </div>
      <div className="video_suggetions_About_Profile">
        Code_With_omm
      </div>
    </div>
  </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Video
