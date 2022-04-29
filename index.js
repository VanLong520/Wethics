if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
var Twig = require("twig")
twig = Twig.twig;
const AccountModel = require("./models/account")
const mongoose = require ("mongoose")
mongoose.connect("mongodb+srv://vanlong521:ceDiR3eo3SlU843O@cluster0.9rmar.mongodb.net/Wethics?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});




var port = process.env.PORT || 3000;
const express = require('express')
//const expressLayouts = require('express-js-layouts')
const ejs = require('ejs')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')
const initializePassport = require('./passport-config')


// This section is optional and used to configure twig.
app.set("twig options", {
  allow_async: true, // Allow asynchronous compiling
  strict_variables: false
});
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
  
const users = []
//app.engine('ejs', require('express-ejs-extend'))
app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(__dirname + '/public'))
.use('/images', express.static('public/images'))
app.use('/css', express.static('public/css'))
//app.use(expressLayouts)
//app.set('layout', '/general/layout')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.html.twig', { name: req.user.name })
})
  
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.html.twig')
})

app.post('/login', (req,res, next) => {
  try{
    var email = req.body.email
    var password = req.body.password
    AccountModel.findOne({
      email: email,
      password: password
    })
    res.redirect('/profile')
  } catch {
    res.redirect('/login')
    
  }
  
})
app.get('/profile', (req, res) => {
  res.render("user/profileview.html.twig")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.html.twig')
})
  
app.post('/register', (req, res, next) => {
  try {
    var email = req.body.email
    var password = req.body.password
    AccountModel.create({
      email: email,
      password: password
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
    res.status(400).json("create account failed")
  }
})
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})

