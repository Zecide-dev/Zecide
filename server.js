const express = require("express");

//set up express app
const app = express();


//redirect http to https
const secure = require("ssl-express-www");
const session = require('express-session')



//app.use(secure);

const env = require('dotenv').config();
// console.log(process.env.token);
const bodyParser = require('body-parser');

//initialize routes
const routes = require('./routes/api');
const routes2 = require('./routes/api2');
const routes3 = require('./routes/getDatafeed');

const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");

const PORT = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var indexRouter = require('./routes/api');
var indexRouter2 = require('./routes/api2');
var indexRouter3 = require('./routes/getDatafeed');
const { response } = require("express");
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const cookieSession = require('cookie-session');
require('./passport');
app.use(cookieSession({
    name: 'session-name',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/', indexRouter2);
app.use('/', indexRouter3);
var schedule = require('node-schedule');
const { get } = require("./routes/api2");
function newsCall() {
    fetch('https://www.backend.zecide.com/Insights/Populate', {
        method: 'get'

    }).catch((err) => {
        console.log(err)
    })

}
setInterval(newsCall, 3600000);


app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '24knb6k247b2k7b2k7bk247hb2kh7b2',
}))
session.userId ;





passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: "823136671916-sf2jadrsssthoppu8lq9bdvo73r9c6en.apps.googleusercontent.com",
        clientSecret: "FuTZATXnlsuliQswDJj1KV-w",
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function

        // User.findOne({googleId:profile.id})

        console.log('passport callback function fired:');
        console.log(profile);
        userProfile = profile;
        return done(null,userProfile)
    })
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
var googleData;
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // session.userId = 1;
        // console.log(req.user)
        googleData = req.user;
        res.redirect('/google-profile');
    }
);

app.get('/failed', (req, res) => {
    res.send('<h1>Log in Failed :(</h1>')
});

const checkUserLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
}
app.get('/google-profile', checkUserLoggedIn, (req, res) => {

    // res.send(req.user);
    // // res.json(req.user)
    // res.redirect('/abc');
    console.log('hi');
    console.log(req.user)
    // res.send(req.user)
    res.render('google-profile',{user:req.user})

    
   
});
// app.get('/abc',(req,res)=>{
// })
// Auth Routes



//Logout
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


// passport auth ends
app.post('/login-post', function (req, res) {
    // var { body: { user } } = req;
    // user = JSON.parse(req.body.user);
    var authToken = 1;
    console.log(authToken);
    session.userId = authToken;
    res.redirect('/user-feed');
})

app.get('/user-feed', async (req, res) => {
    if (!(session.userId == 1)) {
        console.log('un success')
        res.redirect('/users/login')
    }
    else {

        res.render('user-feed')
    }
})

// app.get('/user-profile',(req,res)=>{
//     // var userData = req.body;
//     // console.log(userData)




//     res.render('user-profile',{abc: 'hello abu'})
// })
app.get('/logout', (req, res) => {
    session.userId = null
    res.redirect('/users/login')
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//listen for requests
app.listen(PORT, function () {
    console.log("Server started at port 8080!");
    console.log("http://localhost:8080/");
})

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
});

var users = [
    {
        username: 'ankitanshu',
        password: 'xyz123',
        name: 'Ankitanshu',
        email: 'ankitanshu22@gmail.com'
    }, {
        username: 'anna',
        password: 'password123member',
        Name: 'Anna',
        email: 'anna@gmail.com'
    }
];

var newUser = {
    username: '',
    password: '',
    name: '',
    email: ''
}

const accessTokenSecret = process.env.SECRET_KEY;

app.post("/users/login", function (req, res) {
    // Read username and password from request body
    const username = req.body.user.UserName;
    const password = req.body.user.password;
    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username, name: user.name }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }

});


app.post("/users", function (req, res) {
    // Read name, email, username and password from request body
    const username = req.body.user.UserName;
    const password = req.body.user.password;
    const email = req.body.user.Email;
    const name = req.body.user.Name;

    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.name = name;

    users.push(newUser);
    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username, name: user.name }, accessTokenSecret);

    } else {
        res.send('Username or password incorrect');
    }

});
