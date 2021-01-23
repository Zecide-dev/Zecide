const myHeaders = new Headers();
var token = getCookie('token');
myHeaders.append('authorization', 'Token ' + token);

function fetchPostData(){
    var dataset;
    fetch('https://www.backend.zecide.com/posts/0',{
      method: 'get',
      headers: myHeaders,
  })
    .then(response => response.json())
    .then(data => useData(data))
}

fetchPostData();
var data;
var cardContainer = document.querySelector('.card-container');


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
      c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
      }
  }
  return "";
  }

function getUsername(){
  var userName = document.getElementById('user-name');
  userName.innerHTML = getCookie("UserName");
}

getUsername();

function useData(d){
    data= d;
    len= data.length;
    for(var i=0; i<len; i++){
        var profileCard = document.createElement('div');
        var profileCardTop = document.createElement('div');
        var profileCardTopLeft = document.createElement('div');
        var profileProfilePic = document.createElement('img');
        var profileCardTopLeft1 = document.createElement('div');
        var name = document.createElement('span');
        var postedOn = document.createElement('p');
        var profileVerified = document.createElement('img');
        var profileCardTopRight = document.createElement('div');
        var zScoreImg = document.createElement('img');
        var zScore = document.createElement('span');
        var zHeatImg = document.createElement('img');
        var zHeat = document.createElement('span');
        var profileCardMid = document.createElement('div');
        var profileCardBottom = document.createElement('div');
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
        var profileCardComments = document.createElement('div');
        var userImg = document.createElement('img');
        var commentInput = document.createElement('input');
        var commentPost = document.createElement('img');

        cardContainer.append(profileCard);
        profileCard.append(profileCardTop);
        profileCard.append(profileCardMid);
        profileCard.append(profileCardBottom);
        profileCard.append(profileCardComments);
        profileCardTop.append(profileCardTopLeft);
        profileCardTop.append(profileCardTopRight);
        profileCardTopLeft.append(profileProfilePic);
        profileCardTopLeft.append(profileCardTopLeft1);
        profileCardTopLeft.append(profileVerified);
        profileCardTopLeft1.append(name);
        profileCardTopLeft1.append(postedOn);
        profileCardTopRight.append(zScoreImg);
        profileCardTopRight.append(zScore);
        profileCardTopRight.append(zHeatImg);
        profileCardTopRight.append(zHeat);
        profileCardBottom.append(upAndDown);
        profileCardBottom.append(comments);
        upAndDown.append(upvote);
        upAndDown.append(downvote);
        upvote.append(upvoteImg);
        upvote.append(upvoteCount);
        downvote.append(downvoteImg);
        downvote.append(downvoteCount);
        comments.append(commentsImg);
        comments.append(commentsCount);
        profileCardComments.append(userImg);
        profileCardComments.append(commentInput);
        profileCardComments.append(commentPost);

        profileCard.className = 'profile-card';
        profileCardTop.className = 'profile-card-top';
        profileCardTopLeft.className = 'profile-card-top-left';
        profileProfilePic.className = 'profile-profile-pic';
        profileCardTopLeft1.className = 'profile-card-top-left-1';
        name.className = 'name';
        postedOn.className = 'posted-on';
        profileVerified.className = 'profile-verified';
        profileCardTopRight.className = 'profile-card-top-right';
        zScoreImg.className = 'z-score-img';
        zScore.className = 'z-score';
        zHeatImg.className = 'z-heat-img';
        zHeat.className = 'z-heat';
        profileCardMid.className = 'profile-card-mid';
        profileCardBottom.className = 'profile-card-bottom';
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
        profileCardComments.className = 'profile-card-comments';
        userImg.className = 'user-img';
        commentInput.className = 'comment-input';
        commentPost.className = 'comment-post';

        if (d[i].Content===undefined){     
            profileProfilePic.setAttribute('src', '/src/images/default-profile-picture.jpg');
            name.innerHTML=d[i].Author.Name;
            var dateData = d[i].date;
            var date1 = Date.parse(dateData);
            var date2 = Date.now();
            var dateDiff = date2-date1;
            postedOn.innerHTML= timeSince(dateDiff) + " ago";
            profileVerified.setAttribute('src', '/src/images/verified.svg');
            // zScoreImg.setAttribute('src', '/src/images/z-score.svg');
            // zScore.innerHTML=d[i].Author.WeightNum.toPrecision(3);
            // zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
            // zHeat.innerHTML=d[i].Author.Weightage.toPrecision(3);
            profileCardMid.innerHTML=d[i].Post;
            upvoteImg.setAttribute('src', '/src/images/upvote.svg');
            upvoteCount.innerHTML=d[i].UpVote.length;
            downvoteImg.setAttribute('src', '/src/images/downvote.svg');
            downvoteCount.innerHTML=d[i].DownVote.length;
            commentsImg.setAttribute('src', '/src/images/comments.svg');
            commentsCount.innerHTML=d[i].comments.length + " comments";
            userImg.setAttribute('src', '/src/images/default-profile-picture.jpg');
            commentInput.setAttribute('placeholder', 'Write a comment..');
            commentPost.setAttribute('src', '/src/images/send.svg');
        }
        else{        
            profileCard.style.display = "none";
            // profileProfilePic.setAttribute('src', '/src/images/default-profile-picture.jpg');
            // name.innerHTML=d[i].NewsSource;
            // var dateData = d[i].PublishedAt;
            // var date1 = Date.parse(dateData);
            // var date2 = Date.now();
            // var dateDiff = date2-date1;
            // postedOn.innerHTML= timeSince(dateDiff) + " ago";
            // profileVerified.setAttribute('src', '/src/images/verified.svg');



            // //zScoreImg.setAttribute('src', '/src/images/z-score.svg');
            // //zScore.innerHTML=d[i].Author.WeightNum.toPrecision(3);
            // //zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
            // //zHeat.innerHTML=d[i].Author.Weightage.toPrecision(3);



            // profileCardMid.innerHTML=d[i].Content;
            // upvoteImg.setAttribute('src', '/src/images/upvote.svg');
            // upvoteCount.innerHTML=d[i].UpVote.length;
            // downvoteImg.setAttribute('src', '/src/images/downvote.svg');
            // downvoteCount.innerHTML=d[i].DownVote.length;
            // commentsImg.setAttribute('src', '/src/images/comments.svg');
            // commentsCount.innerHTML=d[i].comments.length + " comments";
            // userImg.setAttribute('src', '/src/images/default-profile-picture.jpg');
            // commentInput.setAttribute('placeholder', 'Write a comment..');
            // commentPost.setAttribute('src', '/src/images/send.svg');
            // profileVerified.style.visibility="hidden";
            // zScore.style.visibility="hidden";
            // zScoreImg.style.visibility="hidden";
            // zHeat.style.visibility="hidden";
            // zHeatImg.style.visibility="hidden";
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
const navToggle = () => {
  var e = document.getElementById("burger"),
    t = document.querySelector(".dropdown-content"),
    n = "/src/images/dropdown-button.svg";
  e.addEventListener("click", () => {
    t.classList.toggle("dropdown-content-active");
    e.src === n ? (e.src = "/src/images/dropdown-button.svg") : (e.src = n);
  });
};
navToggle();