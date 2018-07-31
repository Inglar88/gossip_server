const mongoose = require('mongoose');
const moment = require('moment-timezone');

const postSchema = new mongoose.Schema({
  text: {
    max: 500
  },
  secret_count: {

  },
  tags: {

  },
  bookmark: {

  },
  emotions: {

  },
  comments: {

  },
  time_stamp: {

  },
  post_number: {

  },
  views: {

  }
});

module.exports = mongoose.model('Post', postSchema);
