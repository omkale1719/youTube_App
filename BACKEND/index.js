
var express = require("express");
var app = express();
var port = 4000
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173'||'https://youtube-app-1-unsu.onrender.com',
    credentials: true
  }))

app.use(express.json());
app.use(cookieParser());
require('./Connection/conn');

const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');

app.use('/user', AuthRoutes);  
app.use('/auth',AuthRoutes);
app.use('/api',VideoRoutes);
app.use('/commentApi',CommentRoutes);


app.get("/", (req, res) => {
  res.redirect("/api/allVideo");
});


app.listen(port,()=>{console.log("Our backend project is running on Port 4000")});
