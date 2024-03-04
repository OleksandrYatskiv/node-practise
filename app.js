require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongoDB
mongoose.connect(process.env.DB_URI)
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middlware & static files
app.use(express.static('public')); // this makes 'public' folder be public & accessable
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// midlware logger
// app.use((req, res, next) => {
//   console.log('Middlware log:');
//   console.log('request path: ', req.path);
//   console.log('Request hostname:', req.hostname);
//   next();
// })

app.get('/', (req, res) => {
    res.redirect('/blogs');
})

// blog routes
app.use('/blogs', blogRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})