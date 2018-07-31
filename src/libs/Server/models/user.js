const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  blacklist: [],
  rating: '',
  level: '',
  avatar: "",
  settings: {
    visible_comments: true,
    visible_emotions: true,
    visible_tags: [],
    
  }
});

module.exports = mongoose.model('User', userSchema);
