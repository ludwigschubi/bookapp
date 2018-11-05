$('document').ready(function(){
    setInterval(() => {
        if(token != undefined){
            loadBooks(token);
            console.log("[DEBUG] token in main: " + token)
            console.log("[DEBUG] global user is: " + user)
        }
    }, 10000)
})

let newBookFormString = `
<div class="row">
    <h3>Create a new book entry:</h3>
</div>
<div class="divider"></div>
<div class="row">
    <form class="col s10 offset-s1">
        <div class="row">
            <div class="input-field col s6">
                <input type ="text" id="title">
                <label for="title">Title</label>
            </div>
            <div class="input-field col s6">
                <input type ="text" id="author">
                <label for="author">Author</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <input type ="text" id="isbn">
                <label for="isbn">ISBN</label>
            </div>
            <div class="input-field col s6">
                <input type ="text" id="cover">
                <label for="cover">Cover</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input type ="number" step="0.1" id="price">
                <label for="price">Price per day</label>
            </div>
        </div>
    </form>
</div>
`

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
 *    ███████╗██╗L██████╗L███╗LLL██╗██╗LLL██╗██████╗L
 *    ██╔════╝██║██╔════╝L████╗LL██║██║LLL██║██╔══██╗
 *    ███████╗██║██║LL███╗██╔██╗L██║██║LLL██║██████╔╝
 *    ╚════██║██║██║LLL██║██║╚██╗██║██║LLL██║██╔═══╝L
 *    ███████║██║╚██████╔╝██║L╚████║╚██████╔╝██║LLLLL
 *    ╚══════╝╚═╝L╚═════╝L╚═╝LL╚═══╝L╚═════╝L╚═╝LLLLL
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

function signupUser(){
    const userData = {
        username: $("#username").val(),
        first_name: $('#firstName').val(),
        last_name: $('#lastName').val(),
        password: $("#password").val(),
        email: $('#email').val(),
    };

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/auth/register/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 201){
                loginUser(userData.username, userData.password);
            } else {
                console.log('[DEBUG] Bad Request')
            }  
        };
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userData));
}

$("#signupButton").click(function() {
    signupUser();
});

/***
 *    L█████╗L██╗LLL██╗████████╗██╗LL██╗███████╗███╗LLL██╗████████╗██╗L██████╗L█████╗L████████╗██╗L██████╗L███╗LLL██╗
 *    ██╔══██╗██║LLL██║╚══██╔══╝██║LL██║██╔════╝████╗LL██║╚══██╔══╝██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗LL██║
 *    ███████║██║LLL██║LLL██║LLL███████║█████╗LL██╔██╗L██║LLL██║LLL██║██║LLLLL███████║LLL██║LLL██║██║LLL██║██╔██╗L██║
 *    ██╔══██║██║LLL██║LLL██║LLL██╔══██║██╔══╝LL██║╚██╗██║LLL██║LLL██║██║LLLLL██╔══██║LLL██║LLL██║██║LLL██║██║╚██╗██║
 *    ██║LL██║╚██████╔╝LLL██║LLL██║LL██║███████╗██║L╚████║LLL██║LLL██║╚██████╗██║LL██║LLL██║LLL██║╚██████╔╝██║L╚████║
 *    ╚═╝LL╚═╝L╚═════╝LLLL╚═╝LLL╚═╝LL╚═╝╚══════╝╚═╝LL╚═══╝LLL╚═╝LLL╚═╝L╚═════╝╚═╝LL╚═╝LLL╚═╝LLL╚═╝L╚═════╝L╚═╝LL╚═══╝
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

function loginUser(username, password){
    const userData = {
        username: username,
        password: password,
    };

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/auth/login/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                $('#loginForm').remove();
                $('#newBookContainer').append(newBookFormString);
                token = xhr.response.token;
                showUser(token);
                console.log("[DEBUG] Global token has been declared!")
            } else {
                $("input[name='loginSpace']").append("<li id='loginError'><p>Invalid Login Credentials!</p></li>")
            }  
        };
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userData));
}

$("#loginButton").click(function() {
    let username = $('#usernameInput').val();
    let password = $('#passwordInput').val();
    loginUser(username, password);
});

/***
 *    ██████╗LL██████╗LL██████╗L██╗LL██╗██████╗L██╗███████╗██████╗L██╗LLLLLL█████╗L██╗LLL██╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗██║L██╔╝██╔══██╗██║██╔════╝██╔══██╗██║LLLLL██╔══██╗╚██╗L██╔╝
 *    ██████╔╝██║LLL██║██║LLL██║█████╔╝L██║LL██║██║███████╗██████╔╝██║LLLLL███████║L╚████╔╝L
 *    ██╔══██╗██║LLL██║██║LLL██║██╔═██╗L██║LL██║██║╚════██║██╔═══╝L██║LLLLL██╔══██║LL╚██╔╝LL
 *    ██████╔╝╚██████╔╝╚██████╔╝██║LL██╗██████╔╝██║███████║██║LLLLL███████╗██║LL██║LLL██║LLL
 *    ╚═════╝LL╚═════╝LL╚═════╝L╚═╝LL╚═╝╚═════╝L╚═╝╚══════╝╚═╝LLLLL╚══════╝╚═╝LL╚═╝LLL╚═╝LLL
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

function displayBooks(fetchedBooks){
    $("#bookContainer").empty();
    var row = 0;
    for(var i=0; i<fetchedBooks.length; i++){
        if((i) % 3 == 0){
            row = Math.floor((i) / 3);
            $('#bookContainer').append('<div class="row" id="bookRow' + row + '"></div>');
        }

        let title = fetchedBooks[i].title;
        let author = fetchedBooks[i].author;
        let isbn = fetchedBooks[i].isbn;
        let cover = fetchedBooks[i].cover;
        let price = fetchedBooks[i].price;
        let bookString = makeBookCard(title, author, isbn, cover, price);
        $('#bookRow' + row).append(bookString);
    };
}

function makeBookCard(title, author, isbn, cover, price){
    let bookCardString = `
    <div class="col s4 m4">
        <div class="card">
            <div class="card-image">
            <img src="${cover}">
            <span class="card-title"></span>
            </div>
            <div class="card-content">
            <p>This book was written by:<b>${author}</b></p>
            <p>ISBN: <b>${isbn}</b></p>
            <b>${price}</b>
            </div>
            <div class="card-action">
            <a href="#">Rent this Book</a>
            </div>
        </div>
    </div>
    `;
    return bookCardString;
}