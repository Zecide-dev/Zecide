const form = document.getElementById('signUpForm');

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
    var formData = new FormData();
    var email = form.elements[0].value;
    console.log(email);
    var username = form.elements[1].value;
    var password = form.elements[2].value;
    var registrationtoken = "abcdef";
    
    //to append registration token
    var stat;
    var infoObject = { "UserName": username, "Email": email, "password": password , "registrationToken" : registrationtoken};
    var info = JSON.stringify(infoObject);
    formData.append("user", info);
    fetch('http://localhost:8000/Users', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        stat = response.status;
        return response.json();
    }).then(function (text) {
        console.log(text.user.UserName);
        console.log(text.user._id);
        console.log(text.user.token);
        setCookie("UserName", text.user.UserName);
        setCookie("UserID", text.user._id);
        setCookie("token", text.user.token);


        //uncomment the above code 



        var usc = getCookie("UserName");
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