const Video = require('../Modals/video'); // make sure path is correct

// Upload new video
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, thumbnail, videoType, userId } = req.body;

    // Validate required fields
    if (!title || !videoLink || !thumbnail || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create new video document
    const videoUpload = new Video({
      user: req.user._id, // If using JWT, replace with req.user.id
      title,
      description,
      videoLink,
      thumbnail,
      videoType
    });

    await videoUpload.save();

    res.status(201).json({ success: true, video: videoUpload });
  } catch (error) {
    console.error("Upload video error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all videos
exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('user', 'channelName profilePic userName createdAt');
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get video by ID
exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id)
      .populate('user', 'channelName profilePic userName createdAt');

    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all videos by user ID
exports.getAllVideoByUserID = async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Video.find({ user: userId })
      .populate('user', 'channelName profilePic userName createdAt about');

    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
