export default function loginUser(data){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/auth/login/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                $("#loginListItem").remove();
                $("#usernameInput").remove();
                $("#passwordInput").remove();
                $("#loginSpace").append("<li id='logoutListItem'><button id='logoutButton'>Logout</button></li>");
                return xhr.response.token;
            } else {
                $("#loginSpace").append("<li id='loginError'><p>Invalid Login Credentials!</p></li>")
            }  
        };
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}