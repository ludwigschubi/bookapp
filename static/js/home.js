$('document').ready(function(){
    $('.sidenav').sidenav();
    setInterval(() => {
        if(token != undefined){
            loadBooks(token);
            console.log("[DEBUG] token in main: " + token)
            console.log("[DEBUG] global user is: " + JSON.stringify(user))
        }
    }, 10000)
})

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
                login = true;
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
 *    ██╗LLL██╗███████╗███████╗██████╗L██████╗L██╗███████╗██████╗L██╗LLLLLL█████╗L██╗LLL██╗
 *    ██║LLL██║██╔════╝██╔════╝██╔══██╗██╔══██╗██║██╔════╝██╔══██╗██║LLLLL██╔══██╗╚██╗L██╔╝
 *    ██║LLL██║███████╗█████╗LL██████╔╝██║LL██║██║███████╗██████╔╝██║LLLLL███████║L╚████╔╝L
 *    ██║LLL██║╚════██║██╔══╝LL██╔══██╗██║LL██║██║╚════██║██╔═══╝L██║LLLLL██╔══██║LL╚██╔╝LL
 *    ╚██████╔╝███████║███████╗██║LL██║██████╔╝██║███████║██║LLLLL███████╗██║LL██║LLL██║LLL
 *    L╚═════╝L╚══════╝╚══════╝╚═╝LL╚═╝╚═════╝L╚═╝╚══════╝╚═╝LLLLL╚══════╝╚═╝LL╚═╝LLL╚═╝LLL
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

function showUser(){
    var xhr = new XMLHttpRequest();
    var apiEndpoint = "http://localhost:8000/api/userAddress/show/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status == 200){
                console.log(user);
                user = xhr.response;
            }
        }
    };

    xhr.open("GET", apiEndpoint);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.send();
}



/***
 *    L██████╗██╗LL██╗L█████╗L███╗LLL██╗L██████╗L███████╗██╗LLL██╗███████╗███████╗██████╗L██╗███╗LLL██╗███████╗L██████╗L
 *    ██╔════╝██║LL██║██╔══██╗████╗LL██║██╔════╝L██╔════╝██║LLL██║██╔════╝██╔════╝██╔══██╗██║████╗LL██║██╔════╝██╔═══██╗
 *    ██║LLLLL███████║███████║██╔██╗L██║██║LL███╗█████╗LL██║LLL██║███████╗█████╗LL██████╔╝██║██╔██╗L██║█████╗LL██║LLL██║
 *    ██║LLLLL██╔══██║██╔══██║██║╚██╗██║██║LLL██║██╔══╝LL██║LLL██║╚════██║██╔══╝LL██╔══██╗██║██║╚██╗██║██╔══╝LL██║LLL██║
 *    ╚██████╗██║LL██║██║LL██║██║L╚████║╚██████╔╝███████╗╚██████╔╝███████║███████╗██║LL██║██║██║L╚████║██║LLLLL╚██████╔╝
 *    L╚═════╝╚═╝LL╚═╝╚═╝LL╚═╝╚═╝LL╚═══╝L╚═════╝L╚══════╝L╚═════╝L╚══════╝╚══════╝╚═╝LL╚═╝╚═╝╚═╝LL╚═══╝╚═╝LLLLLL╚═════╝L
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

let changeUserInfoString = `
<div class="row">
<h3>Change your personal information:</h3>
</div>
<div class="divider"></div>
<div class="row">
<form class="col s10 offset-s1">
    <div class="row">
        <div class="input-field col s6">
            <select class="browser-default" id="sex">
                <option value="" disabled selected>Choose your sex</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s6">
            <input type ="text" id="street">
            <label for="street" id="streetLabel">Street</label>
        </div>
        <div class="input-field col s6">
            <input type ="text" id="street_number">
            <label for="street_number" id="street_numberLabel">Street Number</label>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s6">
            <input type ="text" id="postal_code">
            <label for="postal_code" id="postal_codeLabel">Postal Code</label>
        </div>
        <div class="input-field col s6">
            <input type ="text" id="city">
            <label for="city" id="cityLabel">City</label>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s6">
            <select class="browser-default" id="country">
                <option value="" disabled selected>Choose your country</option>
                <option value="1">Germany</option>
                <option value="2">Georgia</option>
            </select>
        </div>
        <div class="input-field col s6">
            <i class="material-icons prefix">phone</i>
            <input type ="tel" id="telephone" pattern="[0-9]{12}">
            <label for="telephone" id="telephoneLabel">Telephone</label>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <button class="waves-effect waves-light btn-small" id="changeUserInfoButton">Submit changes<i class="material-icons right">send</i></button>
        </div>
    </div>
</form>
</div>
`

$('#myAccount').click(function(){
    if(login == true){
        $('#changeUserContainer').append(changeUserInfoString);
        $('#street').val(user.street);
        $('#streetLabel').addClass('active');
        $('#street_number').val(user.street_number);
        $('#street_numberLabel').addClass('active');
        $('#postal_code').val(user.postal_code);
        $('#postal_codeLabel').addClass('active');
        $('#city').val(user.city);
        $('#cityLabel').addClass('active');
        $('#telephone').val(user.telephone);
        $('#telephoneLabel').addClass('active');
    }

    $('#changeUserInfoButton').click(function(){
        changeUserInfo();
        showUser();
    });
});

function changeUserInfo(){

    const userInfo = {
        user: user.user,
        sex: $('#sex').val(),
        street: $("#street").val(),
        street_number: $("#street_number").val(),
        postal_code: $("#postal_code").val(),
        city: $('#city').val(),
        country: $('#country').val(),
        telephone: $('#telephone').val(),
    }

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/userAddress/update/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            console.log("User Info has been updated!")
            sex.destroy();
            country.destroy();
            $('#changeUserContainer').empty();
        };
    };

    xhr.open("PUT", url);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userInfo));
}


/***
 *    ██████╗LL██████╗LL██████╗L██╗LL██╗L██████╗██████╗L███████╗L█████╗L████████╗██╗L██████╗L███╗LLL██╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗██║L██╔╝██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗LL██║
 *    ██████╔╝██║LLL██║██║LLL██║█████╔╝L██║LLLLL██████╔╝█████╗LL███████║LLL██║LLL██║██║LLL██║██╔██╗L██║
 *    ██╔══██╗██║LLL██║██║LLL██║██╔═██╗L██║LLLLL██╔══██╗██╔══╝LL██╔══██║LLL██║LLL██║██║LLL██║██║╚██╗██║
 *    ██████╔╝╚██████╔╝╚██████╔╝██║LL██╗╚██████╗██║LL██║███████╗██║LL██║LLL██║LLL██║╚██████╔╝██║L╚████║
 *    ╚═════╝LL╚═════╝LL╚═════╝L╚═╝LL╚═╝L╚═════╝╚═╝LL╚═╝╚══════╝╚═╝LL╚═╝LLL╚═╝LLL╚═╝L╚═════╝L╚═╝LL╚═══╝
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

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

/***
 *    ██████╗LL██████╗LL██████╗L██╗LL██╗██████╗L██╗███████╗██████╗L██╗LLLLLL█████╗L██╗LLL██╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗██║L██╔╝██╔══██╗██║██╔════╝██╔══██╗██║LLLLL██╔══██╗╚██╗L██╔╝
 *    ██████╔╝██║LLL██║██║LLL██║█████╔╝L██║LL██║██║███████╗██████╔╝██║LLLLL███████║L╚████╔╝L
 *    ██╔══██╗██║LLL██║██║LLL██║██╔═██╗L██║LL██║██║╚════██║██╔═══╝L██║LLLLL██╔══██║LL╚██╔╝LL
 *    ██████╔╝╚██████╔╝╚██████╔╝██║LL██╗██████╔╝██║███████║██║LLLLL███████╗██║LL██║LLL██║LLL
 *    ╚═════╝LL╚═════╝LL╚═════╝L╚═╝LL╚═╝╚═════╝L╚═╝╚══════╝╚═╝LLLLL╚══════╝╚═╝LL╚═╝LLL╚═╝LLL
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

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