const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const userService = require('./services/user-service');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieSession({
  secret: 'I have seen love actually 20 times now and I am not happy about it',
}));

app.use((req, res, next) => {
  // res.locals.user = userService.find(req.cookies.userId);
  res.locals.user = userService.find(req.session.userId);
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', { error: req.query.error });
});

app.post('/login', (req, res) => {
  const user = userService.authenticate(req.body.email, req.body.password);
  if (user !== undefined) {
    // res.cookie('userId', user.id);
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.redirect('/login?error=Not Found');
  }
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const newUser = userService.create(req.body.name, req.body.email, req.body.password);
  req.session.userId = newUser.id;
  res.redirect('/');
});

app.use((req, res, next) => {
  res.status(404).send('<img src="https://http.cat/404/"/>');
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
