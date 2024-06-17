const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.redirect('/login');
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.redirect('/register');
      return;
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass === false) {
      res.redirect('register');
      return;
    }
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie('access-token', token);
    res.redirect('/profile');
  } catch (error) {
    res.status(500).json({ error });
  }
};

const setAuthentication = (req, res, next) => {
  const token = req.cookies['access-token'];
  if (!token) {
    req.isAuthenticated = false;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    req.isAuthenticated = true;
  } catch (error) {
    req.isAuthenticated = false;
  }
  next();
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    next();
  } else {
    return res.redirect('/login');
  }
};

const logoutUser = (req, res, next) => {
  res.clearCookie('access-token');
  res.redirect('/login');
};

module.exports = {
  signupUser,
  loginUser,
  isAuthenticated,
  logoutUser,
  setAuthentication,
};
