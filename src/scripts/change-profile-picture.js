const form = document.getElementById('cpp');
const myHeadersPictures = new Headers();

// var token = getCookie('token');
// 
var token = localStorage.getItem("jwttoken");
myHeadersPictures.append('authorization', 'Token ' + token);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    console.log(formData);
    fetch('https://www.backend.zecide.com/Users/update', {
        method: 'POST',
        headers: myHeadersPictures,
        body: formData
    })
    .then(response => response.json())
    .then(data => {console.log(data)})
});