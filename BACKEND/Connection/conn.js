const mongoose = require("mongoose");



mongoose
  // .connect('mongodb://localhost:27017/youtubeBackend')
  .connect('mongodb+srv://omkale0107:KpQXxecPPRt7WAin@cluster0.9e6ps.mongodb.net/youtube_clone?retryWrites=true&w=majority')
  

  .then(() => console.log('DB connection successful!')).catch(err=>{
    console.log(err)
  });