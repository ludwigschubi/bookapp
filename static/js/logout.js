$("#logoutButton").click(function() {
    const logoutData = {
        
    }

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/book/new/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response);
        };
    };

    xhr.open("POST", url);
    xhr.send(logoutData);
});