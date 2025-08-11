const User = require('../Modals/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
    httpOnly: true,
    secure: false,         // HTTPS साठी
    sameSite: 'Lax'      // cross-site request मध्ये cookie allow करण्यासाठी
};

exports.signUp = async (req, res) => {
  try {
    const { channelName, userName, about, profilePic, password } = req.body;

    if (!channelName || !userName || !about || !profilePic || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const isExist = await User.findOne({ userName });

    if (isExist) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      channelName,
      userName,
      about,
      profilePic,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: user._id }, 'Its_My_Secret_Key', {
      expiresIn: '1d'
    });

    res
      .cookie('token', token, cookieOptions)
      .status(201)
      .json({
        message: 'User created successfully',
        user: {
          _id: user._id,
          channelName: user.channelName,
          userName: user.userName,
          about: user.about,
          profilePic: user.profilePic,
        },
        token
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: 'Both fields are required' });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'Its_My_Secret_Key', {
      expiresIn: '1d'
    });

    res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({
        message: 'Login successful',
        user: {
          _id: user._id,
          channelName: user.channelName,
          userName: user.userName,
          about: user.about,
          profilePic: user.profilePic,
        },
        token
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.logout = async(req,res)=>{
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
};
