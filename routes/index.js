const router = require('express').Router();
const {
  renderRegisterView,
  renderLoginView,
  renderProfileView,
} = require('../controllers/staticController');
const {
  signupUser,
  loginUser,
  isAuthenticated,
  logoutUser,
} = require('../controllers/authController');

// GET Requests
router.get('/', (req, res) => res.redirect('/register'));
router.get(
  '/register',
  (req, res, next) => (req.isAuthenticated ? res.redirect('/profile') : next()),
  renderRegisterView
);
router.get(
  '/login',
  (req, res, next) => (req.isAuthenticated ? res.redirect('/profile') : next()),
  renderLoginView
);
router.get('/profile', isAuthenticated, renderProfileView);

// POST Requests
router.post('/register', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
