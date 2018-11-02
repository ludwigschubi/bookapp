$('document').ready(function(){
    setInterval(() => {
        if(token != undefined){
            loadBooks(token);
            console.log("[DEBUG] token in main: " + token)
            console.log("[DEBUG] global user is: " + user)
        }
    }, 10000)
})

$("#create-book").click(function() {
    createBook(user.user)
    loadBooks();
});


/** create/
Allowed method: POST
Required attributes: isbn, title, author, cover, price, owner*/

function createBook(ownerId){
    const bookData = {
        isbn: $("#isbn").val(),
        title: $("#title").val(),
        author: $("#author").val(),
        cover: $("#cover").val(),
        price: $("#price").val(),
        owner: ownerId,
    }

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/book/create/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
          console.log("Book has been created!")  
        };
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(bookData));
}

function showUser(){
    var xhr = new XMLHttpRequest();
    var apiEndpoint = "http://localhost:8000/api/userAddress/show/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status == 200){
                user = xhr.response;
            }
        }
    };

    xhr.open("GET", apiEndpoint);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.send();
}

function loadBooks(){
    var xhr = new XMLHttpRequest();
    var apiEndpoint = "http://localhost:8000/api/book/list/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status == 200){
                displayBooks(xhr.response);
            }
        }
    };

    xhr.open("GET", apiEndpoint);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.send();
}

/***
 *    L█████╗L██╗LLL██╗████████╗██╗LL██╗███████╗███╗LLL██╗████████╗██╗L██████╗L█████╗L████████╗██╗L██████╗L███╗LLL██╗
 *    ██╔══██╗██║LLL██║╚══██╔══╝██║LL██║██╔════╝████╗LL██║╚══██╔══╝██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗LL██║
 *    ███████║██║LLL██║LLL██║LLL███████║█████╗LL██╔██╗L██║LLL██║LLL██║██║LLLLL███████║LLL██║LLL██║██║LLL██║██╔██╗L██║
 *    ██╔══██║██║LLL██║LLL██║LLL██╔══██║██╔══╝LL██║╚██╗██║LLL██║LLL██║██║LLLLL██╔══██║LLL██║LLL██║██║LLL██║██║╚██╗██║
 *    ██║LL██║╚██████╔╝LLL██║LLL██║LL██║███████╗██║L╚████║LLL██║LLL██║╚██████╗██║LL██║LLL██║LLL██║╚██████╔╝██║L╚████║
 *    ╚═╝LL╚═╝L╚═════╝LLLL╚═╝LLL╚═╝LL╚═╝╚══════╝╚═╝LL╚═══╝LLL╚═╝LLL╚═╝L╚═════╝╚═╝LL╚═╝LLL╚═╝LLL╚═╝L╚═════╝L╚═╝LL╚═══╝
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

function loginUser(){
    const userData = {
        username: $("#usernameInput").val(),
        password: $("#passwordInput").val(),
    };

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
                token = xhr.response.token;
                showUser(token);
                console.log("[DEBUG] Global token has been declared!")
            } else {
                $("#loginSpace").append("<li id='loginError'><p>Invalid Login Credentials!</p></li>")
            }  
        };
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userData));
}

$("#loginButton").click(function() {
    loginUser();
});

function displayBooks(fetchedBooks){
    $("#books").empty();
    for(var i=0; i<fetchedBooks.length; i++){
        console.log(fetchedBooks.length);
        let bookString = "<ul class='bookList" + i + "'></ul>";
        $('#books').append(bookString);

        let bookDataString = "<li class='bookIsbn'>" + fetchedBooks[i].isbn + "</li>"
        bookDataString += "<li class='bookTitle'>" + fetchedBooks[i].title + "</li>"
        bookDataString += "<li class='bookAuthor'>" + fetchedBooks[i].author + "</li>"
        bookDataString += "<li class='bookCover'>" + fetchedBooks[i].cover + "</li>"
        bookDataString += "<li class='bookPrice'>" + fetchedBooks[i].price + "</li>"
        $(".bookList" + i).append(bookDataString);
    };
}
