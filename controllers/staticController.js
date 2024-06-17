const renderRegisterView = (req, res) => {
  res.render('register', {
    title: 'Registration Page',
  });
};

const renderLoginView = (req, res) => {
  res.render('login', {
    title: 'Login Page',
  });
};

const renderProfileView = (req, res) => {
  res.render('profile', {
    title: 'Profile Page',
    username: req.user.username,
  });
};

module.exports = { renderRegisterView, renderLoginView, renderProfileView };
