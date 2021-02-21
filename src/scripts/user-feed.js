
// const { default: fetch } = require("node-fetch");

let backendbaseurl = "https://www.backend.zecide.com";

const myHeaders = new Headers();
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// var token = getCookie('token');
var token = localStorage.getItem("jwttoken");
var user_img = localStorage.getItem("userpicture");
var user_name=localStorage.getItem('usernam');
// myHeaders.append('Content-Type', 'application/json');
myHeaders.append('authorization', 'Token ' + token);
// var userData;

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

// updating navbar image
let navbarImg=document.getElementsByClassName('dropdown-img');
navbarImg[0].setAttribute("src",user_img);

// }
// userBio();
var pageNo = 0;
function fetchPostData() {
    var dataset;
    fetch(backendbaseurl + '/Posts/' + pageNo, {
        method: 'get',
        headers: myHeaders
    })
        .then(response => response.json())
        .then(data => useData(data))
}

fetchPostData();

$(window).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPos = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPos) / scrollHeight < 0.01) {
        pageNo = pageNo + 1;
        console.log("bottom!");
        fetchPostData();
    }
});
// console.log(postBody)

// function postButton() {

//     const form = document.getElementById('new-post');
//         console.log(form);
//         const formData = new FormData(form);
//         console.log(formData);
//         fetch(backendbaseurl+'/Posts/create', {
//             method: 'POST',
//             headers: myHeaders,
//             body: formData
//         })
// };
const form = document.getElementById('new-post');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    myPostHeaders = new Headers()
    myPostHeaders.append('authorization', 'Token ' + token);
    myPostHeaders.append('Content-Type', 'application/json');

    var messageText=form.elements[0].value;
    var infoObject = { "message": messageText};
    var info = {"user": infoObject};
    fetch(backendbaseurl + '/Posts/create', {
        method: 'POST',
        headers: myPostHeaders,
        body: JSON.stringify(info)
    })
});




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

// getUsername();

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
        // var upvoteImg = document.createElement('img');
        var upvoteIconSpan=document.createElement('span');
        var upvoteIcon= document.createElement('i');
        upvoteIcon.setAttribute("id","upvote-"+i);
        upvoteCount[i] = document.createElement('span');
        var downvote = document.createElement('div');
        // var downvoteImg = document.createElement('img');
        var downvoteIconSpan=document.createElement('span');
        var downvoteIcon= document.createElement('i');
        downvoteIcon.setAttribute("id","downvote-"+i);
        downvoteCount[i] = document.createElement('span');
        
        var comments = document.createElement('div');
        var commentsImg = document.createElement('img');
        commentsCount[i] = document.createElement('span');
        feedCardComments[i] = document.createElement('div');
        var userImg = document.createElement('img');
        commentInput[i] = document.createElement('input');
        var commentPost = document.createElement('img');

        let receivedComments = document.createElement('div')
        receivedComments.className = "list-group"
        receivedComments.setAttribute('id', 'recCom');

        cardContainer.append(feedCard);
        feedCard.append(feedCardTop);
        feedCard.append(feedPostLink);
        feedCard.append(feedCardBottom);
        feedCard.append(receivedComments);
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
        // upvote.append(upvoteImg);
        upvote.append(upvoteIconSpan);
        upvoteIconSpan.append(upvoteIcon);
        upvote.append(upvoteCount[i]);
        // downvote.append(downvoteImg);
        downvote.append(downvoteIconSpan);
        downvoteIconSpan.append(downvoteIcon);
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
        // upvoteImg.className = 'upvote-img';
        upvoteIconSpan.className='upvoteIcon-span';
        upvoteIcon.className= 'fas fa-caret-up fa-lg voteIcon';
        upvoteCount[i].className = 'upvote-count';
        downvote.className = 'downvote';
        // downvoteImg.className = 'downvote-img';
        downvoteIconSpan.className='upvoteIcon-span';
        downvoteIcon.className= 'fas fa-caret-down fa-lg voteIcon';
        downvoteCount[i].className = 'downvote-count';
        comments.className = 'comments';
        commentsImg.className = 'comments-img';
        commentsCount[i].className = 'comments-count';
        feedCardComments[i].className = 'feed-card-comments';
        userImg.className = 'user-img';
        commentInput[i].className = 'comment-input';
        commentPost.className = 'comment-post';

        if (d[i].Content === undefined) {
            feedProfilePic.setAttribute('src', d[i].Author.imgUrl);
            name.innerHTML = d[i].Author.Name;
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
            // upvoteImg.setAttribute('src', '/src/images/upvote.svg');
            upvoteCount[i].innerHTML = d[i].UpVote.length;
            var isAlreadyUpvoted=false;
            for(var k=0;k<d[i].UpVote.length;k++){
                if(d[i].UpVote[k]==user_id){
                    isAlreadyUpvoted=true;
                }
            }
            if(isAlreadyUpvoted){
                upvoteCount[i].classList.add("voted");
                upvoteIcon.classList.add("voted");
            }
            // downvoteImg.setAttribute('src', '/src/images/downvote.svg');
            downvoteCount[i].innerHTML = d[i].DownVote.length;
            var isAlreadyDownvoted=false;
            for(var k=0;k<d[i].DownVote.length;k++){
                if(d[i].DownVote[k]==user_id){
                    isAlreadyDownvoted=true;
                }
            }
            if(isAlreadyDownvoted){
                downvoteCount[i].classList.add("voted");
                downvoteIcon.classList.add("voted");
            }
            commentsImg.setAttribute('src', '/src/images/comments.svg');
            commentsCount[i].innerHTML = d[i].comments.length + " comments";
            userImg.setAttribute('src', user_img);
            commentInput[i].setAttribute('placeholder', 'Write a comment..');
            commentPost.setAttribute('src', '/src/images/send.svg');
            // var postno = d[i];
            upvoteIcon.addEventListener("click", upvotefun);
            downvoteIcon.addEventListener("click", downvotefun);
            commentPost.addEventListener("click", commentfun);
            comments.addEventListener('click', showcomm);
            name.style.cursor = 'pointer';
            name.addEventListener('click', postAuthor);

            
            feedCardComments[i].style.display = 'none';

            cfetch[i] = 1;
            hide[i] = 1;
            var resC = 1;
            // var commentCounter = d[i].comments.length;

            function postAuthor() {
                var openId = d[i].Author.UserID;
                console.log(openId)
                fetch('/view-profile/' + openId).then(() => {
                    window.location.pathname = '/view-profile/' + openId;

                })
            }

            function showcomm() {
                console.log('show comm');
                let postid = data[i]._id;
                feedCardComments[i].style.display = 'flex';




                if (hide[i] == 1) {
                    receivedComments.style.display = "inline";
                    hide[i] = 0;
                    if (cfetch[i] == 1) {
                        fetch(backendbaseurl + '/Posts/' + postid + '/comment', {
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
                                    // breakB.parentNode.insertBefore(receivedComments, breakB.nextSibling)




                                    for (let j = 0; j < usr.usr.comments.length; j++) {
                                        commentOutput[j] = document.createElement('li');
                                        // commentOutput[j].className = 'li';
                                        // console.log(usr.usr.comments[j].comment)
                                        let item = (usr.usr.comments[j]);
                                        
                                        var test = document.createElement('section');
                                        test.setAttribute('id', 'test');

                                        var ul = document.createElement('ul');


                                        receivedComments.appendChild(test);
                                        test.appendChild(ul);
                                        var commentCardTop = document.createElement('div');
                                        var commentCardTopLeft = document.createElement('div');
                                        var commenterImg = document.createElement('img');
                                        var commentCardTopLeft1 = document.createElement('div');
                                        var commenterName = document.createElement('span');
                                        var commentedOn = document.createElement('p');
                                        var li = document.createElement('li');                                
                                        var commentCardMid = document.createElement('div');
                                        var commentPostText = document.createElement('p');
                                        var commentupAndDown = document.createElement('div');
                                        var commentupvote = document.createElement('div');
                                        // var commentupvoteImg = document.createElement('img');
                                        // var upvoteImg = document.createElement('img');
                                        var commentupvoteIconSpan=document.createElement('span');
                                        var commentupvoteIcon= document.createElement('i');
                                        commentupvoteIcon.setAttribute("id","commentupvote-"+item._id);
                                        commentupvoteCount = document.createElement('span');
                                        commentupvoteCount.setAttribute("id","commentupvotecount-"+item._id);
                                        var commentdownvote = document.createElement('div');
                                        // var downvoteImg = document.createElement('img');
                                        var commentdownvoteIconSpan=document.createElement('span');
                                        var commentdownvoteIcon= document.createElement('i');
                                        commentdownvoteIcon.setAttribute("id","commentdownvote-"+item._id);
                                        var commentdownvoteCount = document.createElement('span');
                                        commentdownvoteCount.setAttribute("id","commentdownvotecount-"+item._id);
                                        li.className = 'list-group-item list-group-item-secondary';
                                         
                                        ul.appendChild(li);
                                        li.appendChild(commentCardTop);
                                        li.appendChild(commentCardMid);
                                        commentCardTop.appendChild(commentCardTopLeft);
                                        commentCardTopLeft.append(commenterImg);
                                        commentCardTopLeft.append(commentCardTopLeft1);
                                        commentCardTopLeft1.append(commenterName);
                                        commentCardTopLeft1.append(commentedOn);
                                        commentCardMid.appendChild(commentPostText);
                                        li.className= 'comment-card';
                                        commentCardTop.className = 'feed-card-top';
                                        commentCardTopLeft.className = 'feed-card-top-left';
                                        commentCardTopLeft1.className = 'feed-card-top-left-1';
                                        commentedOn.className = 'posted-on';
                                        commenterImg.className = 'feed-profile-pic';
                                        commentCardMid.className = 'comment-card-mid';
                                        commentPostText.className = 'comment-post-text';
                                        commenterImg.setAttribute('src', item.commenter.imgUrl);
                                        // li.appendChild(commenterName);
                                        commenterName.className = 'name';
                                        commenterName.innerHTML = commenterName.innerHTML + item.commenter.Name;
                                        // li.appendChild(commentedOn);
                                        commentedOn.className = 'posted-on';
                                        let dateData = item.date;
                                        let date1 = Date.parse(dateData);
                                        let date2 = Date.now();
                                        let dateDiff = date2 - date1;
                                        commentedOn.innerHTML = timeSince(dateDiff) + " ago";
                                        commentPostText.innerHTML = commentPostText.innerHTML + item.comment
                                        li.appendChild(commentupAndDown);
                                        commentupAndDown.append(commentupvote);
                                        commentupAndDown.append(commentdownvote);                                
                                        // upvote.append(upvoteImg);
                                        commentupvote.append(commentupvoteIconSpan);
                                        commentupvoteIconSpan.append(commentupvoteIcon);
                                        commentupvote.append(commentupvoteCount);
                                        // downvote.append(downvoteImg);
                                        commentdownvote.append(commentdownvoteIconSpan);
                                        commentdownvote.append(commentdownvoteCount);
                                        commentdownvoteIconSpan.append(commentdownvoteIcon);
                                        commentupAndDown.className = 'upanddown';
                                        commentupvote.className = 'upvote';
                                        // commentupvoteImg.className = 'upvote-img';
                                        commentupvoteIconSpan.className='upvoteIcon-span';
                                        commentupvoteIcon.className= 'fas fa-caret-up fa-lg voteIcon';
                                        commentdownvote.className = 'downvote';
                                        // downvoteImg.className = 'downvote-img';
                                        commentdownvoteIconSpan.className='upvoteIcon-span';
                                        commentdownvoteIcon.className= 'fas fa-caret-down fa-lg voteIcon';
                                        commentupvoteCount.className = 'upvote-count';
                                        // commentdownvote.className = 'downvote';
                                        // commentdownvoteImg.className = 'downvote-img';
                                        commentdownvoteCount.className = 'downvote-count';
                                        
                                        // console.log(item);
                                        var isAlreadyUpvotedComment=false;
                                        for(var k=0;k<item.Upvote.length;k++){
                                            if(item.Upvote[k]==user_id){
                                                isAlreadyUpvotedComment=true;
                                            }
                                        }
                                        if(isAlreadyUpvotedComment){
                                            commentupvoteCount.classList.add("voted");
                                            commentupvoteIcon.classList.add("voted");
                                        }
                                        // downvoteCount[i].innerHTML = d[i].DownVote.length;
                                        var isAlreadyDownvotedComment=false;
                                        for(var k=0;k<item.Downvote.length;k++){
                                            if(item.Downvote[k]==user_id){
                                                isAlreadyDownvotedComment=true;
                                            }
                                        }
                                        if(isAlreadyDownvotedComment){
                                            commentdownvoteCount.classList.add("voted");
                                            commentdownvoteIcon.classList.add("voted");
                                        }
                                        commentupvoteCount.innerHTML = item.Upvote.length;
                                        // commentdownvoteImg.setAttribute('src', '/src/images/downvote.svg');
                                        commentdownvoteCount.innerHTML = item.Downvote.length;

                                        commentupvoteIcon.addEventListener("click", commentupvotefun);
                                        commentdownvoteIcon.addEventListener("click", commentdownvotefun);
                                        commenterName.style.cursor = 'pointer';
                                        commenterName.addEventListener('click', commentAuthor);

                                        function commentAuthor() {
                                            var openId = item.commenter._id;
                                            console.log(openId)
                                            fetch('/view-profile/' + openId).then(() => {
                                                window.location.pathname = '/view-profile/' + openId;
                            
                                            })
                                        }

                                        function commentdownvotefun() {
                                            console.log('Comment Downvoted');
                            
                                            let postid = data[i]._id;
                                            var commentupvoteCountselected=document.getElementById("commentupvotecount-"+item._id);
                                            var commentdownvoteCountselected=document.getElementById("commentdownvotecount-"+item._id);
                                            // commentdownvoteCount.innerHTML = parseInt(commentdownvoteCount.innerHTML) + 1;
                            
                                            var isDownVoted=false;
                                            // data[i].UpVote.length = data[i].UpVote.length + 1;
                                            let upcount = item.Upvote.length;
                                            let downcount= item.Downvote.length;
                                            var k=0;
                                            for(;k<downcount;k++){
                                                if(item.Downvote[k]==user_id){
                                                    isDownVoted=true;
                                                    break;
                                                }
                                            }
                                            if(isDownVoted){  
                                                console.log("already downvoted");
                                                this.classList.remove("voted");
                                                commentdownvoteCountselected.classList.remove("voted");
                                                item.Downvote.splice(k,1);
                                                // data[i].UpVote.length = data[i].UpVote.length - 1;
                                                downcount=item.Downvote.length;
                                            }else{
                                                item.Downvote.push(user_id);
                                                // data[i].UpVote.length = data[i].UpVote.length + 1;
                                                downcount=item.Downvote.length;
                                                this.classList.add("voted");
                                                commentdownvoteCountselected.classList.add("voted");
                                        
                                                if(toCheckUpVotedComment()){
                                                    var upVoteIconComment=document.getElementById("commentupvote-"+item._id);
                                                    commentupvoteCountselected.classList.remove("voted");
                                                    upcount=item.Upvote.length;
                                                    commentupvoteCountselected.innerHTML=upcount;
                                                    upVoteIconComment.classList.remove("voted");
                                                }
                                                
                                            }
                                            commentdownvoteCountselected.innerHTML = downcount;

                                            fetch(backendbaseurl + '/Posts/' + postid + '/DownVote/' + item._id, {
                                                method: 'get',
                                                headers: myHeaders
                                            })
                                                .then(response => response.json())
                                                .then(() => {
                                                })
                                        }
                            
                                        function commentupvotefun() {
                            
                                            console.log('Comment Upvoted');
                                            console.log(item);
                                            var commentupvoteCountselected=document.getElementById("commentupvotecount-"+item._id);
                                            var commentdownvoteCountselected=document.getElementById("commentdownvotecount-"+item._id);
                                            let postid = data[i]._id;
                                            // commentupvoteCount.innerHTML = parseInt(commentupvoteCount.innerHTML) + 1;
                                        
                                            var isUpVoted=false;
                                            // data[i].UpVote.length = data[i].UpVote.length + 1;
                                            let upcount = item.Upvote.length;
                                            let downcount= item.Downvote.length;
                                            var k=0;
                                            for(;k<upcount;k++){
                                                if(item.Upvote[k]==user_id){
                                                    isUpVoted=true;
                                                    break;
                                                }
                                            }
                                            if(isUpVoted){  
                                                console.log("already upvoted");
                                                this.classList.remove("voted");
                                                commentupvoteCountselected.classList.remove("voted");
                                                item.Upvote.splice(k,1);
                                                // data[i].UpVote.length = data[i].UpVote.length - 1;
                                                upcount=item.Upvote.length;
                                            }else{
                                                item.Upvote.push(user_id);
                                                // data[i].UpVote.length = data[i].UpVote.length + 1;
                                                upcount=item.Upvote.length;
                                                this.classList.add("voted");
                                                commentupvoteCountselected.classList.add("voted");
                                        
                                                if(toCheckDownVotedComment()){
                                                    var downVoteIconComment=document.getElementById("commentdownvote-"+item._id);
                                                    commentdownvoteCountselected.classList.remove("voted");
                                                    downcount=item.Downvote.length;
                                                    commentdownvoteCountselected.innerHTML=downcount;
                                                    downVoteIconComment.classList.remove("voted");
                                                }
                                                
                                            }
                                            commentupvoteCountselected.innerHTML = upcount;

                                            fetch(backendbaseurl + '/Posts/' + postid + '/UpVote/' + item._id, {
                                                method: 'get',
                                                headers: myHeaders
                                            })
                                                .then(response => response.json())
                                                .then(() => {
                                                })
                                        }

                                        function toCheckDownVotedComment(){
                                            var isDownVoted=false;
                                            let downcount = item.Downvote.length;
                                            var k=0;
                                            for(;k<downcount;k++){
                                                if(item.Downvote[k]==user_id){
                                                    isDownVoted=true;
                                                    break;
                                                }
                                            }
                                            item.Downvote.splice(k,1);
                                            return isDownVoted;
                                        }
                                        function toCheckUpVotedComment(){
                                            var isUpVoted=false;
                                            // data[i].UpVote.length = data[i].UpVote.length + 1;
                                            let upcount = item.Upvote.length;
                                            var k=0;
                                            for(;k<upcount;k++){
                                                if(item.Upvote[k]==user_id){
                                                    isUpVoted=true;
                                                    break;
                                                }
                                            }
                                            item.Upvote.splice(k,1);
                                            return isUpVoted;
                                        }
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
                    feedCardComments[i].style.display = 'none';



                }

            }

            function commentfun() 
            {
                if(commentInput[i].value != "")
                {                
                    console.log('commented')
                    let postid = data[i]._id;
                    let commentText = commentInput[i].value;
                    console.log(commentText);
                    commentInput[i].value = '';
                    d[i].comments.length = d[i].comments.length + 1;

                    let commcount = d[i].comments.length;
                    commentsCount[i].innerHTML = (commcount) + " comments";


                    let infoObject = { "comment": commentText };
                    myCommHeaders = new Headers()
                    myCommHeaders.append('authorization', 'Token ' + token);
                    myCommHeaders.append('Content-Type', 'application/json');


                    
                    fetch(backendbaseurl + '/Posts/' + postid + '/comment', {
                        method: 'POST',
                        headers: myCommHeaders,
                        body: JSON.stringify(infoObject)
                    })
                        .then(response => response.json())
                        .then((com) => {

                            var test = document.createElement('section');
                            test.setAttribute('id', 'test');

                            var ul = document.createElement('ul');


                            receivedComments.appendChild(test);
                            test.appendChild(ul);
                            var commentCardTop = document.createElement('div');
                            var commentCardTopLeft = document.createElement('div');
                            var commenterImg = document.createElement('img');
                            var commentCardTopLeft1 = document.createElement('div');
                            var commenterName = document.createElement('span');
                            var commentedOn = document.createElement('p');
                            var li = document.createElement('li');                                
                            var commentCardMid = document.createElement('div');
                            var commentPostText = document.createElement('p');
                            var commentupAndDown = document.createElement('div');
                            var commentupvote = document.createElement('div');
                            // var commentupvoteImg = document.createElement('img');
                            var commentupvoteIconSpan=document.createElement('span');
                            var commentupvoteIcon= document.createElement('i');
                            commentupvoteIcon.setAttribute("id","commentupvote-"+i);
                            commentupvoteCount = document.createElement('span');
                            commentupvoteCount.setAttribute("id","commentupvotecount-"+i);
                            var commentdownvote = document.createElement('div');
                            // var downvoteImg = document.createElement('img');
                            var commentdownvoteIconSpan=document.createElement('span');
                            var commentdownvoteIcon= document.createElement('i');
                            commentdownvoteIcon.setAttribute("id","commentdownvote-"+i);
                            var commentdownvoteCount = document.createElement('span');
                            commentdownvoteCount.setAttribute("id","commentdownvotecount-"+i);
                            li.className = 'list-group-item list-group-item-secondary';

                            ul.appendChild(li);
                            
                            li.appendChild(commentCardTop);
                            li.appendChild(commentCardMid);
                            commentCardTop.appendChild(commentCardTopLeft);
                            commentCardTopLeft.append(commenterImg);
                            commentCardTopLeft.append(commentCardTopLeft1);
                            commentCardTopLeft1.append(commenterName);
                            commentCardTopLeft1.append(commentedOn);
                            commentCardMid.appendChild(commentPostText);
                            li.className= 'comment-card';
                            commentCardTop.className = 'feed-card-top';
                            commentCardTopLeft.className = 'feed-card-top-left';
                            commentCardTopLeft1.className = 'feed-card-top-left-1';
                            commentedOn.className = 'posted-on';
                            commenterImg.className = 'feed-profile-pic';
                            commentCardMid.className = 'comment-card-mid';
                            commentPostText.className = 'comment-post-text';
                            commenterImg.setAttribute('src', user_img);
                            
                            // li.appendChild(commenterName);
                            commenterName.className = 'name';
                            commenterName.innerHTML = commenterName.innerHTML + user_name;
                            // li.appendChild(commentedOn);
                            commentedOn.className = 'posted-on';
                            // let dateData = item.date;
                            let date1 = Date.now();
                            let date2 = Date.now();
                            let dateDiff = date2 - date1;
                            commentedOn.innerHTML = timeSince(dateDiff) + " ago";
                            commentPostText.innerHTML = commentPostText.innerHTML + commentText;
                            li.appendChild(commentupAndDown);
                            commentupAndDown.append(commentupvote);
                            commentupAndDown.append(commentdownvote);

                            commentupvote.append(commentupvoteIconSpan);
                            commentupvoteIconSpan.append(commentupvoteIcon);
                            commentupvote.append(commentupvoteCount);
                            // downvote.append(downvoteImg);
                            commentdownvote.append(commentdownvoteIconSpan);
                            commentdownvote.append(commentdownvoteCount);
                            commentdownvoteIconSpan.append(commentdownvoteIcon);
                            commentupAndDown.className = 'upanddown';
                            commentupvote.className = 'upvote';
                            // commentupvoteImg.className = 'upvote-img';
                            commentupvoteIconSpan.className='upvoteIcon-span';
                            commentupvoteIcon.className= 'fas fa-caret-up fa-lg voteIcon';
                            commentdownvote.className = 'downvote';
                            // downvoteImg.className = 'downvote-img';
                            commentdownvoteIconSpan.className='upvoteIcon-span';
                            commentdownvoteIcon.className= 'fas fa-caret-down fa-lg voteIcon';
                            commentupvoteCount.className = 'upvote-count';
                            // commentdownvote.className = 'downvote';
                            // commentdownvoteImg.className = 'downvote-img';
                            commentdownvoteCount.className = 'downvote-count';
                            
                            // commentupvoteImg.setAttribute('src', '/src/images/upvote.svg');
                            commentupvoteCount.innerHTML = 0;
                            // commentdownvoteImg.setAttribute('src', '/src/images/downvote.svg');
                            commentdownvoteCount.innerHTML = 0;

                            commentupvoteIcon.addEventListener("click", commentupvotefun);
                            commentdownvoteIcon.addEventListener("click", commentdownvotefun);
                            commenterName.style.cursor = 'pointer';
                            commenterName.addEventListener('click', commentAuthor);

                            function commentAuthor() {
                                var openId = user_id;
                                console.log(openId)
                                fetch('/view-profile/' + openId).then(() => {
                                    window.location.pathname = '/view-profile/' + openId;
                
                                })
                            }

                            function commentdownvotefun() {
                
                                var commentupvoteCountselected=document.getElementById("commentupvotecount-"+i);
                                var commentdownvoteCountselected=document.getElementById("commentdownvotecount-"+i);
                                
                                if(commentdownvoteCountselected.innerHTML== 0){
                                    console.log("comment downvoted");
                                    this.classList.add("voted");
                                    commentdownvoteCountselected.classList.add("voted");
                                    commentdownvoteCountselected.innerHTML=1;
                                    if(commentupvoteCountselected.innerHTML== 1){
                                        var upVoteIconComment=document.getElementById("commentupvote-"+i);
                                        commentupvoteCountselected.innerHTML=0;
                                        upVoteIconComment.classList.remove("voted");
                                        commentupvoteCountselected.classList.remove("voted");
                                    }
                                }else{
                                    console.log("already downvoted");
                                    this.classList.remove("voted");
                                    commentdownvoteCountselected.classList.remove("voted");
                                    commentdownvoteCountselected.innerHTML=0;
                                }
                                

                                fetch(backendbaseurl + '/Posts/' + postid + '/DownVote/' + com.cmt._id, {
                                    method: 'get',
                                    headers: myHeaders
                                })
                                    .then(response => response.json())
                                    .then(() => {
                                    })
                            }
                
                            function commentupvotefun() {
    
                                var commentupvoteCountselected=document.getElementById("commentupvotecount-"+i);
                                var commentdownvoteCountselected=document.getElementById("commentdownvotecount-"+i);
                                
                                if(commentupvoteCountselected.innerHTML== 0){
                                    console.log("upvoted");
                                    this.classList.add("voted");
                                    commentupvoteCountselected.classList.add("voted");
                                    commentupvoteCountselected.innerHTML=1;
                                    if(commentdownvoteCountselected.innerHTML== 1){
                                        var downVoteIconComment=document.getElementById("commentdownvote-"+i);
                                        commentdownvoteCountselected.innerHTML=0;
                                        downVoteIconComment.classList.remove("voted");
                                        commentdownvoteCountselected.classList.remove("voted");
                                    }
                                }else{
                                    console.log("already downvoted");
                                    this.classList.remove("voted");
                                    commentupvoteCountselected.classList.remove("voted");
                                    commentupvoteCountselected.innerHTML=0;
                                }

                                fetch(backendbaseurl + '/Posts/' + postid + '/UpVote/' + com.cmt._id, {
                                    method: 'get',
                                    headers: myHeaders
                                })
                                    .then(response => response.json())
                                    .then(() => {
                                    })
                            }
                        })
                }
            }


            function downvotefun() {
                console.log('Downvoted');

                console.log(user_id);

                let postid = data[i]._id;
                var isDownVoted=false;
                let upcount= data[i].UpVote.length;
                let downcount = data[i].DownVote.length;
                var k=0;
                for(;k<downcount;k++){
                    if(data[i].DownVote[k]==user_id){
                        isDownVoted=true;
                        break;
                    }
                }
                if(isDownVoted){  
                    console.log("already downvoted");
                    this.classList.remove("voted");
                    downvoteCount[i].classList.remove("voted");
                    data[i].DownVote.splice(k,1);
                    downcount=data[i].DownVote.length;
                }else{
                    data[i].DownVote.push(user_id);
                    downcount=data[i].DownVote.length;
                    this.classList.add("voted");
                    downvoteCount[i].classList.add("voted");

                    if(toCheckUpVoted()){
                        var upVoteIconPost=document.getElementById("upvote-"+i);
                        upvoteCount[i].classList.remove("voted");
                        upcount=data[i].UpVote.length;
                        upvoteCount[i].innerHTML=upcount;
                        upVoteIconPost.classList.remove("voted");
                    }
                }
                downvoteCount[i].innerHTML = downcount;



            
                fetch(backendbaseurl + '/Posts/' + postid + '/Down', {
                    method: 'get',
                    headers: myHeaders
                })
                    .then(response => response.json())
                    .then(() => {


                    })


            }

            function upvotefun() {

                console.log('upvoted');
                console.log(user_id);

                let postid = data[i]._id;
                // console.log(data[i].UpVote[0]);
                var isUpVoted=false;
                // data[i].UpVote.length = data[i].UpVote.length + 1;
                let upcount = data[i].UpVote.length;
                let downcount= data[i].DownVote.length;
                var k=0;
                for(;k<upcount;k++){
                    if(data[i].UpVote[k]==user_id){
                        isUpVoted=true;
                        break;
                    }
                }
                if(isUpVoted){  
                    console.log("already upvoted");
                    this.classList.remove("voted");
                    upvoteCount[i].classList.remove("voted");
                    data[i].UpVote.splice(k,1);
                    // data[i].UpVote.length = data[i].UpVote.length - 1;
                    upcount=data[i].UpVote.length;
                }else{
                    data[i].UpVote.push(user_id);
                    // data[i].UpVote.length = data[i].UpVote.length + 1;
                    upcount=data[i].UpVote.length;
                    this.classList.add("voted");
                    upvoteCount[i].classList.add("voted");
            
                    if(toCheckDownVoted()){
                        var downVoteIconPost=document.getElementById("downvote-"+i);
                        downvoteCount[i].classList.remove("voted");
                        downcount=data[i].DownVote.length;
                        downvoteCount[i].innerHTML=downcount;
                        downVoteIconPost.classList.remove("voted");
                    }
                    
                }
                upvoteCount[i].innerHTML = upcount;



                // console.log(data[i].UpVote.length)
                fetch(backendbaseurl + '/Posts/' + postid + '/Up', {
                    method: 'get',
                    headers: myHeaders
                })
                    .then(response => response.json())
                    .then(() => {


                    })

                // console.log(myHeaders)
                // d[i].UpVote.length++;


            }
            function toCheckDownVoted(){
                var isDownVoted=false;
                let downcount = data[i].DownVote.length;
                var k=0;
                for(;k<downcount;k++){
                    if(data[i].DownVote[k]==user_id){
                        isDownVoted=true;
                        break;
                    }
                }
                data[i].DownVote.splice(k,1);
                return isDownVoted;
            }
            function toCheckUpVoted(){
                var isUpVoted=false;
                // data[i].UpVote.length = data[i].UpVote.length + 1;
                let upcount = data[i].UpVote.length;
                var k=0;
                for(;k<upcount;k++){
                    if(data[i].UpVote[k]==user_id){
                        isUpVoted=true;
                        break;
                    }
                }
                data[i].UpVote.splice(k,1);
                return isUpVoted;
            }
        }
        else {
            
            if (d[i].NewsSource && d[i].PublishedAt && d[i].Url && d[i].Content && d[i].UrlToImage) {
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
                // upvoteImg.setAttribute('src', '/src/images/upvote.svg');
                upvoteIcon.className='fas fa-caret-up fa-lg';
                upvoteCount[i].innerHTML = d[i].UpVote.length;
                var isAlreadyUpvoted=false;
                for(var k=0;k<d[i].UpVote.length;k++){
                    if(d[i].UpVote[k]==user_id){
                        isAlreadyUpvoted=true;
                    }
                }
                if(isAlreadyUpvoted){
                    upvoteCount[i].classList.add("voted");
                    upvoteIcon.classList.add("voted");
                }
                // downvoteImg.setAttribute('src', '/src/images/downvote.svg');
                downvoteIcon.className='fas fa-caret-down fa-lg';
                downvoteCount[i].innerHTML = d[i].DownVote.length;
                var isAlreadyDownvoted=false;
                for(var k=0;k<d[i].DownVote.length;k++){
                    if(d[i].DownVote[k]==user_id){
                        isAlreadyDownvoted=true;
                    }
                }
                if(isAlreadyDownvoted){
                    downvoteCount[i].classList.add("voted");
                    downvoteIcon.classList.add("voted");
                }
                commentsImg.setAttribute('src', '/src/images/comments.svg');
                commentsCount[i].innerHTML = d[i].comments.length + " comments";
                userImg.setAttribute('src', user_img);
                commentInput[i].setAttribute('placeholder', 'Write a comment..');
                commentPost.setAttribute('src', '/src/images/send.svg');
                feedVerified.style.visibility = "hidden";
                zScore.style.visibility = "hidden";
                zScoreImg.style.visibility = "hidden";
                zHeat.style.visibility = "hidden";
                zHeatImg.style.visibility = "hidden";
                upvoteIcon.addEventListener("click", upvotefun);
                downvoteIcon.addEventListener("click", downvotefun);
                commentPost.addEventListener("click", commentfun);
                comments.addEventListener('click', showcomm);

                let receivedComments = document.createElement('div')
                receivedComments.className = "list-group"
                receivedComments.setAttribute('id', 'recCom');
                feedCardComments[i].style.display = 'none';

                cfetch[i] = 1;
                hide[i] = 1;
                var resC = 1;
                // var commentCounter = d[i].comments.length;


                function showcomm() {
                    console.log('show comm');
                    let postid = data[i]._id;
                    feedCardComments[i].style.display = 'flex';




                    if (hide[i] == 1) {
                        receivedComments.style.display = "inline";
                        hide[i] = 0;
                        if (cfetch[i] == 1) {
                            fetch(backendbaseurl + '/Insights/' + postid + '/comment', {
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
                                            let item = (usr.usr.comments[j]);

                                            var test = document.createElement('section');
                                            test.setAttribute('id', 'test');

                                            var ul = document.createElement('ul');


                                            receivedComments.appendChild(test);
                                            test.appendChild(ul);
                                            var commentCardTop = document.createElement('div');
                                            var commentCardTopLeft = document.createElement('div');
                                            var commenterImg = document.createElement('img');
                                            var commentCardTopLeft1 = document.createElement('div');
                                            var commenterName = document.createElement('span');
                                            var commentedOn = document.createElement('p');
                                            var li = document.createElement('li');                                
                                            var commentCardMid = document.createElement('div');
                                            var commentPostText = document.createElement('p');
                                            var commentupAndDown = document.createElement('div');
                                            var commentupvote = document.createElement('div');
                                            // var commentupvoteImg = document.createElement('img');
                                            var commentupvoteIconSpan=document.createElement('span');
                                            var commentupvoteIcon= document.createElement('i');
                                            commentupvoteIcon.setAttribute("id","commentupvote-"+item._id);
                                            commentupvoteCount = document.createElement('span');
                                            commentupvoteCount.setAttribute("id","commentupvotecount-"+item._id);
                                            var commentdownvote = document.createElement('div');
                                            // var downvoteImg = document.createElement('img');
                                            var commentdownvoteIconSpan=document.createElement('span');
                                            var commentdownvoteIcon= document.createElement('i');
                                            commentdownvoteIcon.setAttribute("id","commentdownvote-"+item._id);
                                            var commentdownvoteCount = document.createElement('span');
                                            commentdownvoteCount.setAttribute("id","commentdownvotecount-"+item._id);
                                            li.className = 'list-group-item list-group-item-secondary';
                                            
                                            ul.appendChild(li);
                                            li.appendChild(commentCardTop);
                                            li.appendChild(commentCardMid);
                                            commentCardTop.appendChild(commentCardTopLeft);
                                            commentCardTopLeft.append(commenterImg);
                                            commentCardTopLeft.append(commentCardTopLeft1);
                                            commentCardTopLeft1.append(commenterName);
                                            commentCardTopLeft1.append(commentedOn);
                                            commentCardMid.appendChild(commentPostText);
                                            li.className= 'comment-card';
                                            commentCardTop.className = 'feed-card-top';
                                            commentCardTopLeft.className = 'feed-card-top-left';
                                            commentCardTopLeft1.className = 'feed-card-top-left-1';
                                            commentedOn.className = 'posted-on';
                                            commenterImg.className = 'feed-profile-pic';
                                            commentCardMid.className = 'comment-card-mid';
                                            commentPostText.className = 'comment-post-text';
                                            commenterImg.setAttribute('src', item.commenter.imgUrl);
                                            // li.appendChild(commenterName);
                                            commenterName.className = 'name';
                                            commenterName.innerHTML = commenterName.innerHTML + item.commenter.Name;
                                            // li.appendChild(commentedOn);
                                            commentedOn.className = 'posted-on';
                                            let dateData = item.date;
                                            let date1 = Date.parse(dateData);
                                            let date2 = Date.now();
                                            let dateDiff = date2 - date1;
                                            commentedOn.innerHTML = timeSince(dateDiff) + " ago";
                                            commentPostText.innerHTML = commentPostText.innerHTML + item.comment
                                            li.appendChild(commentupAndDown);
                                            commentupAndDown.append(commentupvote);
                                            commentupAndDown.append(commentdownvote);
                                            commentupvote.append(commentupvoteIconSpan);
                                            commentupvoteIconSpan.append(commentupvoteIcon);
                                            commentupvote.append(commentupvoteCount);
                                            // downvote.append(downvoteImg);
                                            commentdownvote.append(commentdownvoteIconSpan);
                                            commentdownvote.append(commentdownvoteCount);
                                            commentdownvoteIconSpan.append(commentdownvoteIcon);
                                            commentupAndDown.className = 'upanddown';
                                            commentupvote.className = 'upvote';
                                            // commentupvoteImg.className = 'upvote-img';
                                            commentupvoteIconSpan.className='upvoteIcon-span';
                                            commentupvoteIcon.className= 'fas fa-caret-up fa-lg voteIcon';
                                            commentdownvote.className = 'downvote';
                                            commentupvoteCount.className = 'upvote-count';
                                            commentdownvoteIconSpan.className='upvoteIcon-span';
                                            commentdownvoteIcon.className= 'fas fa-caret-down fa-lg voteIcon';
                                            // commentupvoteCount.className = 'upvote-count';
                                            // commentdownvote.className = 'downvote';
                                            // commentdownvoteImg.className = 'downvote-img';
                                            commentdownvoteCount.className = 'downvote-count';

                                            var isAlreadyUpvoted=false;
                                            for(var k=0;k<item.Upvote.length;k++){
                                                if(item.Upvote[k]==user_id){
                                                    isAlreadyUpvoted=true;
                                                }
                                            }
                                            if(isAlreadyUpvoted){
                                                commentupvoteCount.classList.add("voted");
                                                commentupvoteIcon.classList.add("voted");
                                            }
                                            // downvoteCount[i].innerHTML = d[i].DownVote.length;
                                            var isAlreadyDownvoted=false;
                                            for(var k=0;k<item.Downvote.length;k++){
                                                if(item.Downvote[k]==user_id){
                                                    isAlreadyDownvoted=true;
                                                }
                                            }
                                            if(isAlreadyDownvoted){
                                                commentdownvoteCount.classList.add("voted");
                                                commentdownvoteIcon.classList.add("voted");
                                            }
                                            
                                            // commentupvoteImg.setAttribute('src', '/src/images/upvote.svg');
                                            commentupvoteCount.innerHTML = item.Upvote.length;
                                            // commentdownvoteImg.setAttribute('src', '/src/images/downvote.svg');
                                            commentdownvoteCount.innerHTML = item.Downvote.length;

                                            commentupvoteIcon.addEventListener("click", commentupvotefun);
                                            commentdownvoteIcon.addEventListener("click", commentdownvotefun);
                                            commenterName.style.cursor = 'pointer';
                                            commenterName.addEventListener('click', commentAuthor);

                                            function commentAuthor() {
                                                var openId = user_id;
                                                console.log(openId)
                                                fetch('/view-profile/' + openId).then(() => {
                                                    window.location.pathname = '/view-profile/' + openId;
                                
                                                })
                                            }
    
                                            function commentdownvotefun() {
                                                console.log('Comment Downvoted');
                                
                                                let postid = data[i]._id;
                                                var commentupvoteCountselected=document.getElementById("commentupvotecount-"+item._id);
                                                var commentdownvoteCountselected=document.getElementById("commentdownvotecount-"+item._id);
                                                // commentdownvoteCount.innerHTML = parseInt(commentdownvoteCount.innerHTML) + 1;
                                
                                                var isDownVoted=false;
                                                // data[i].UpVote.length = data[i].UpVote.length + 1;
                                                let upcount = item.Upvote.length;
                                                let downcount= item.Downvote.length;
                                                var k=0;
                                                for(;k<downcount;k++){
                                                    if(item.Downvote[k]==user_id){
                                                        isDownVoted=true;
                                                        break;
                                                    }
                                                }
                                                if(isDownVoted){  
                                                    console.log("already downvoted");
                                                    this.classList.remove("voted");
                                                    commentdownvoteCountselected.classList.remove("voted");
                                                    item.Downvote.splice(k,1);
                                                    // data[i].UpVote.length = data[i].UpVote.length - 1;
                                                    downcount=item.Downvote.length;
                                                }else{
                                                    item.Downvote.push(user_id);
                                                    // data[i].UpVote.length = data[i].UpVote.length + 1;
                                                    downcount=item.Downvote.length;
                                                    this.classList.add("voted");
                                                    commentdownvoteCountselected.classList.add("voted");
                                            
                                                    if(toCheckUpVotedComment()){
                                                        var upVoteIconComment=document.getElementById("commentupvote-"+item._id);
                                                        commentupvoteCountselected.classList.remove("voted");
                                                        upcount=item.Upvote.length;
                                                        commentupvoteCountselected.innerHTML=upcount;
                                                        upVoteIconComment.classList.remove("voted");
                                                    }
                                                    
                                                }
                                                commentdownvoteCountselected.innerHTML = downcount;
    
                                                fetch(backendbaseurl + '/Insights/' + postid + '/' + item._id + '/DownVote/', {
                                                    method: 'get',
                                                    headers: myHeaders
                                                })
                                                    .then(response => response.json())
                                                    .then(() => {
                                                    })
                                            }
                                
                                            function commentupvotefun() {
                                
                                                console.log('Comment Upvoted');
                                                console.log(item);
                                                var commentupvoteCountselected=document.getElementById("commentupvotecount-"+item._id);
                                                var commentdownvoteCountselected=document.getElementById("commentdownvotecount-"+item._id);
                                                let postid = data[i]._id;
                                                // commentupvoteCount.innerHTML = parseInt(commentupvoteCount.innerHTML) + 1;
                                            
                                                var isUpVoted=false;
                                                // data[i].UpVote.length = data[i].UpVote.length + 1;
                                                let upcount = item.Upvote.length;
                                                let downcount= item.Downvote.length;
                                                var k=0;
                                                for(;k<upcount;k++){
                                                    if(item.Upvote[k]==user_id){
                                                        isUpVoted=true;
                                                        break;
                                                    }
                                                }
                                                if(isUpVoted){  
                                                    console.log("already upvoted");
                                                    this.classList.remove("voted");
                                                    commentupvoteCountselected.classList.remove("voted");
                                                    item.Upvote.splice(k,1);
                                                    // data[i].UpVote.length = data[i].UpVote.length - 1;
                                                    upcount=item.Upvote.length;
                                                }else{
                                                    item.Upvote.push(user_id);
                                                    // data[i].UpVote.length = data[i].UpVote.length + 1;
                                                    upcount=item.Upvote.length;
                                                    this.classList.add("voted");
                                                    commentupvoteCountselected.classList.add("voted");
                                            
                                                    if(toCheckDownVotedComment()){
                                                        var downVoteIconComment=document.getElementById("commentdownvote-"+item._id);
                                                        commentdownvoteCountselected.classList.remove("voted");
                                                        downcount=item.Downvote.length;
                                                        commentdownvoteCountselected.innerHTML=downcount;
                                                        downVoteIconComment.classList.remove("voted");
                                                    }
                                                    
                                                }
                                                commentupvoteCountselected.innerHTML = upcount;
    
                                                fetch(backendbaseurl + '/Insights/' + postid +'/' +item._id + '/UpVote/', {
                                                    method: 'get',
                                                    headers: myHeaders
                                                })
                                                    .then(response => response.json())
                                                    .then(() => {
                                                    })
                                            }
    
                                            function toCheckDownVotedComment(){
                                                var isDownVoted=false;
                                                let downcount = item.Downvote.length;
                                                var k=0;
                                                for(;k<downcount;k++){
                                                    if(item.Downvote[k]==user_id){
                                                        isDownVoted=true;
                                                        break;
                                                    }
                                                }
                                                item.Downvote.splice(k,1);
                                                return isDownVoted;
                                            }
                                            function toCheckUpVotedComment(){
                                                var isUpVoted=false;
                                                // data[i].UpVote.length = data[i].UpVote.length + 1;
                                                let upcount = item.Upvote.length;
                                                var k=0;
                                                for(;k<upcount;k++){
                                                    if(item.Upvote[k]==user_id){
                                                        isUpVoted=true;
                                                        break;
                                                    }
                                                }
                                                item.Upvote.splice(k,1);
                                                return isUpVoted;
                                            }

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
                        feedCardComments[i].style.display = 'none';



                    }

                }

                function commentfun() {
                    
                    if(commentInput[i].value != ""){
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
                        data[i].comments.length = data[i].comments.length + 1;
                        let commcount = data[i].comments.length;
                        // upvoteCount[i].innerHTML = upcount;
                        commentsCount[i].innerHTML = (commcount) + " comments";


                        // console.log(data[i].UpVote.length)
                        fetch(backendbaseurl + '/Insights/' + postid + '/comment', {
                            method: 'POST',
                            headers: myCommHeaders,
                            body: JSON.stringify(infoObject)
                        })
                            .then(response => response.json())
                            .then((com) => {

                                var test = document.createElement('section');
                                test.setAttribute('id', 'test');

                                var ul = document.createElement('ul');


                                receivedComments.appendChild(test);
                                test.appendChild(ul);
                    
                                var commentCardTop = document.createElement('div');
                                var commentCardTopLeft = document.createElement('div');
                                var commenterImg = document.createElement('img');
                                var commentCardTopLeft1 = document.createElement('div');
                                var commenterName = document.createElement('span');
                                var commentedOn = document.createElement('p');
                                var li = document.createElement('li');                                
                                var commentCardMid = document.createElement('div');
                                var commentPostText = document.createElement('p');
                                var commentupAndDown = document.createElement('div');
                                var commentupvote = document.createElement('div');
                                // var commentupvoteImg = document.createElement('img');
                                var commentupvoteIconSpan=document.createElement('span');
                                var commentupvoteIcon= document.createElement('i');
                                commentupvoteIcon.setAttribute("id","commentupvote-"+i);
                                commentupvoteCount = document.createElement('span');
                                commentupvoteCount.setAttribute("id","commentupvotecount-"+i);
                                var commentdownvote = document.createElement('div');
                                // var downvoteImg = document.createElement('img');
                                var commentdownvoteIconSpan=document.createElement('span');
                                var commentdownvoteIcon= document.createElement('i');
                                commentdownvoteIcon.setAttribute("id","commentdownvote-"+i);
                                var commentdownvoteCount = document.createElement('span');
                                commentdownvoteCount.setAttribute("id","commentdownvotecount-"+i);
                                li.className = 'list-group-item list-group-item-secondary';
                                    
                                ul.appendChild(li);
                                li.appendChild(commentCardTop);
                                li.appendChild(commentCardMid);
                                commentCardTop.appendChild(commentCardTopLeft);
                                commentCardTopLeft.append(commenterImg);
                                commentCardTopLeft.append(commentCardTopLeft1);
                                commentCardTopLeft1.append(commenterName);
                                commentCardTopLeft1.append(commentedOn);
                                commentCardMid.appendChild(commentPostText);
                                li.className= 'comment-card';
                                commentCardTop.className = 'feed-card-top';
                                commentCardTopLeft.className = 'feed-card-top-left';
                                commentCardTopLeft1.className = 'feed-card-top-left-1';
                                commentedOn.className = 'posted-on';
                                commenterImg.className = 'feed-profile-pic';
                                commentCardMid.className = 'comment-card-mid';
                                commentPostText.className = 'comment-post-text';
                                commenterImg.setAttribute('src', user_img);
                                // li.appendChild(commenterName);
                                commenterName.className = 'name';
                                commenterName.innerHTML = commenterName.innerHTML +user_name;
                                // li.appendChild(commentedOn);
                                commentedOn.className = 'posted-on';
                                let date1 = Date.now();
                                let date2 = Date.now();
                                let dateDiff = date2 - date1;
                                commentedOn.innerHTML = timeSince(dateDiff) + " ago";
                                commentPostText.innerHTML = commentPostText.innerHTML + commentText;
                                li.appendChild(commentupAndDown);
                                commentupAndDown.append(commentupvote);
                                commentupAndDown.append(commentdownvote);

                                commentupvote.append(commentupvoteIconSpan);
                                commentupvoteIconSpan.append(commentupvoteIcon);
                                commentupvote.append(commentupvoteCount);
                                // downvote.append(downvoteImg);
                                commentdownvote.append(commentdownvoteIconSpan);
                                commentdownvote.append(commentdownvoteCount);
                                commentdownvoteIconSpan.append(commentdownvoteIcon);
                                commentupAndDown.className = 'upanddown';
                                commentupvote.className = 'upvote';
                                // commentupvoteImg.className = 'upvote-img';
                                commentupvoteIconSpan.className='upvoteIcon-span';
                                commentupvoteIcon.className= 'fas fa-caret-up fa-lg voteIcon';
                                commentdownvote.className = 'downvote';
                                // downvoteImg.className = 'downvote-img';
                                commentdownvoteIconSpan.className='upvoteIcon-span';
                                commentdownvoteIcon.className= 'fas fa-caret-down fa-lg voteIcon';
                                commentupvoteCount.className = 'upvote-count';
                                // commentdownvote.className = 'downvote';
                                // commentdownvoteImg.className = 'downvote-img';
                                commentdownvoteCount.className = 'downvote-count';
                                    
                                // commentupvoteImg.setAttribute('src', '/src/images/upvote.svg');
                                commentupvoteCount.innerHTML = 0;
                                // commentdownvoteImg.setAttribute('src', '/src/images/downvote.svg');
                                commentdownvoteCount.innerHTML = 0;

                                commentupvoteIcon.addEventListener("click", commentupvotefun);
                                commentdownvoteIcon.addEventListener("click", commentdownvotefun);
                                commenterName.style.cursor = 'pointer';
                                commenterName.addEventListener('click', commentAuthor);

                                function commentAuthor() {
                                    var openId = user_id;
                                    console.log(openId)
                                    fetch('/view-profile/' + openId).then(() => {
                                        window.location.pathname = '/view-profile/' + openId;
                    
                                    })
                                }

                                function commentdownvotefun() {
                
                                    var commentupvoteCountselected=document.getElementById("commentupvotecount-"+i);
                                    var commentdownvoteCountselected=document.getElementById("commentdownvotecount-"+i);
                                    
                                    if(commentdownvoteCountselected.innerHTML== 0){
                                        console.log("comment downvoted");
                                        this.classList.add("voted");
                                        commentdownvoteCountselected.classList.add("voted");
                                        commentdownvoteCountselected.innerHTML=1;
                                        if(commentupvoteCountselected.innerHTML== 1){
                                            var upVoteIconComment=document.getElementById("commentupvote-"+i);
                                            commentupvoteCountselected.innerHTML=0;
                                            upVoteIconComment.classList.remove("voted");
                                            commentupvoteCountselected.classList.remove("voted");
                                        }
                                    }else{
                                        console.log("already downvoted");
                                        this.classList.remove("voted");
                                        commentdownvoteCountselected.classList.remove("voted");
                                        commentdownvoteCountselected.innerHTML=0;
                                    }
                                    
    
                                    fetch(backendbaseurl + '/Insights/' + postid + '/' + com.cmt._id + '/DownVote/', {
                                        method: 'get',
                                        headers: myHeaders
                                    })
                                        .then(response => response.json())
                                        .then(() => {
                                        })
                                }
                    
                                function commentupvotefun() {
        
                                    var commentupvoteCountselected=document.getElementById("commentupvotecount-"+i);
                                    var commentdownvoteCountselected=document.getElementById("commentdownvotecount-"+i);
                                    
                                    if(commentupvoteCountselected.innerHTML== 0){
                                        console.log("upvoted");
                                        this.classList.add("voted");
                                        commentupvoteCountselected.classList.add("voted");
                                        commentupvoteCountselected.innerHTML=1;
                                        if(commentdownvoteCountselected.innerHTML== 1){
                                            var downVoteIconComment=document.getElementById("commentdownvote-"+i);
                                            commentdownvoteCountselected.innerHTML=0;
                                            downVoteIconComment.classList.remove("voted");
                                            commentdownvoteCountselected.classList.remove("voted");
                                        }
                                    }else{
                                        console.log("already downvoted");
                                        this.classList.remove("voted");
                                        commentupvoteCountselected.classList.remove("voted");
                                        commentupvoteCountselected.innerHTML=0;
                                    }
    
                                    fetch(backendbaseurl + '/Insights/' + postid +'/'+ com.cmt._id+ '/UpVote/', {
                                        method: 'get',
                                        headers: myHeaders
                                    })
                                        .then(response => response.json())
                                        .then(() => {
                                        })
                                }

                                

                            })
                    }
                }


                function downvotefun() {
                    console.log('Downvoted');

                    console.log(user_id);

                    let postid = data[i]._id;
                    var isDownVoted=false;
                    let downcount = data[i].DownVote.length;
                    var k=0;
                    for(;k<downcount;k++){
                        if(data[i].DownVote[k]==user_id){
                            isDownVoted=true;
                            break;
                        }
                    }
                    if(isDownVoted){  
                        console.log("already downvoted");
                        this.classList.remove("voted");
                        downvoteCount[i].classList.remove("voted");
                        data[i].DownVote.splice(k,1);
                        downcount=data[i].DownVote.length;
                    }else{
                        data[i].DownVote.push(user_id);
                        downcount=data[i].DownVote.length;
                        this.classList.add("voted");
                        downvoteCount[i].classList.add("voted");

                        if(toCheckUpVoted()){
                            var upVoteIconPost=document.getElementById("upvote-"+i);
                            upvoteCount[i].classList.remove("voted");
                            upcount=data[i].UpVote.length;
                            upvoteCount[i].innerHTML=upcount;
                            upVoteIconPost.classList.remove("voted");
                        }
                    }
                    downvoteCount[i].innerHTML = downcount;



                    // console.log(data[i].UpVote.length)
                    fetch(backendbaseurl + '/Insights/' + postid + '/DownVote', {
                        method: 'get',
                        headers: myHeaders
                    })
                        .then(response => response.json())
                        .then(() => {


                        })


                }

                function upvotefun() {

                    console.log('upvoted');
                    console.log(user_id);
    
                    let postid = data[i]._id;
                    // console.log(data[i].UpVote[0]);
                    var isUpVoted=false;
                    // data[i].UpVote.length = data[i].UpVote.length + 1;
                    let upcount = data[i].UpVote.length;
                    var k=0;
                    for(;k<upcount;k++){
                        if(data[i].UpVote[k]==user_id){
                            isUpVoted=true;
                            break;
                        }
                    }
                    if(isUpVoted){  
                        console.log("already upvoted");
                        this.classList.remove("voted");
                        upvoteCount[i].classList.remove("voted");
                        data[i].UpVote.splice(k,1);
                        // data[i].UpVote.length = data[i].UpVote.length - 1;
                        upcount=data[i].UpVote.length;
                    }else{
                        data[i].UpVote.push(user_id);
                        // data[i].UpVote.length = data[i].UpVote.length + 1;
                        upcount=data[i].UpVote.length;
                        this.classList.add("voted");
                        upvoteCount[i].classList.add("voted");
                        if(toCheckDownVoted()){
                            var downVoteIconPost=document.getElementById("downvote-"+i);
                            downvoteCount[i].classList.remove("voted");
                            downcount=data[i].DownVote.length;
                            downvoteCount[i].innerHTML=downcount;
                            downVoteIconPost.classList.remove("voted");
                        }
                    }
                    upvoteCount[i].innerHTML = upcount;



                    // console.log(data[i].UpVote.length)
                    fetch(backendbaseurl + '/Insights/' + postid + '/UpVote', {
                        method: 'get',
                        headers: myHeaders
                    })
                        .then(response => response.json())
                        .then(() => {


                        })

                    // console.log(myHeaders)
                    // d[i].UpVote.length++;
                    
            
                }

                function toCheckDownVoted(){
                    var isDownVoted=false;
                    let downcount = data[i].DownVote.length;
                    var k=0;
                    for(;k<downcount;k++){
                        if(data[i].DownVote[k]==user_id){
                            isDownVoted=true;
                            break;
                        }
                    }
                    data[i].DownVote.splice(k,1);
                    return isDownVoted;
                }
                function toCheckUpVoted(){
                    var isUpVoted=false;
                    // data[i].UpVote.length = data[i].UpVote.length + 1;
                    let upcount = data[i].UpVote.length;
                    var k=0;
                    for(;k<upcount;k++){
                        if(data[i].UpVote[k]==user_id){
                            isUpVoted=true;
                            break;
                        }
                    }
                    data[i].UpVote.splice(k,1);
                    return isUpVoted;
                }
            }else
            {
                i++;
            }

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