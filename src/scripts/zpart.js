let backendBaseURL = 'http://localhost:8000/';

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
  
var preloader = document.querySelector('.preloader');

window.addEventListener('load', function(){
  // preloader.style.display= 'none';
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


// SNIPPETS HERE =>

let snippetId;


let snippetTitle = document.getElementById('snippet-title');
let snippetContent = document.getElementById('snippet-content');
let fetchingData = document.getElementById('fetching-data');
let snippetDiv = document.getElementById('snippet-div');

function getSnippet() {
  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Z/Snippet';
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let fetchedData = JSON.parse(xmlHttp.responseText);
      snippetTitle.innerText = fetchedData.Title;
      snippetContent.innerText = fetchedData.Content;
      snippetId = fetchedData._id;
      console.log(snippetId);

      fetchingData.style.display = 'none';
      snippetDiv.style.display = 'block';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
}

getSnippet();