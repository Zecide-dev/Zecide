const express = require("express");

//set up express app
const app = express();

//redirect http to https
const secure = require("ssl-express-www");
 
//app.use(secure);

const env = require('dotenv').config();
const bodyParser = require('body-parser');

//initialize routes
const routes = require('./routes/api');
const routes2 = require('./routes/api2')

const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");

const PORT = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var indexRouter = require('./routes/api');
var indexRouter2 = require('./routes/api2')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/',indexRouter2);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//listen for requests
app.listen(PORT, function(){
    console.log("Server started at port 8080!");
    console.log("http://localhost:8080/");
})

app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
});

// var users = [
//     {
//         username: 'ankitanshu',
//         password: 'xyz123',
//         name: 'Ankitanshu',
//         email: 'ankitanshu22@gmail.com'
//     }, {
//         username: 'anna',
//         password: 'password123member',
//         Name: 'Anna',
//         email: 'anna@gmail.com'
//     }
// ];

// var newUser = {
//     username: '',
//     password: '',
//     name: '',
//     email: ''
// }

// const accessTokenSecret = process.env.SECRET_KEY;

// app.post("/users/login", function(req,res){
//     // Read username and password from request body
//     const username = req.body.user.UserName;
//     const password = req.body.user.password;
//     // Filter user from the users array by username and password
//     const user = users.find(u => { return u.username === username && u.password === password });

//     if (user) {
//         // Generate an access token
//         const accessToken = jwt.sign({ username: user.username,  name: user.name }, accessTokenSecret);

//         res.json({
//             accessToken
//         });
//     } else {
//         res.send('Username or password incorrect');
//     }
    
// });


// app.post("/users", function(req,res){
//     // Read name, email, username and password from request body
//     const username = req.body.user.UserName;
//     const password = req.body.user.password;
//     const email = req.body.user.Email;
//     const name = req.body.user.Name;

//     newUser.username=username;
//     newUser.password=password;
//     newUser.email=email;
//     newUser.name=name;

//     users.push(newUser);
//     // Filter user from the users array by username and password
//     const user = users.find(u => { return u.username === username && u.password === password });

//     if (user) {
//         // Generate an access token
//         const accessToken = jwt.sign({ username: user.username,  name: user.name }, accessTokenSecret);

//     } else {
//         res.send('Username or password incorrect');
//     }
  
// });

