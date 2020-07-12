function fetchPostData(){
    var dataset;
    fetch('http://ec2-13-232-40-202.ap-south-1.compute.amazonaws.com:8000/Posts/0')
    .then(response => response.json())
    .then(data => useData(data))
}
fetchPostData();
var data;

var cardContainer = document.querySelector('.card-container');


function useData(d){
    data= d;
    len= data.length;
    for(var i=0; i<len; i++){
        var feedCard = document.createElement('div');
        var feedCardTop = document.createElement('div');
        var feedCardTopLeft = document.createElement('div');
        var feedProfilePic = document.createElement('img');
        var feedCardTopLeft1 = document.createElement('div');
        var name = document.createElement('span');
        var postedOn = document.createElement('p');
        var feedVerified = document.createElement('img');
        var feedCardTopRight = document.createElement('div');
        var zScoreImg = document.createElement('img');
        var zScore = document.createElement('span');
        var zHeatImg = document.createElement('img');
        var zHeat = document.createElement('span');
        var feedCardMid = document.createElement('div');
        var feedCardBottom = document.createElement('div');
        var upAndDown = document.createElement('div');
        var upvote = document.createElement('div');
        var upvoteImg = document.createElement('img');
        var upvoteCount = document.createElement('span');
        var downvote = document.createElement('div');
        var downvoteImg = document.createElement('img');
        var downvoteCount = document.createElement('span');
        var comments = document.createElement('div');
        var commentsImg = document.createElement('img');
        var commentsCount = document.createElement('span');
        var feedCardComments = document.createElement('div');
        var userImg = document.createElement('img');
        var commentInput = document.createElement('input');
        var commentPost = document.createElement('img');

        cardContainer.append(feedCard);
        feedCard.append(feedCardTop);
        feedCard.append(feedCardMid);
        feedCard.append(feedCardBottom);
        feedCard.append(feedCardComments);
        feedCardTop.append(feedCardTopLeft);
        feedCardTop.append(feedCardTopRight);
        feedCardTopLeft.append(feedProfilePic);
        feedCardTopLeft.append(feedCardTopLeft1);
        feedCardTopLeft.append(feedVerified);
        feedCardTopLeft1.append(name);
        feedCardTopLeft1.append(postedOn);
        feedCardTopRight.append(zScoreImg);
        feedCardTopRight.append(zScore);
        feedCardTopRight.append(zHeatImg);
        feedCardTopRight.append(zHeat);
        feedCardBottom.append(upAndDown);
        feedCardBottom.append(comments);
        upAndDown.append(upvote);
        upAndDown.append(downvote);
        upvote.append(upvoteImg);
        upvote.append(upvoteCount);
        downvote.append(downvoteImg);
        downvote.append(downvoteCount);
        comments.append(commentsImg);
        comments.append(commentsCount);
        feedCardComments.append(userImg);
        feedCardComments.append(commentInput);
        feedCardComments.append(commentPost);

        feedCard.className = 'feed-card';
        feedCardTop.className = 'feed-card-top';
        feedCardTopLeft.className = 'feed-card-top-left';
        feedProfilePic.className = 'feed-profile-pic';
        feedCardTopLeft1.className = 'feed-card-top-left-1';
        name.className = 'name';
        postedOn.className = 'posted-on';
        feedVerified.className = 'feed-verified';
        feedCardTopRight.className = 'feed-card-top-right';
        zScoreImg.className = 'z-score-img';
        zScore.className = 'z-score';
        zHeatImg.className = 'z-heat-img';
        zHeat.className = 'z-heat';
        feedCardMid.className = 'feed-card-mid';
        feedCardBottom.className = 'feed-card-bottom';
        upAndDown.className = 'upanddown';
        upvote.className = 'upvote';
        upvoteImg.className = 'upvote-img';
        upvoteCount.className = 'upvote-count';
        downvote.className = 'downvote';
        downvoteImg.className = 'downvote-img';
        downvoteCount.className = 'downvote-count';
        comments.className = 'comments';
        commentsImg.className = 'comments-img';
        commentsCount.className = 'comments-count';
        feedCardComments.className = 'feed-card-comments';
        userImg.className = 'user-img';
        commentInput.className = 'comment-input';
        commentPost.className = 'comment-post';

        if (d[i].Content===undefined){     
            feedProfilePic.setAttribute('src', '/src/images/profile-img.jpg');
            name.innerHTML=d[i].Author.Name;
            var dateData = d[i].date;
            var date1 = Date.parse(dateData);
            var date2 = Date.now();
            var dateDiff = date2-date1;
            postedOn.innerHTML= timeSince(dateDiff) + " ago";
            feedVerified.setAttribute('src', '/src/images/verified.svg');
            zScoreImg.setAttribute('src', '/src/images/z-score.svg');
            zScore.innerHTML=d[i].Author.WeightNum.toPrecision(3);
            zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
            zHeat.innerHTML=d[i].Author.Weightage.toPrecision(3);
            feedCardMid.innerHTML=d[i].Post;
            upvoteImg.setAttribute('src', '/src/images/upvote.svg');
            upvoteCount.innerHTML=d[i].UpVote.length;
            downvoteImg.setAttribute('src', '/src/images/downvote.svg');
            downvoteCount.innerHTML=d[i].DownVote.length;
            commentsImg.setAttribute('src', '/src/images/comments.svg');
            commentsCount.innerHTML=d[i].comments.length + " comments";
            userImg.setAttribute('src', '/src/images/feed-img.jpg');
            commentInput.setAttribute('placeholder', 'Write a comment..');
            commentPost.setAttribute('src', '/src/images/send.svg');
        }
        else{        
            feedProfilePic.setAttribute('src', '/src/images/profile-img.jpg');
            name.innerHTML=d[i].NewsSource;
            var dateData = d[i].PublishedAt;
            var date1 = Date.parse(dateData);
            var date2 = Date.now();
            var dateDiff = date2-date1;
            postedOn.innerHTML= timeSince(dateDiff) + " ago";
            feedVerified.setAttribute('src', '/src/images/verified.svg');
            //zScoreImg.setAttribute('src', '/src/images/z-score.svg');
            //zScore.innerHTML=d[i].Author.WeightNum.toPrecision(3);
            //zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
            //zHeat.innerHTML=d[i].Author.Weightage.toPrecision(3);
            feedCardMid.innerHTML=d[i].Content;
            upvoteImg.setAttribute('src', '/src/images/upvote.svg');
            upvoteCount.innerHTML=d[i].UpVote.length;
            downvoteImg.setAttribute('src', '/src/images/downvote.svg');
            downvoteCount.innerHTML=d[i].DownVote.length;
            commentsImg.setAttribute('src', '/src/images/comments.svg');
            commentsCount.innerHTML=d[i].comments.length + " comments";
            userImg.setAttribute('src', '/src/images/feed-img.jpg');
            commentInput.setAttribute('placeholder', 'Write a comment..');
            commentPost.setAttribute('src', '/src/images/send.svg');
            feedVerified.style.visibility="hidden";
            zScore.style.visibility="hidden";
            zScoreImg.style.visibility="hidden";
            zHeat.style.visibility="hidden";
            zHeatImg.style.visibility="hidden";
        }
  

        
        // const h1a = document.createElement('h1');
        // const h1b = document.createElement('h1');
        // const body = document.querySelector('body');
        // body.append(h1a);
        // body.append(h1b);
        // h1a.className = 'heading';
        // h1a.innerHTML= g[i];
        // h1b.className = 'heading2';
        // h1b.innerHTML= 'xyz';
        // const heading = document.querySelector('.heading');

    }
}

function timeSince(date) {
    var seconds = date/1000;  
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
//   var aDay = 24*60*60*1000;
//   return(timeSince(new Date(Date.now()-aDay)));
//   (timeSince(new Date(Date.now()-aDay*2)));
