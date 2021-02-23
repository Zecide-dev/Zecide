let backendbaseurl = "https://www.backend.zecide.com";

var token = localStorage.getItem("jwttoken");
function fetchNotificationData() {
    notificationHeaders = new Headers()
    notificationHeaders.append('authorization', 'Token ' + token);
    notificationHeaders.append('Content-Type', 'application/json');

    fetch(backendbaseurl + '/Notifications/' , {
        method: 'get',
        headers: notificationHeaders
    })
        .then(response => response.json())
        .then(allNotifications => useNoti(allNotifications))
}
var isfirstTime=true;
let notificationDropdown=document.getElementsByClassName("notification")[0];
// notificationDropdown.addEventListener("click",function(){
//     if(isfirstTime){
//         fetchNotificationData();
//         isfirstTime=false;
//     }
// })
if(isfirstTime){
    fetchNotificationData();
    isfirstTime=false;
}


function useNoti(allNotifications){
    var notifications=allNotifications.notifications;
    console.log(notifications);
    var len = notifications.length;

    let notificationul=document.getElementsByClassName('dropdown-notification-ul')[0];
    let notificationNumber=document.getElementsByClassName('notifications-number')[0];
    notificationNumber.innerHTML=len;
    console.log(notificationul);
    console.log(allNotifications.notifications.length);  
    for(var i=0;i<len;i++){
        let notificationli=document.createElement('li');
        let notificationlink=document.createElement('a');
        let notificationImg=document.createElement('img');
        let notificationMsgDiv=document.createElement('div');
        let notificationMsg=document.createElement('p');
        let notificationTime=document.createElement('span');
        
        notificationul.prepend(notificationli);
        notificationli.append(notificationlink);
        notificationlink.append(notificationImg);
        notificationlink.append(notificationMsgDiv);
        notificationMsgDiv.append(notificationMsg);
        notificationMsgDiv.appendChild(notificationTime);

        notificationMsg.innerHTML=notifications[i].message;
        notificationImg.setAttribute('src',notifications[i].icon);
        var dateDataNotification = notifications[i].createdAt;
        var date1 = Date.parse(dateDataNotification);
        var date2 = Date.now();
        var dateDiff = date2-date1;
        notificationTime.innerHTML= timeSince(dateDiff) + " ago";

        // setting attributes
        notificationli.className="noti-li";
        notificationlink.className="noti-div";
        notificationImg.className="noti-img";
        notificationMsgDiv.className="noti-msg-div";
        notificationMsg.className="noti-msg";
        notificationTime.className="noti-time";
        notificationlink.setAttribute('href',"#");
    }  
}

const notificationnavToggle = () => {
    var e = document.getElementById("notification-img"),
        t = document.querySelector(".dropdown-content-notification");
    e.addEventListener("click", () => {
        t.classList.toggle("dropdown-content-active");
        t.classList.toggle('dropdown-content-notification-hide');
    });
};
notificationnavToggle();
    
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