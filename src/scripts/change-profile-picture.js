const form = document.getElementById('cpp');
const myHeaders = new Headers();

// var token = getCookie('token');
// 
var token = localStorage.getItem("jwttoken");

myHeaders.append('authorization', 'Token ' + token);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch('https://www.backend.zecide.com/Users/update', {
        method: 'POST',
        headers: myHeaders,
        body: formData
    })
});