const express = require('express');
const router2 = express.Router();
const path = require('path');

const fetch = require("node-fetch");

const Cosmic = require('cosmicjs')
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

router2.get('/learn2', function(req, res, next) {
    bucket.getObjects({
        limit: 5
    }).then(data => {
    res.render('learn', { 'data': data});
    })
  });

  //Markdown Parser
  var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
  function mdParse(text){
    var result = md.render(text);
    return result;
}

/* GET individual module */
router2.get('/learn2/:slug', function(req, res, next) {
    bucket.getObject({
        slug: req.params.slug
    }).then(data => {
    // console.log(data.object.metadata.authorphoto.url);
      data.object.metadata.markdown_content = mdParse(data.object.metadata.markdown_content)
    res.render('first-article', { 'data': data});
    })
  });

//export
module.exports = router2;