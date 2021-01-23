const form = document.getElementById('bioForm');
const myHeaders = new Headers();

// var token = getCookie('token');
// 
var token = localStorage.getItem("jwttoken");

myHeaders.append('authorization', 'Token ' + token);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData();
    var ptagLine = form.elements[0].value
    var bio = form.elements[1].value
    var prof = form.elements[2].value;

    console.log(prof);
    var place = form.elements[3].value;

    var edu = form.elements[4].value;
    console.log(edu);
    if (ptagLine && bio && prof && place && edu) {



        //to append registration token
        var stat;
        var infoObject = { "TagLine" : ptagLine,"UserBio" :bio, "Work": prof,"Location":place, "Education": edu };
        var info = JSON.stringify(infoObject);
        formData.append("user", info);
        fetch('https://www.backend.zecide.com/Users/tagline', {
            method: 'POST',
            headers: myHeaders,
            body: formData
        }).then(function (response) {
            stat = response.status;
            return response.json();
        }).then(function (text) {
            // console.log(text.user.UserName);
            // console.log(text.user._id);
            // console.log(text.user.token);
            // setCookie("UserName", text.user.UserName);
            // setCookie("UserID", text.user._id);
            // setCookie("token", text.user.token);


            //uncomment the above code 



            // var usc = getCookie("UserName");
            // var uic = getCookie("UserID");
            // var tc = getCookie("token");

            // console.log(usc);
            // console.log(uic);
            // console.log(tc);
            console.log(text);

            if (stat == 200) {
                window.location.pathname = '/user-profile';
                console.log('success ')
            }
            else {
                alert('An error occured!')
            }
        }).catch(function (error) {
            console.error(error);
        })
    }
    else {
        alert('fill all fields')
    }
});