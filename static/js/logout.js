function init() {
    gapi.load('auth2', function() {});
    auth = gapi.auth2.init
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

$("#create-book").click(function() {
    const bookData = {
        title: $("#title").val(),
        author: $("#author").val(),
        isbn: $("#isbn").val(),
        price: $("#price").val(),
        owning_customer_id: 1
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
    xhr.send(bookData);
});