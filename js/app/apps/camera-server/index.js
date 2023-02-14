const express = require('express');
const fs = require('fs');
const app = express();
const uploadVideo = require('./upload-video');


app.use(express.raw({ type: 'video/webm', limit: '100mb' }));
app.use(uploadVideo);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server started on port 3000');
});