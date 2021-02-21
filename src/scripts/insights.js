
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
  
  // function getUsername(){
  //   var userName = document.getElementById('user-name');
  //   userName.innerHTML = getCookie("UserName");
  // }
  
  // getUsername();
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
siddharth@zecide.com`, "font-family:monospace");
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

  var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "I didn't quite get that.",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if(input.length > 0) {
      createBubble(input)
    }
  }
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if(input.length > 0) {
    createBubble(input)
  }
}) //end of eventlistener

var createBubble = function(input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble)

  checkInput(input);
}

var checkInput = function(input) {
  hasCorrectInput = false;
  isReaction = false;
  //Checks all text values in possibleInput
  for(var textVal in possibleInput){
    //If user reacts with "yes" and the previous input was in textVal
    if(input == "yes" || input.indexOf("yes") >= 0){
      if(previousInput == textVal) {
        console.log("sausigheid");

        isReaction = true;
        hasCorrectInput = true;
        botResponse(textVal);
      }
    }
    if(input == "no" && previousInput == textVal){
      unkwnCommReaction = "For a list of commands type: Commands";
      unknownCommand("I'm sorry to hear that :(")
      unknownCommand(unkwnCommReaction);
      hasCorrectInput = true;
    }
    //Is a word of the input also in possibleInput object?
    if(input == textVal || input.indexOf(textVal) >=0 && isReaction == false){
			console.log("succes");
      hasCorrectInput = true;
      botResponse(textVal);
		}
	}
  //When input is not in possibleInput
  if(hasCorrectInput == false){
    console.log("failed");
    unknownCommand(unkwnCommReaction);
    hasCorrectInput = true;
  }
}

// debugger;

function botResponse(textVal) {
  //sets previous input to that what was called
  // previousInput = input;

  //create response bubble
  var userBubble = document.createElement('li');
  userBubble.classList.add('bot__output');

  if(isReaction == true){
    if (typeof reactionInput[textVal] === "function") {
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = reactionInput[textVal]();
    } else {
      userBubble.innerHTML = reactionInput[textVal];
    }
  }

  if(isReaction == false){
    //Is the command a function?
    if (typeof possibleInput[textVal] === "function") {
      // console.log(possibleInput[textVal] +" is a function");
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = possibleInput[textVal]();
    } else {
      userBubble.innerHTML = possibleInput[textVal];
    }
  }
  //add list item to chatlist
  chatList.appendChild(userBubble) //adds chatBubble to chatlist

  // reset text area input
  textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
    console.log(response.clientHeight);
  }, 0)
}

function responseImg(e) {
  var image = new Image();

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = "/images/"+e;
  chatList.appendChild(image);

  animateBotOutput()
  if(image.completed) {
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function(){
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
}

//change to SCSS loop
function animateBotOutput() {
  chatList.lastElementChild.style.animationDelay= (animationCounter * animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];
}

// hlep

var possibleInput = {
  // "hlep" : this.help(),
  "help" : function(){
    responseText("You can type a command in the chatbox")
    responseText("Something like &quot;Navvy, please show me Mees&rsquo; best work&quot;")
    responseText("Did you find a bug or problem? Tweet me @MeesRttn")
    commandReset(0);
    return
    },
  "best work" : function(){
    responseText("I will show you Mees' best work!");
    responseText("These are his <a href='#animation'>best animations</a>")
    responseText("These are his <a href='#projects'>best projects</a>")
    responseText("Would you like to see how I was built? (Yes/No)")
    commandReset(1);
    return
    },
  "about" : function(){
    responseText("This is me, Navvy's maker, Mees Rutten");
    responseText("I'm a 22 year old Communication and Multimedia Design student");
    responseText("My ambition is to become a great Creative Front-End Developer");
    responseText("Would you like to know about Mees' vision? (Yes/No)");
    commandReset(2);
    return
    },
  "experience" : function(){
    responseText("Mees has previously worked at:");
    responseText("Cobra Systems as web- developer / designer");
    responseText("BIT Students as web- developer / designer");
    responseText("MediaMonks as a junior Front-end Developer");
    commandReset(3);
    return
  },
  "hobbies" : function(){
    responseText("Mees loves:");
    responseText("Coding complicated chatbots");
    responseText("Family time");
    responseText("Going out with friends");
    responseText("Working out");
    commandReset(4);
    return
  },
  "interests" : function(){
    responseText("Mees loves:");
    responseText("Coding complicated chatbots");
    responseText("Family time");
    responseText("Going out with friends");
    responseText("Working out");
    commandReset(5);
    return
  },
  "vision" : function(){
    responseText("Things I want to learn or do:");
    responseText("Get great at CSS & JS animation");
    responseText("Create 3D browser experiences");
    responseText("Learn Three.js and WebGL");
    responseText("Combine Motion Design with Front-End");
    commandReset(6);
    return
  },
  "contact" : function(){
    responseText("email: <a href='mailto:meesrutten@gmail.com?Subject=Hello%20Mees' target='_top'>send me a message</a>");
    responseText("Twitter: <a href='https://twitter.com/meesrttn'>@MeesRttn</a>");
    commandReset(7);
    return
  },
  "commands" : function(){
    responseText("This is a list of commands Navvy knows:")
    responseText("help, best work, about, vision, experience, hobbies / interests, contact, rick roll");
    commandReset(8);
    return
  },
  "rick roll" : function(){
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
  // work experience
}

var reactionInput = {
  "best work" : function(){
    //Redirects you to a different page after 3 secs
    responseText("On this GitHub page you'll find everything about Navvy");
    responseText("<a href='https://github.com/meesrutten/chatbot'>Navvy on GitHub</a>")
    animationCounter = 1;
    return
  },
  "about" : function(){
    responseText("Things I want to learn or do:");
    responseText("Get great at CSS & JS animation");
    responseText("Create 3D browser experiences");
    responseText("Learn Three.js and WebGL");
    responseText("Combine Motion Design with Front-End");
    animationCounter = 1;
    return
    }
}
