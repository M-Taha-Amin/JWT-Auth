const express = require('express');
require('dotenv').config();
const ejsLayouts = require('express-ejs-layouts');
const connectDB = require('./config/connection');
const appRoutes = require('./routes/index');
const cookieParser = require('cookie-parser');
const { setAuthentication } = require('./controllers/authController');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(ejsLayouts);
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
app.use(setAuthentication);
app.use(appRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}...`);
});
