const form = document.getElementById('signUpForm');
let backendbaseurl ="https://www.backend.zecide.com"

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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


form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name=form.elements[0].value;
    var email = form.elements[1].value;
    console.log(email);
    var username = form.elements[2].value;
    var password = form.elements[3].value;
    var registrationtoken = "abcdef";
    //to append registration token
    var stat;
    var infoObject = { "name":name,"username": username, "email": email, "password": password , "registrationToken" : registrationtoken};
    var info = {"user": infoObject};
    var data = JSON.stringify(info);
    fetch(backendbaseurl + '/Users', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        stat = response.status;
        return response.json();
    }).then(function (text) {
        console.log(text.user.Username);
        console.log(text.user._id);
        console.log(text.user.Name);
        console.log(text.user.token);
        setCookie("Username", text.user.Username);
        setCookie("UserID", text.user._id);
        setCookie("token", text.user.token);
        setCookie("Name",text.user.Name);
        setCookie("UserPicture",text.user.imgUrl);


        //uncomment the above code 



        var usc = getCookie("Username");
        var uic = getCookie("UserID");
        var tc = getCookie("token");

        console.log(usc);
        console.log(uic);
        console.log(tc);

        if (stat == 200) {
            window.location.pathname = '/users/login';
        }
        else {
            alert('An error occured!')
        }
    }).catch(function (error) {
        console.error(error);
    })
});