export default function showUser(token){
    var xhr = new XMLHttpRequest();
    var apiEndpoint = "http://localhost:8000/api/userAddress/show/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status == 200){
                return xhr.response;
            }
        }
    };

    xhr.open("GET", apiEndpoint);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.send();
}