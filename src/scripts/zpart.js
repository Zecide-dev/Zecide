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

let snippet, questionsArray, questionNum = 0, snippetNum = 0;

let snippetTitle = document.getElementById('snippet-title');
let snippetContent = document.getElementById('snippet-content');
let fetchingData = document.getElementById('fetching-data');
let snippetDiv = document.getElementById('snippet-div');
let showQuestionButton = document.getElementById('show-question');
let snippetQuestionDiv = document.getElementById('snippet-question-div');
let snippetQuestions = document.getElementById('snippet-questions');
let snippetQuestionContent = document.getElementById('snippet-question-content');
let nextQuestion = document.getElementById('next-question');
let previousQuestion = document.getElementById('previous-question');
let nextSnippet = document.getElementById('next-snippet');
let thankYouDiv = document.getElementById('thank-you-div');

function getSnippet() {
  // Formatting Question div
  questionNum = 0;
  previousQuestion.classList.add('disabled');
  nextQuestion.classList.remove('disabled');
  nextSnippet.style.display = 'none'
  snippetQuestions.innerHTML = '';

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Z/Snippet';
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      snippet = JSON.parse(xmlHttp.responseText);
      console.log(snippet);
      snippetTitle.innerText = snippet.Title;
      snippetContent.innerText = snippet.Content;
      snippetQuestionContent.innerText = snippet.Content;

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

function createQuestion() {
  let mainDiv = document.createElement('div');
  let p = document.createElement('p');
  let div = document.createElement('div');

  p.setAttribute('id', 'snippet-question-' + questionNum);
  div.setAttribute('id', 'snippet-question-options-' + questionNum);
  div.setAttribute('class', 'q-options')
  mainDiv.setAttribute('id', 'snippet-question-' + questionNum + '-div');

  let question = questionsArray[questionNum]

  p.innerText = question.Question;
  // Adding Options
  let values = ['A', 'B', 'C', 'D', 'E'];
  for (let i = 0; i < question.Answer.length; i++) {
    let button = document.createElement('button');
    let buttonId = 'button-' + questionNum + '-' + i;
    button.setAttribute('id', buttonId);
    button.setAttribute('onclick', 'submitAnswer(\'' + buttonId + '\', \'' + values[i] + '\')');
    button.innerText = question.Answer[i].Value;
    div.append(button);
  }

  mainDiv.append(p);
  mainDiv.append(div);
  return mainDiv;
}

function submitAnswer(buttonId, selectedAns) {
  console.log('clicked');
  snippetQuestionDiv.style.display = 'none';
  fetchingData.style.display = 'block';
  
  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Z/Answer/' + snippet._id +  '/' + questionsArray[questionNum]._id + '?Answer=' + selectedAns;
  console.log(url);
  
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let fetchedData = JSON.parse(xmlHttp.responseText);
      console.log(fetchedData);
      
      // linear-gradient(60deg, #f3faff 50%, white 50%)
      let button = document.getElementById(buttonId);
      let int = Number(fetchedData.FeedBack) * 100;
      button.style.background = 'linear-gradient(120deg, #f3faff ' + int + '%, white ' + (100 - int) + '%)';

      fetchingData.style.display = 'none';
      snippetQuestionDiv.style.display = 'block';
    }
    else console.log("error");
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6InN4dHlhbSIsImlkIjoiNWZlZjM0M2U2OTU1YjBjNjQ4ZDA5MGFhIiwiZXhwIjozMTcxMjU1OTgwNzIsImlhdCI6MTYwOTUyMjIxNX0.0B422CqU9ov8ZsNke2ijJl8cdlyNUoHmtgr8SQ1z46o');
  xmlHttp.send(null);

  let button = document.getElementById(buttonId);

  button.style.width
}

showQuestionButton.addEventListener('click', () => {
  snippetDiv.style.display = 'none';
  fetchingData.style.display = 'block';

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Z/Question/' + snippet._id;
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      questionsArray = JSON.parse(xmlHttp.responseText);
      console.log(questionsArray);
      let questionDiv = createQuestion();

      snippetQuestions.append(questionDiv);

      fetchingData.style.display = 'none';
      snippetQuestionDiv.style.display = 'block';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6InN4dHlhbSIsImlkIjoiNWZlZjM0M2U2OTU1YjBjNjQ4ZDA5MGFhIiwiZXhwIjozMTcxMjU1OTgwNzIsImlhdCI6MTYwOTUyMjIxNX0.0B422CqU9ov8ZsNke2ijJl8cdlyNUoHmtgr8SQ1z46o');
  xmlHttp.send(null);
})

nextQuestion.addEventListener('click', () => {
  if(questionNum == 2) return;
  let prevQuestionDiv = document.getElementById('snippet-question-' + questionNum + '-div');
  prevQuestionDiv.style.display = 'none';
  questionNum++;
  let questionDiv = document.getElementById('snippet-question-' + questionNum + '-div');
  if(questionDiv) questionDiv.style.display = 'block';
  else {
    questionDiv = createQuestion();
    snippetQuestions.append(questionDiv);
  }

  if(questionNum == 2) {
    nextQuestion.classList.add('disabled');
    nextSnippet.style.display = 'block';
  } else {
    previousQuestion.classList.remove('disabled');
  }
})

previousQuestion.addEventListener('click', () => {
  if(questionNum == 0) return;
  let prevQuestionDiv = document.getElementById('snippet-question-' + questionNum + '-div');
  prevQuestionDiv.style.display = 'none';
  questionNum--;
  let questionDiv = document.getElementById('snippet-question-' + questionNum + '-div');
  if(questionDiv) questionDiv.style.display = 'block';
  else {
    questionDiv = createQuestion();
    snippetQuestions.append(questionDiv);
  }

  if(questionNum == 1) {
    nextQuestion.classList.remove('disabled');
    nextSnippet.style.display = 'none';
  } else {
    previousQuestion.classList.add('disabled');
  }
})

nextSnippet.addEventListener('click', () => {
  if(snippetNum == 2) {
    snippetQuestionDiv.style.display = 'none';
    thankYouDiv.style.display = 'initial';
    return;
  }

  snippetQuestionDiv.style.display = 'none';
  fetchingData.style.display = 'block';

  snippetNum++;

  getSnippet();
})