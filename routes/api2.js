const express = require('express');
const router2 = express.Router();
const path = require('path');
const auth = require('./auth');
// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// global.document = new JSDOM("http://localhost:8080").window.document;


const fetch = require("node-fetch");

const Cosmic = require('cosmicjs');
const { route } = require('./api');
const api = Cosmic()
const bucket = api.bucket({
  slug: 'zecide-learn',
  read_key: 'vfeIyVlFxslxYi0dCMnk9ivKcw1SyvRpuTI8DyNtcqvWIN0wDK'
})

// const data = await bucket.getObjects({
//   type: 'modules',
//   props: 'slug,title,content',
//   limit: 20
// })
// console.log(data);
// let jsonResp;
// function getJoke() {
//     const response = fetch('https://api.cosmicjs.com/v1/zecide-learn/objects?pretty=true&hide_metafields=true&type=modules&read_key=vfeIyVlFxslxYi0dCMnk9ivKcw1SyvRpuTI8DyNtcqvWIN0wDK&limit=10&props=slug,title,content');
//     jsonResp = response.json();
//     return jsonResp;
// }
// getJoke();
// console.log(jsonResp);
// var token = localStorage.getItem('token');



// router2.get('/user-feed', function (req, res) {
//   function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }
//   var token = getCookie('token');
//   console.log(token);
//   if(token)
//   res.render('user-feed');
//   else
//   res.json({
//     error : "unauthorized access"
//   })
//   // window.location.pathname = '/user-feed';
//   // else
//   // res.sendFile(path.join(__dirname, "../public/login.html"))
//   // jwt.verify(token, 'secret', (err, payload) => {
//   //   if (err) {
//   //     //If error send Forbidden (403)
//   //     console.log('ERROR: Could not connect to the protected route');
//   //     res.sendStatus(403);
//   //   } else {
//   //     //If token is successfully verified, we can send the autorized data 
//   //     res.json({
//   //       message: 'Successful log in',
//   //       payload
//   //     });
//   //     console.log('SUCCESS: Connected to protected route');
//   //   }
//   // })
// });

router2.get('/learn', function (req, res, next) {
  bucket.getObjects({
    limit: 5
  }).then(data => {
    res.render('learn', { 'data': data });
  })
});

//Markdown Parser
var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
function mdParse(text) {
  var result = md.render(text);
  return result;
}

/* GET individual module */
router2.get('/learn/:slug', function (req, res, next) {
  bucket.getObject({
    slug: req.params.slug
  }).then(data => {
    // console.log(data.object.metadata.authorphoto.url);
    data.object.metadata.markdown_content = mdParse(data.object.metadata.markdown_content)
    res.render('first-article', { 'data': data });
  })
});


//export
module.exports = router2;