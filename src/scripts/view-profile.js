// const { default: fetch } = require("node-fetch");

// const { default: fetch } = require("node-fetch");

// const { response } = require("express");
// const { default: fetch } = require("node-fetch");
let backendbaseurl = "https://www.backend.zecide.com";

const myHeaders = new Headers();
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// var token = getCookie('token');
var token = localStorage.getItem("jwttoken");
var myuserid = localStorage.getItem('userid')
// myHeaders.append('Content-Type', 'application/json');
myHeaders.append('authorization', 'Token ' + token);
// var userData;
var loc = window.location.pathname;
// console.log(loc);

var ca = loc.split('/');
// console.log(ca)
var userToSend = ca[2];
console.log(userToSend)
if (myuserid==userToSend) {
    window.location.pathname ='/user-profile'
    
}
const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
// // console.log(myHeaders)
// var userInfo;

// function userBio() {

//     fetch('http://localhost:8000/users/current', {
//         method: 'get',
//         headers: myHeaders
//     }).then((res)=>{
//         userInfo = res;
//     }
//     )
//     return userInfo;

var user_img = localStorage.getItem("userpicture");
// updating navbar image
let navbarImg=document.getElementById('user_image');
navbarImg.setAttribute("src",user_img);



// }
// userBio();
var followCount;
let fButton ;
var followingDisplay;
var followDisplay;
function userBio() {

    fetch(backendbaseurl + '/users/'+userToSend, {
        method: 'get',
        headers: myHeaders
    }).then(response => response.json())
        .then((usr) => {
            userData = usr;
            console.log(userData)
            document.getElementById('firstName').innerHTML = userData.userInfo.UserName;
            document.getElementById('tagLine').innerHTML = userData.userInfo.TagLine;
            document.getElementById('profileBio').innerHTML = userData.userInfo.UserBio;
            document.getElementById('profession').innerHTML = userData.userInfo.Work;
            document.getElementById('education').innerHTML = userData.userInfo.Education;
            document.getElementById('place').innerHTML = userData.userInfo.Place;

            followCount = userData.userInfo.Followers;
            console.log(followCount)
            var followersUnique = followCount.filter(unique);
            console.log(followersUnique)
            var followingCount = userData.userInfo.Following;
            console.log(followingCount);
            var followingUnique = followingCount.filter(unique);
            console.log(followingUnique)
            
            followDisplay = followersUnique.length;
            followingDisplay = followingUnique.length;


            var follow = document.getElementById('follow')
            var unfollow = document.getElementById('unfollow')
            
            var fCount = 0;
            // for(var i = 0;i<following;i++){
            //     for(var j = 0;j<following;j++){
            //         if(!(userData.userInfo.Following[i]==userData.userInfo.Following[j])){
            //             fCount = fCount + 1;
            //         }
                    
            //     }
            // }




            document.getElementById('followers').innerHTML = followDisplay;
            document.getElementById('following').innerHTML = followingDisplay;
            for(var i = 0;i<followDisplay;i++){
                if(userData.userInfo.Followers[i]==myuserid){
                    fButton = 0;
                    console.log(fButton)
                    follow.style.display = 'none'
                    unfollow.style.display ='inline'

                }
            }
           

        }
        )
    // return userInfo;



}
userBio();
// var userid = localStorage.getItem("userid");


// // console.log(userid)
// for(var i = 0;i<followCount;i++){
//     if(userData.userInfo.Followers[i]==myuserid){
//         fButton = 0;
//         console.log(fButton)
//     }
// }

follow.addEventListener('click',followFun)
unfollow.style.display = 'none';
unfollow.addEventListener('click',unfollowFun)
if(fButton==0){
    console.log(fButton)
    console.log('hide follow')
    follow.style.display = 'none'
    unfollow.style.display ='block'

}
else{
    console.log(fButton)
}

function followFun(){
    console.log('followed')
    follow.style.display = 'none'
    unfollow.style.display ='block'
    followDisplay = followDisplay +1;
    document.getElementById('followers').innerHTML = followDisplay; 

    fetch(backendbaseurl+'/users/Follow/'+userToSend, {
        method: 'get',
        headers: myHeaders
    }).then((res)=>{
        console.log(res)
    }).catch(err => {
        res.status(500).json({
          error: {
            message: err.message,
            error: err,
          }
        })
      });
}
function unfollowFun(){
    unfollow.style.display = 'none'

    follow.style.display ='inline'

    followDisplay = followDisplay -1;
    document.getElementById('followers').innerHTML = followDisplay ;

    // document.getElementById('followers').innerHTML = userData.userInfo.Followers.length - 1;


    fetch(backendbaseurl+'/users/UnFollow/'+userToSend, {
        method: 'get',
        headers: myHeaders
    }).then((res)=>{
        console.log(res)
    }).catch(err => {
        res.status(500).json({
          error: {
            message: err.message,
            error: err,
          }
        })
      });

}

var filter = new Object();

function fetchPostData() {
    var dataset;
    fetch(backendbaseurl+'/Posts/0', {
        method: 'get',
        headers: myHeaders
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data[0].Author.UserID)
            // data = JSON.stringify(data);
            console.log((data))
            len = data.length;



            useData(data);
        })
}

fetchPostData();

// console.log(postBody)


var data;
var cardContainer = document.querySelector('.card-container');


// function getCookie(cname) {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(';');
//   for(var i = 0; i <ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//       }
//   }
//   return "";
//   }

// console.log(token);

function getUsername() {
    var userName = document.getElementById('user-name');
    // userName.innerHTML = getCookie("UserName");
}

getUsername();

// function upvotefun(){

// }
function useData(d) {
    data = d;
    console.log(d);
    len = data.length;
    console.log(len)
    let upvoteCount = new Array(len);
    let downvoteCount = new Array(len);
    let commentInput = new Array(len);
    let feedCardComments = new Array(len)
    var cfetch = new Array(len)
    var hide = new Array(len)
    let commentsCount = new Array(len)
    for (let i = 0; i < len; i++) {



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
        var feedPostLink = document.createElement('a');
        var feedPostText = document.createElement('p');
        var feedPostImg = document.createElement('img');
        var feedCardBottom = document.createElement('div');
        var upAndDown = document.createElement('div');
        var upvote = document.createElement('div');
        var upvoteImg = document.createElement('img');
        upvoteCount[i] = document.createElement('span');
        var downvote = document.createElement('div');
        var downvoteImg = document.createElement('img');
        downvoteCount[i] = document.createElement('span');
        var comments = document.createElement('div');
        var commentsImg = document.createElement('img');
        commentsCount[i] = document.createElement('span');
        feedCardComments[i] = document.createElement('div');
        var userImg = document.createElement('img');
        commentInput[i] = document.createElement('input');
        var commentPost = document.createElement('img');

        cardContainer.append(feedCard);
        feedCard.append(feedCardTop);
        feedCard.append(feedPostLink);
        feedCard.append(feedCardBottom);
        feedCard.append(feedCardComments[i]);
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
        feedPostLink.append(feedCardMid);
        feedCardMid.append(feedPostText);
        feedCardMid.append(feedPostImg);
        feedCardBottom.append(upAndDown);
        feedCardBottom.append(comments);
        upAndDown.append(upvote);
        upAndDown.append(downvote);
        upvote.append(upvoteImg);
        upvote.append(upvoteCount[i]);
        downvote.append(downvoteImg);
        downvote.append(downvoteCount[i]);
        comments.append(commentsImg);
        comments.append(commentsCount[i]);
        feedCardComments[i].append(userImg);
        feedCardComments[i].append(commentInput[i]);
        feedCardComments[i].append(commentPost);

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
        feedPostLink.className = 'feed-post-link';
        feedCardMid.className = 'feed-card-mid';
        feedPostText.className = 'feed-post-text';
        feedPostImg.className = 'feed-post-img';
        feedCardBottom.className = 'feed-card-bottom';
        upAndDown.className = 'upanddown';
        upvote.className = 'upvote';
        upvoteImg.className = 'upvote-img';
        upvoteCount[i].className = 'upvote-count';
        downvote.className = 'downvote';
        downvoteImg.className = 'downvote-img';
        downvoteCount[i].className = 'downvote-count';
        comments.className = 'comments';
        commentsImg.className = 'comments-img';
        commentsCount[i].className = 'comments-count';
        feedCardComments[i].className = 'feed-card-comments';
        userImg.className = 'user-img';
        commentInput[i].className = 'comment-input';
        commentPost.className = 'comment-post';

        if (d[i].Content === undefined && (d[i].Author.UserID == userToSend)) {
            feedProfilePic.setAttribute('src', '/src/images/default-profile-picture.jpg');
            name.innerHTML = d[i].Author.UserName;
            var dateData = d[i].date;
            var date1 = Date.parse(dateData);
            var date2 = Date.now();
            var dateDiff = date2 - date1;
            postedOn.innerHTML = timeSince(dateDiff) + " ago";
            feedVerified.setAttribute('src', '/src/images/verified.svg');
            // zScoreImg.setAttribute('src', 'https://img.icons8.com/material/24/000000/delete-trash.png');
            // zScore.innerHTML = 'DELETE '
            // zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
            // zHeat.innerHTML = d[i].Author.Weightage.toPrecision(3);
            feedCardMid.innerHTML = d[i].Post;
            upvoteImg.setAttribute('src', '/src/images/upvote.svg');
            upvoteCount[i].innerHTML = d[i].UpVote.length;
            downvoteImg.setAttribute('src', '/src/images/downvote.svg');
            downvoteCount[i].innerHTML = d[i].DownVote.length;
            commentsImg.setAttribute('src', '/src/images/comments.svg');
            commentsCount[i].innerHTML = d[i].comments.length + " comments";
            userImg.setAttribute('src', '/src/images/default-profile-picture.jpg');
            commentInput[i].setAttribute('placeholder', 'Write a comment..');
            commentPost.setAttribute('src', '/src/images/send.svg');
            // var postno = d[i];
            upvoteImg.addEventListener("click", upvotefun);
            downvoteImg.addEventListener("click", downvotefun);
            commentPost.addEventListener("click", commentfun);
            comments.addEventListener('click', showcomm);
            // feedCardTopRight.addEventListener('click',deletePost);

            let receivedComments = document.createElement('div')
            receivedComments.className = "list-group"
            receivedComments.setAttribute('id', 'recCom');

            cfetch[i] = 1;
            hide[i] = 1;
            var resC = 1;
            var commentCounter = d[i].comments.length;


            // function deletePost(){
            //     let postid = data[i]._id;
            //     if (window.confirm("You will delete this post")) {
            //         // window.open("exit.html", "Thanks for Visiting!");
                  
            //     fetch('http://localhost:8000/Posts/' + postid + '/delete',{
            //         method:'delete',
            //         headers:myHeaders
            //     }).then(response=>response.json)
            //     .then((res)=>{
            //        window.location.pathname = '/user-profile'
            //     }).catch(err => {
            //         res.status(err.status || 500).json({ error: err })
            //     })
            // }}


            function showcomm() {
                console.log('show comm');
                let postid = data[i]._id;



                if (hide[i] == 1) {
                    receivedComments.style.display = "inline";
                    hide[i] = 0;
                    if (cfetch[i] == 1) {
                        fetch(backendbaseurl+'/Posts/' + postid + '/comment', {
                            method: 'get',
                            headers: myHeaders
                        })
                            .then(response => response.json())
                            .then((usr) => {
                                console.log('response recieved');

                                if (resC == 1) {
                                    cfetch[i] = 0;
                                    console.log(usr.usr.comments.length);
                                    let commentOutput = new Array(usr.usr.comments.length)

                                    var breakB = document.createElement('br')
                                    // feedCardComments[i].append(breakB)
                                    feedCardComments[i].parentNode.insertBefore(breakB, feedCardComments[i].nextSibling)

                                    // breakB.insertAdjacentElement(receivedComments)
                                    breakB.parentNode.insertBefore(receivedComments, breakB.nextSibling)




                                    for (let j = 0; j < usr.usr.comments.length; j++) {
                                        commentOutput[j] = document.createElement('li');
                                        // commentOutput[j].className = 'li';
                                        // console.log(usr.usr.comments[j].comment)
                                        let item = (usr.usr.comments[j].comment);

                                        var test = document.createElement('section');
                                        test.setAttribute('id', 'test');

                                        var ul = document.createElement('ul');


                                        receivedComments.appendChild(test);
                                        test.appendChild(ul);
                                        var li = document.createElement('li');
                                        li.className = 'list-group-item list-group-item-secondary';
                                        ul.appendChild(li);
                                        li.innerHTML = li.innerHTML + item
                                        // feedCardComments[i].append(
                                        //     commentOutput[j].innerHTML = item

                                        // $("<li></li>").text(`[${usr.usr.comments[j].comment}]`)
                                        // var listOfCom = document.createComment('li');
                                        // );
                                    }
                                    c = 0;



                                }
                            })
                    }
                    else {
                        cfetch[i] = 0;
                    }
                }
                else {
                    receivedComments.style.display = "none"
                    hide[i] = 1;


                }

            }

            function commentfun() {
                console.log('commented')
                let postid = data[i]._id;
                // data[i].DownVote.length = data[i].DownVote.length + 1;
                // let downcount = data[i].DownVote.length;
                // downvoteCount[i].innerHTML = downcount;
                let commentText = commentInput[i].value;
                console.log(commentText);
                // var formData = new FormData();
                commentInput[i].value = ' ';

                // var stat;
                let infoObject = { "comment": commentText };
                // var info = JSON.stringify(infoObject);
                // formData.append("comment",commentText);
                myCommHeaders = new Headers()
                myCommHeaders.append('authorization', 'Token ' + token);
                myCommHeaders.append('Content-Type', 'application/json');







                // console.log(data[i].UpVote.length)
                fetch(backendbaseurl+'/Posts/' + postid + '/comment', {
                    method: 'POST',
                    headers: myCommHeaders,
                    body: JSON.stringify(infoObject)
                })
                    .then(response => response.json())
                    .then(() => {
                        commentsCount[i].innerHTML = (commentCounter + 1) + " comments";

                        var test = document.createElement('section');
                        test.setAttribute('id', 'test');

                        var ul = document.createElement('ul');


                        receivedComments.appendChild(test);
                        test.appendChild(ul);
                        var li = document.createElement('li');
                        li.className = 'list-group-item list-group-item-secondary';
                        ul.appendChild(li);
                        li.innerHTML = li.innerHTML + commentText;



                    })


            }


            function downvotefun() {
                console.log('Downvoted');

                let postid = data[i]._id;
                // upvoteCount[i] = upvoteCount[i]+1;
                data[i].DownVote.length = data[i].DownVote.length + 1;
                let downcount = data[i].DownVote.length;
                downvoteCount[i].innerHTML = downcount;



                // console.log(data[i].UpVote.length)
                fetch(backendbaseurl+'/Posts/' + postid + '/Down', {
                    method: 'get',
                    headers: myHeaders
                })
                    .then(response => response.json())
                    .then(() => {


                    })


            }

            function upvotefun() {

                console.log('upvoted');

                let postid = data[i]._id;
                // upvoteCount[i] = upvoteCount[i]+1;
                data[i].UpVote.length = data[i].UpVote.length + 1;
                let upcount = data[i].UpVote.length;
                upvoteCount[i].innerHTML = upcount;



                // console.log(data[i].UpVote.length)
                fetch(backendbaseurl+'/Posts/' + postid + '/Up', {
                    method: 'get',
                    headers: myHeaders
                })
                    .then(response => response.json())
                    .then(() => {


                    })

                // console.log(myHeaders)
                // d[i].UpVote.length++;


            }
        }
        else {
            console.log('not displayes')
            feedCard.style.display = "none";
        //     feedProfilePic.setAttribute('src', '/src/images/default-profile-picture.jpg');
        //     name.innerHTML = d[i].NewsSource;
        //     var dateData = d[i].PublishedAt;
        //     var date1 = Date.parse(dateData);
        //     var date2 = Date.now();
        //     var dateDiff = date2 - date1;
        //     postedOn.innerHTML = timeSince(dateDiff) + " ago";
        //     feedVerified.setAttribute('src', '/src/images/verified.svg');
        //     //zScoreImg.setAttribute('src', '/src/images/z-score.svg');
        //     //zScore.innerHTML=d[i].Author.WeightNum.toPrecision(3);
        //     //zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
        //     //zHeat.innerHTML=d[i].Author.Weightage.toPrecision(3);
        //     feedPostLink.setAttribute('href', d[i].Url);
        //     feedPostText.innerHTML = d[i].Content;
        //     feedPostImg.setAttribute('src', d[i].UrlToImage);
        //     upvoteImg.setAttribute('src', '/src/images/upvote.svg');
        //     upvoteCount[i].innerHTML = d[i].UpVote.length;
        //     downvoteImg.setAttribute('src', '/src/images/downvote.svg');
        //     downvoteCount[i].innerHTML = d[i].DownVote.length;
        //     commentsImg.setAttribute('src', '/src/images/comments.svg');
        //     commentsCount[i].innerHTML = d[i].comments.length + " comments";
        //     userImg.setAttribute('src', '/src/images/default-profile-picture.jpg');
        //     commentInput[i].setAttribute('placeholder', 'Write a comment..');
        //     commentPost.setAttribute('src', '/src/images/send.svg');
        //     feedVerified.style.visibility = "hidden";
        //     zScore.style.visibility = "hidden";
        //     zScoreImg.style.visibility = "hidden";
        //     zHeat.style.visibility = "hidden";
        //     zHeatImg.style.visibility = "hidden";
        // }
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
// function useData(d) {
//     var data = d;
//     console.log(data)
//     len = data.length;
//     console.log(len)
//     var cfetch = new Array()
//     var hide = new Array()
//     for (var i = 0; i < len; i++) {
//         var profileCard = document.createElement('div');
//         var profileCardTop = document.createElement('div');
//         var profileCardTopLeft = document.createElement('div');
//         var profileProfilePic = document.createElement('img');
//         var profileCardTopLeft1 = document.createElement('div');
//         var name = document.createElement('span');
//         var postedOn = document.createElement('p');
//         var profileVerified = document.createElement('img');
//         var profileCardTopRight = document.createElement('div');
//         var zScoreImg = document.createElement('img');
//         var zScore = document.createElement('span');
//         var zHeatImg = document.createElement('img');
//         var zHeat = document.createElement('span');
//         var profileCardMid = document.createElement('div');
//         var profileCardBottom = document.createElement('div');
//         var upAndDown = document.createElement('div');
//         var upvote = document.createElement('div');
//         var upvoteImg = document.createElement('img');
//         var upvoteCount = document.createElement('span');
//         var downvote = document.createElement('div');
//         var downvoteImg = document.createElement('img');
//         var downvoteCount = document.createElement('span');
//         var comments = document.createElement('div');
//         var commentsImg = document.createElement('img');
//         var commentsCount = document.createElement('span');
//         var profileCardComments = document.createElement('div');
//         var userImg = document.createElement('img');
//         var commentInput = document.createElement('input');
//         var commentPost = document.createElement('img');

//         cardContainer.append(profileCard);
//         profileCard.append(profileCardTop);
//         profileCard.append(profileCardMid);
//         profileCard.append(profileCardBottom);
//         profileCard.append(profileCardComments);
//         profileCardTop.append(profileCardTopLeft);
//         profileCardTop.append(profileCardTopRight);
//         profileCardTopLeft.append(profileProfilePic);
//         profileCardTopLeft.append(profileCardTopLeft1);
//         profileCardTopLeft.append(profileVerified);
//         profileCardTopLeft1.append(name);
//         profileCardTopLeft1.append(postedOn);
//         profileCardTopRight.append(zScoreImg);
//         profileCardTopRight.append(zScore);
//         profileCardTopRight.append(zHeatImg);
//         profileCardTopRight.append(zHeat);
//         profileCardBottom.append(upAndDown);
//         profileCardBottom.append(comments);
//         upAndDown.append(upvote);
//         upAndDown.append(downvote);
//         upvote.append(upvoteImg);
//         upvote.append(upvoteCount);
//         downvote.append(downvoteImg);
//         downvote.append(downvoteCount);
//         comments.append(commentsImg);
//         comments.append(commentsCount);
//         profileCardComments.append(userImg);
//         profileCardComments.append(commentInput);
//         profileCardComments.append(commentPost);

//         profileCard.className = 'profile-card';
//         profileCardTop.className = 'profile-card-top';
//         profileCardTopLeft.className = 'profile-card-top-left';
//         profileProfilePic.className = 'profile-profile-pic';
//         profileCardTopLeft1.className = 'profile-card-top-left-1';
//         name.className = 'name';
//         postedOn.className = 'posted-on';
//         profileVerified.className = 'profile-verified';
//         profileCardTopRight.className = 'profile-card-top-right';
//         zScoreImg.className = 'z-score-img';
//         zScore.className = 'z-score';
//         zHeatImg.className = 'z-heat-img';
//         zHeat.className = 'z-heat';
//         profileCardMid.className = 'profile-card-mid';
//         profileCardBottom.className = 'profile-card-bottom';
//         upAndDown.className = 'upanddown';
//         upvote.className = 'upvote';
//         upvoteImg.className = 'upvote-img';
//         upvoteCount.className = 'upvote-count';
//         downvote.className = 'downvote';
//         downvoteImg.className = 'downvote-img';
//         downvoteCount.className = 'downvote-count';
//         comments.className = 'comments';
//         commentsImg.className = 'comments-img';
//         commentsCount.className = 'comments-count';
//         profileCardComments.className = 'profile-card-comments';
//         userImg.className = 'user-img';
//         commentInput.className = 'comment-input';
//         commentPost.className = 'comment-post';

//         if (d[i].Content === undefined && (d[i].Author.UserID == userid)) {
//             console.log(d[i])
            
//                 let postid = d[i]._id;
//             profileProfilePic.setAttribute('src', '/src/images/default-profile-picture.jpg');
//             name.innerHTML = d[i].Author.Name;
//             var dateData = d[i].date;
//             var date1 = Date.parse(dateData);
//             var date2 = Date.now();
//             var dateDiff = date2 - date1;
//             postedOn.innerHTML = timeSince(dateDiff) + " ago";
//             profileVerified.setAttribute('src', '/src/images/verified.svg');
//             // zScoreImg.setAttribute('src', '/src/images/z-score.svg');
//             // zScore.innerHTML=d[i].Author.WeightNum.toPrecision(3);
//             // zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
//             // zHeat.innerHTML=d[i].Author.Weightage.toPrecision(3);
//             profileCardMid.innerHTML = d[i].Post;
//             upvoteImg.setAttribute('src', '/src/images/upvote.svg');
//             upvoteCount.innerHTML = d[i].UpVote.length;
//             downvoteImg.setAttribute('src', '/src/images/downvote.svg');
//             downvoteCount.innerHTML = d[i].DownVote.length;
//             commentsImg.setAttribute('src', '/src/images/comments.svg');
//             commentsCount.innerHTML = d[i].comments.length + " comments";
//             userImg.setAttribute('src', '/src/images/default-profile-picture.jpg');
//             commentInput.setAttribute('placeholder', 'Write a comment..');
//             commentPost.setAttribute('src', '/src/images/send.svg');
//             comments.addEventListener('click', showcomm);
//             let receivedComments = document.createElement('div')
//             receivedComments.className = "list-group"
//             receivedComments.setAttribute('id', 'recCom');
//             cfetch[i] = 1;
//             hide[i] = 1;
//             var resC = 1;
//             function showcomm() {
//                 console.log('show comm');
                



//                 if (hide[i] == 1) {
//                     receivedComments.style.display = "inline";
//                     hide[i] = 0;
//                     if (cfetch[i] == 1) {
//                         fetch('http://localhost:8000/Posts/' + postid + '/comment', {
//                             method: 'get',
//                             headers: myHeaders
//                         })
//                             .then(response => response.json())
//                             .then((usr) => {
//                                 console.log('response recieved');

//                                 if (resC == 1) {
//                                     cfetch[i] = 0;
//                                     console.log(usr.usr.comments.length);
//                                     let commentOutput = new Array(usr.usr.comments.length)

//                                     var breakB = document.createElement('br')
//                                     // feedCardComments[i].append(breakB)
//                                     feedCardComments[i].parentNode.insertBefore(breakB, feedCardComments[i].nextSibling)

//                                     // breakB.insertAdjacentElement(receivedComments)
//                                     breakB.parentNode.insertBefore(receivedComments, breakB.nextSibling)




//                                     for (let j = 0; j < usr.usr.comments.length; j++) {
//                                         commentOutput[j] = document.createElement('li');
//                                         // commentOutput[j].className = 'li';
//                                         // console.log(usr.usr.comments[j].comment)
//                                         let item = (usr.usr.comments[j].comment);

//                                         var test = document.createElement('section');
//                                         test.setAttribute('id', 'test');

//                                         var ul = document.createElement('ul');


//                                         receivedComments.appendChild(test);
//                                         test.appendChild(ul);
//                                         var li = document.createElement('li');
//                                         li.className = 'list-group-item list-group-item-secondary';
//                                         ul.appendChild(li);
//                                         li.innerHTML = li.innerHTML + item
//                                         // feedCardComments[i].append(
//                                         //     commentOutput[j].innerHTML = item

//                                         // $("<li></li>").text(`[${usr.usr.comments[j].comment}]`)
//                                         // var listOfCom = document.createComment('li');
//                                         // );
//                                     }
//                                     c = 0;



//                                 }
//                             })
//                     }
//                     else {
//                         cfetch[i] = 0;
//                     }
//                 }
//                 else {
//                     receivedComments.style.display = "none"
//                     hide[i] = 1;


//                 }

//             }
//         }
//         else {
//             profileCard.style.display = "none";
//             // profileProfilePic.setAttribute('src', '/src/images/default-profile-picture.jpg');
//             // name.innerHTML=d[i].NewsSource;
//             // var dateData = d[i].PublishedAt;
//             // var date1 = Date.parse(dateData);
//             // var date2 = Date.now();
//             // var dateDiff = date2-date1;
//             // postedOn.innerHTML= timeSince(dateDiff) + " ago";
//             // profileVerified.setAttribute('src', '/src/images/verified.svg');



//             // //zScoreImg.setAttribute('src', '/src/images/z-score.svg');
//             // //zScore.innerHTML=d[i].Author.WeightNum.toPrecision(3);
//             // //zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
//             // //zHeat.innerHTML=d[i].Author.Weightage.toPrecision(3);



//             // profileCardMid.innerHTML=d[i].Content;
//             // upvoteImg.setAttribute('src', '/src/images/upvote.svg');
//             // upvoteCount.innerHTML=d[i].UpVote.length;
//             // downvoteImg.setAttribute('src', '/src/images/downvote.svg');
//             // downvoteCount.innerHTML=d[i].DownVote.length;
//             // commentsImg.setAttribute('src', '/src/images/comments.svg');
//             // commentsCount.innerHTML=d[i].comments.length + " comments";
//             // userImg.setAttribute('src', '/src/images/default-profile-picture.jpg');
//             // commentInput.setAttribute('placeholder', 'Write a comment..');
//             // commentPost.setAttribute('src', '/src/images/send.svg');
//             // profileVerified.style.visibility="hidden";
//             // zScore.style.visibility="hidden";
//             // zScoreImg.style.visibility="hidden";
//             // zHeat.style.visibility="hidden";
//             // zHeatImg.style.visibility="hidden";
//         }



//         // const h1a = document.createElement('h1');
//         // const h1b = document.createElement('h1');
//         // const body = document.querySelector('body');
//         // body.append(h1a);
//         // body.append(h1b);
//         // h1a.className = 'heading';
//         // h1a.innerHTML= g[i];
//         // h1b.className = 'heading2';
//         // h1b.innerHTML= 'xyz';
//         // const heading = document.querySelector('.heading');

//     }
// }

function timeSince(date) {
    var seconds = date / 1000;
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


// var sideNav = document.querySelector('.side-nav');
// window.onscroll = function () { 
//     "use strict";
//     if (document.body.scrollTop >= 20 && document.documentElement.clientWidth<600) {
//       sideNav.style.paddingTop= '88.9vh';
//     } 
//     else {
//       sideNav.style.paddingTop= '88.9vh';
//     }
// };

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

