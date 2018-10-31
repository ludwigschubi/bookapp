//export function(url){}
$("#loginButton").click(function() {
    const userData = {
        username: $("#usernameInput").val(),
        password: $("#passwordInput").val(),
    }

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/auth/login/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response)
            $("#loginListItem").remove()
            $("#usernameInput").remove()
            $("#passwordInput").remove()
            $("#loginSpace").append("<li id='logoutListItem'><button id='logoutButton'>Logout</button></li>")
        };
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(userData));
});