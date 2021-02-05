const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = require("node-fetch");
const { url } = require('inspector');
var Cosmic = require('cosmicjs');
const { route } = require('./api2');
// const { userBio } = require('../src/scripts/user-feed')
var api = Cosmic();
var bucket = api.bucket({
    slug:'zecide-blogs',
    read_key: 'ux7DSu9vRfdtTCzg3Q8iCkTzFwjkv4gkUKDgzgsGTHnsncEOgR'
});
//get the homepage
router.get('/*', function(req, res, next) {
  // console.log(req.headers.host);
  if (req.headers.host.match('www.') == null ) {
    console.log('http://' + req.headers.host.replace('','www.') + req.url);
    res.redirect('http://' + req.headers.host.replace('','www.') + req.url);
  } else {
    next();
  }
})
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname, "../public/index.html"))
})
router.get('/user-profile',function(req,res){

    res.render('user-profile')
})
router.get('/view-profile/:openId',function(req,res){
    var idToOpen = {idToOpen:req.params.openId}
    console.log(idToOpen)

    res.render('view-profile',idToOpen)
})

router.get('/users/login',function(req,res){
    res.sendFile(path.join(__dirname, "../public/login.html"))
})

router.get('/posts/:pageid',function(req,res){
    res.sendFile(path.join(__dirname, "../public/feed.html"))
})
router.get('/edit-bio',function(req,res){
    res.sendFile(path.join(__dirname, "../public/edit-bio.html"))
})

router.get('/users/current',function(req,res){
    res.sendFile(path.join(__dirname, "../public/profile.html"))
})
router.get('/terms-conditions',function(req,res){
    res.sendFile(path.join(__dirname, "../public/terms-conditions.html"))
})
router.get('/privacy-policy',function(req,res){
    res.sendFile(path.join(__dirname, "../public/privacy-policy.html"))
})
router.get('/about-us',function(req,res){
    res.sendFile(path.join(__dirname, "../public/about-us.html"))
})
router.get('/help-support',function(req,res){
    res.sendFile(path.join(__dirname, "../public/help-support.html"))
})
// router.get('/abc',(req,res)=>{
//     res.render('google-profile');

// })
router.get('/Insights',function(req,res){
    res.sendFile(path.join(__dirname, "../public/insights.html"))
})

router.get('/Insights/SectorSentiment',function(req,res){
    res.sendFile(path.join(__dirname, "../public/sector-sentiments.html"))
})

router.get('/Insights/SectorReports',function(req,res){
    res.sendFile(path.join(__dirname, "../public/sector-reports.html"))
})

router.get('/Tools',function(req,res){
    res.sendFile(path.join(__dirname, "../public/tools.html"))
})
router.get('/Tools/bundles/:file',function(req,res){
  res.sendFile(path.join(__dirname,"../public/charts/charting_library/bundles/"+req.params.file));
})


router.get('/Tools/en-tv-chart.2f0c4150.html',function(req,res){
  res.sendFile(path.join(__dirname,"../public/en-tv-chart.2f0c4150.html"))
})

router.get('/Tools/Dashboard',function(req,res){
  res.sendFile(path.join(__dirname, "../public/trading-dashboard.html"))
})

router.get('/Tools/Portfolio',function(req,res){
    res.sendFile(path.join(__dirname, "../public/portfolio.html"))
})

router.get('/Tools/BuySell',function(req,res){
    res.sendFile(path.join(__dirname, "../public/buysell.html"))
})

router.get('/Tools/bubble',function(req,res){
    res.sendFile(path.join(__dirname, "../public/bubble.html"))
})

router.get('/Tools/comparative',function(req,res){
    res.sendFile(path.join(__dirname, "../public/comparative.html"))
})

router.get('/Tools/clustering',function(req,res){
    res.sendFile(path.join(__dirname, "../public/clustering.html"))
})


router.get('/Tools/ComparisonVolume',function(req,res){
    res.sendFile(path.join(__dirname, "../public/comparisonvolume.html"))
})

router.get('/z',function(req,res){
    res.sendFile(path.join(__dirname, "../public/zpart.html"))
})

router.get('/users',function(req,res){
    res.sendFile(path.join(__dirname, "../public/signup.html"))
})

router.get('/Z/Feed',function(req,res){
    res.sendFile(path.join(__dirname, "../public/snippets.html"))
})

router.get('/Z/Snippet/Add',function(req,res){
  res.sendFile(path.join(__dirname, "../public/snippet-add.html"))
})

router.get('/Z/Snippet/Edit/:SnipId',function(req,res){
    res.sendFile(path.join(__dirname, "../public/snippets-edit.html"))
})

router.get('/Z/Snippet/delete/:SnipId',function(req,res){
    res.sendFile(path.join(__dirname, "../public/snippets-delete.html"))
})

/* GET blog home page */
router.get('/blog', function(req, res, next) {
    bucket.getObjects({
        limit: 5
    }).then(data => {
    res.render('blog-index', { 'data': data});
    })
  });

  //Markdown Parser
  var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
  function mdParse(text){
    var result = md.render(text);
    return result;
}

/* GET individual blog post */
router.get('/blog/:slug', function(req, res, next) {
    bucket.getObject({
        slug: req.params.slug
    }).then(data => {
    console.log(data.object.metadata.authorphoto.url);
      data.object.metadata.markdown_content = mdParse(data.object.metadata.markdown_content)
    res.render('blog-post', { 'data': data});
    })
  });

//export
module.exports = router;
