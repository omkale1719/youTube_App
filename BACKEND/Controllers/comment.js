const Comment = require('../Modals/comment');

// ➤ Add a new comment
exports.addComment = async (req, res) => {
    try {
        let { video, message } = req.body;
        const comment = new Comment({
            user: req.user._id,
            video,
            message
        });
        await comment.save();

        res.status(201).json({
            message: "Success",
            comment
        });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// ➤ Get all comments for a specific video
exports.getCommentByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ video: videoId })
      .populate('user', 'userName profilePic')
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      message: 'Comments fetched successfully',
      comments,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
