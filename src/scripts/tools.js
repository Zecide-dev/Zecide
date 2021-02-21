
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
  var user_img = localStorage.getItem("userpicture");
  var user_name=localStorage.getItem('usernam');
  let navbarImg=document.getElementsByClassName('dropdown-img');
  navbarImg[0].setAttribute("src",user_img);
  let namespan=document.getElementById("user-name");
  namespan.innerHTML=user_name;
var preloader = document.querySelector('.preloader');

window.addEventListener('load', function(){
  preloader.style.display= 'none';
  console.log(`%c   ______  _____   _____   _   _____   _____  
  |___  / | ____| /  ___| | | |  _  | | ____| 
     / /  | |__   | |     | | | | | | | |__   
    / /   |  __|  | |     | | | | | | |  __|  
   / /__  | |___  | |___  | | | |_| | | |___  
  /_____| |_____| |_____| |_| |_____/ |_____| 

       
  
         _(____)_
  ___ooO_(_o__o_)_Ooo___
  

Well hello there...
Don’t you have a curious mind, taking a little peek under the hood.
It just so happens we’re always eager to meet curious minds like yours.
Interested in poking into Zecide projects in a MORE in-depth way?
Interested in getting paid for it?

Get in touch with us to know about the opening for our team:
*Insert Email Address*`, "font-family:monospace");
})

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