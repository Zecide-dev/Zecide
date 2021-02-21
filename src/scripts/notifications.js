// let backendbaseurl = "https://www.backend.zecide.com";

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
notificationDropdown.addEventListener("click",function(){
    if(isfirstTime){
        fetchNotificationData();
        isfirstTime=false;
    }
})

function useNoti(allNotifications){
    var notifications=allNotifications.notifications;
    console.log(notifications);
    var len = notifications.length;

    let notificationul=document.getElementsByClassName('dropdown-notification-ul')[0];
    console.log(notificationul);
    console.log(allNotifications.notifications.length);  
    for(var i=0;i<len;i++){
        let notificationli=document.createElement('li');
        let notificationDiv=document.createElement('div');
        let notificationImg=document.createElement('img');
        let notificationMsg=document.createElement('p');
        let notificationTime=document.createElement('span');
        
        notificationul.prepend(notificationli);
        notificationli.append(notificationDiv);
        notificationDiv.append(notificationImg);
        notificationDiv.append(notificationMsg);
        notificationDiv.append(notificationTime);

        notificationMsg.innerHTML=notifications[i].message;
        notificationImg.setAttribute('src',notifications[i].icon);
        var dateDataNotification = notifications[i].createdAt;
        var date1 = Date.parse(dateDataNotification);
        var date2 = Date.now();
        var dateDiff = date2-date1;
        notificationTime.innerHTML= timeSince(dateDiff) + " ago";
    }  
}
    
