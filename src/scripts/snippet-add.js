let backendBaseURL = 'http://143.110.191.194/';

let jwtToken = localStorage.getItem('jwttoken');

var xmlHttp = new XMLHttpRequest();
let url = backendBaseURL + 'Questions/AllQuestions';
console.log(url);

let questions = document.getElementById('questions');
let fetchingQuestions = document.getElementById('fetching-questions');

xmlHttp.onreadystatechange = function () {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    fetchingQuestions.style.display = 'none';

    let fetchedData = JSON.parse(xmlHttp.responseText);

    for(let i = 0; i < fetchedData.length; i++) {
      let div = document.createElement('div');
      let input = document.createElement('input');
      let textNode = document.createTextNode(fetchedData[i]);

      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', 'question' + (i+1));

      div.append(input);
      div.append(textNode);

      questions.append(div);
    }
  }
}
console.log('getting');
xmlHttp.open("GET", url, true); // true for asynchronous 
xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
xmlHttp.send(null);


// SUBMITTING THE SNIPPET FORM

// let submit = document.getElementById('submit');
// let title = document.getElementById('title');
// let content = document.getElementById('content');
// let magicno = document.getElementById('magicno');

// submit.addEventListener('click', (event) => {
//   event.preventDefault();
//   let returnJSON = {};
//   returnJSON['Title'] = title.value;
//   returnJSON['Content'] = title.content;
//   returnJSON['MagicNo'] = title.magicno;


// })