const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required for registration'],
      unique: [true, 'Username already exists'],
    },
    email: {
      type: String,
      required: [true, 'Email is required for registration'],
      unique: [true, 'Username already exists'],
    },
    password: {
      type: String,
      required: [true, 'Password is required for registration'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
