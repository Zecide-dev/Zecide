// const { load } = require("dotenv/types");

const myHeaders = new Headers();
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// var token = getCookie('token');
var token = localStorage.getItem("jwttoken");
// myHeaders.append('Content-Type', 'application/json');
myHeaders.append('authorization', 'Token ' + token);
var userData;

// console.log(myHeaders)
// var userInfo;

function userBio() {

    fetch('http://localhost:8000/users/current', {
        method: 'get',
        headers: myHeaders
    }).then(response => response.json())
        .then((usr) => {
            userData = usr;
            console.log(userData)
            document.getElementById('firstName').innerHTML = userData.user.UserName;

        }
        )
    // return userInfo;



}
userBio();
function fetchPostData() {
    var dataset;
    fetch('http://localhost:8000/Posts/0', {
        method: 'get',
        headers: myHeaders
    })
        .then(response => response.json())
        .then(data => useData(data))
}

fetchPostData();
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

        if (d[i].Content === undefined) {
            feedProfilePic.setAttribute('src', '/src/images/default-profile-picture.jpg');
            name.innerHTML = d[i].Author.UserName;
            var dateData = d[i].date;
            var date1 = Date.parse(dateData);
            var date2 = Date.now();
            var dateDiff = date2 - date1;
            postedOn.innerHTML = timeSince(dateDiff) + " ago";
            feedVerified.setAttribute('src', '/src/images/verified.svg');
            // zScoreImg.setAttribute('src', '/src/images/z-score.svg');
            // zScore.innerHTML = d[i].Author.WeightNum.toPrecision(3);
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

            let receivedComments = document.createElement('div')
            receivedComments.className = "list-group"
            receivedComments.setAttribute('id', 'recCom');

            cfetch[i] = 1;
            hide[i] = 1;
            var resC = 1;
            var commentCounter = d[i].comments.length;


            function showcomm() {
                console.log('show comm');
                let postid = data[i]._id;



                if (hide[i] == 1) {
                    receivedComments.style.display = "inline";
                    hide[i] = 0;
                    if (cfetch[i] == 1) {
                        fetch('http://localhost:8000/Posts/' + postid + '/comment', {
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
                fetch('http://localhost:8000/Posts/' + postid + '/comment', {
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
                fetch('http://localhost:8000/Posts/' + postid + '/Down', {
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
                fetch('http://localhost:8000/Posts/' + postid + '/Up', {
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
            feedProfilePic.setAttribute('src', '/src/images/default-profile-picture.jpg');
            name.innerHTML = d[i].NewsSource;
            var dateData = d[i].PublishedAt;
            var date1 = Date.parse(dateData);
            var date2 = Date.now();
            var dateDiff = date2 - date1;
            postedOn.innerHTML = timeSince(dateDiff) + " ago";
            feedVerified.setAttribute('src', '/src/images/verified.svg');
            //zScoreImg.setAttribute('src', '/src/images/z-score.svg');
            //zScore.innerHTML=d[i].Author.WeightNum.toPrecision(3);
            //zHeatImg.setAttribute('src', '/src/images/z-heat.svg');
            //zHeat.innerHTML=d[i].Author.Weightage.toPrecision(3);
            feedPostLink.setAttribute('href', d[i].Url);
            feedPostText.innerHTML = d[i].Content;
            feedPostImg.setAttribute('src', d[i].UrlToImage);
            upvoteImg.setAttribute('src', '/src/images/upvote.svg');
            upvoteCount[i].innerHTML = d[i].UpVote.length;
            downvoteImg.setAttribute('src', '/src/images/downvote.svg');
            downvoteCount[i].innerHTML = d[i].DownVote.length;
            commentsImg.setAttribute('src', '/src/images/comments.svg');
            commentsCount[i].innerHTML = d[i].comments.length + " comments";
            userImg.setAttribute('src', '/src/images/default-profile-picture.jpg');
            commentInput[i].setAttribute('placeholder', 'Write a comment..');
            commentPost.setAttribute('src', '/src/images/send.svg');
            feedVerified.style.visibility = "hidden";
            zScore.style.visibility = "hidden";
            zScoreImg.style.visibility = "hidden";
            zHeat.style.visibility = "hidden";
            zHeatImg.style.visibility = "hidden";
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