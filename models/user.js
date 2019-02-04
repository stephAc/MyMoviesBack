const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
  },
  pwd: {
    type: String,
    required: [true, 'pwd field is required'],
  },
});

//Creation of the user model
const User = mongoose.model('user', UserSchema);

module.exports = User;
