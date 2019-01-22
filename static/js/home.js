$('document').ready(function(){
    $('.sidenav').sidenav();
    M.AutoInit();
    loadBooks(token)
    setInterval(() => {
        if(token != undefined && loadBooksBool == true){
            loadBooks(token);
            console.log("[DEBUG] token in main: " + token)
            console.log("[DEBUG] global user is: " + JSON.stringify(user))
        }
    }, 100000)
})

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
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
                login = true;
                $('#loginForm').remove();
                token = xhr.response.token;
                showUser(token);
                initializeSearch();
                loadBooks();
                loadBooksBool = true;
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
                user = xhr.response;
                console.log(user);
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
            <a class="waves-effect waves-light btn-small" id="changeUserInfoButton">Submit changes<i class="material-icons right">send</i></a>
        </div>
    </div>
</form>
</div>
`

$('#myAccount').click(function(){
    if(login == true){
        showUser()
        $('#changeUserContainer').append(changeUserInfoString);
        $('#changeUserContainer').addClass('z-depth-4')

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
        loadRentalList()
    }
    loadBooksBool = false;
    $('#bookContainer').empty();
    $('#newBookContainer').empty();
    $('#searchBarContainer').empty();
    $('#addBookButton').removeClass('disabled');
    $('#myAccount').addClass('disabled');

    $('#changeUserInfoButton').click(function(){
        changeUserInfo();
        M.toast({html: 'Your info has been changed!'})
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
            if(xhr.status == 200){
                console.log("User Info has been updated!")
                showUser()
                $('#changeUserContainer').empty()
                $('#changeUserContainer').append(changeUserInfoString);
                $('#changeUserContainer').addClass('z-depth-4')
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
                loadBooksBool = true;
            }
        };
    };

    xhr.open("PUT", url);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userInfo));
}

/***
 *    ██████╗LL██████╗LL██████╗L██╗LL██╗███████╗███████╗L█████╗L██████╗LL██████╗██╗LL██╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗██║L██╔╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║LL██║
 *    ██████╔╝██║LLL██║██║LLL██║█████╔╝L███████╗█████╗LL███████║██████╔╝██║LLLLL███████║
 *    ██╔══██╗██║LLL██║██║LLL██║██╔═██╗L╚════██║██╔══╝LL██╔══██║██╔══██╗██║LLLLL██╔══██║
 *    ██████╔╝╚██████╔╝╚██████╔╝██║LL██╗███████║███████╗██║LL██║██║LL██║╚██████╗██║LL██║
 *    ╚═════╝LL╚═════╝LL╚═════╝L╚═╝LL╚═╝╚══════╝╚══════╝╚═╝LL╚═╝╚═╝LL╚═╝L╚═════╝╚═╝LL╚═╝
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

function initializeSearch(){
    let searchBooksString = `
    <div class="input-field" style="margin: 3rem;">
        <input type="text" id="search" placeholder="Search for your favourite book!">
    </div>
    `

    $('#searchBarContainer').append(searchBooksString)
    $('#searchBarContainer').addClass('z-depth-1')

    $('#search').on('input', function(){
        searchBooks($('#search').val())
    });
}

function searchBooks(query){
    const queryInfo = {
        query: query
    }

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/book/search/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status == 200){
                loadBooksBool = false;
                $('bookContainer').empty();
                displayBooks(xhr.response);
            }
        };
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(queryInfo));
}

/***
 *    ██████╗LL██████╗LL██████╗L██╗LL██╗L██████╗██████╗L███████╗L█████╗L████████╗██╗L██████╗L███╗LLL██╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗██║L██╔╝██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗LL██║
 *    ██████╔╝██║LLL██║██║LLL██║█████╔╝L██║LLLLL██████╔╝█████╗LL███████║LLL██║LLL██║██║LLL██║██╔██╗L██║
 *    ██╔══██╗██║LLL██║██║LLL██║██╔═██╗L██║LLLLL██╔══██╗██╔══╝LL██╔══██║LLL██║LLL██║██║LLL██║██║╚██╗██║
 *    ██████╔╝╚██████╔╝╚██████╔╝██║LL██╗╚██████╗██║LL██║███████╗██║LL██║LLL██║LLL██║╚██████╔╝██║L╚████║
 *    ╚═════╝LL╚═════╝LL╚═════╝L╚═╝LL╚═╝L╚═════╝╚═╝LL╚═╝╚══════╝╚═╝LL╚═╝LLL╚═╝LLL╚═╝L╚═════╝L╚═╝LL╚═══╝
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 

$('#addBook').click(function(){
    if(login == true){
        loadBooksBool = false;
        wipePage();
        $('#addBookButton').addClass('disabled');
        $('#myAccount').removeClass('disabled');
        $('#newBookContainer').append(newBookFormString)
        $('#newBookContainer').addClass('z-depth-4')
    }
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
            <div class="input-field col s6">
                <input type ="number" step="0.1" id="price">
                <label for="price">Price per day</label>
            </div>
            <div class="input-field col s6">
                <a class="waves-effect waves-light btn" id="createBook">Create a new Entry</a>
            </div>
            <script>
                $('#createBook').click(function(){
                    const bookData = {
                        isbn: $("#isbn").val(),
                        title: $("#title").val(),
                        author: $("#author").val(),
                        cover: $("#cover").val(),
                        price: $("#price").val(),
                        owner: user.user,
                    }
                
                    var xhr = new XMLHttpRequest();
                    var url = "http://localhost:8000/api/book/create/";
                
                    xhr.responseType = "json";
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === XMLHttpRequest.DONE){
                            M.toast({html: 'Book has been created!'})
                        };
                    };
                
                    xhr.open("POST", url);
                    xhr.setRequestHeader("Authorization", "Token " + token)
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(JSON.stringify(bookData));
                })
            </script>
        </div>
    </form>
</div>
`
*/

/** create/
Allowed method: POST
Required attributes: isbn, title, author, cover, price, owner*/

/***
 *    ██████╗LL██████╗LL██████╗L██╗LL██╗██████╗L██╗███████╗██████╗L██╗LLLLLL█████╗L██╗LLL██╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗██║L██╔╝██╔══██╗██║██╔════╝██╔══██╗██║LLLLL██╔══██╗╚██╗L██╔╝
 *    ██████╔╝██║LLL██║██║LLL██║█████╔╝L██║LL██║██║███████╗██████╔╝██║LLLLL███████║L╚████╔╝L
 *    ██╔══██╗██║LLL██║██║LLL██║██╔═██╗L██║LL██║██║╚════██║██╔═══╝L██║LLLLL██╔══██║LL╚██╔╝LL
 *    ██████╔╝╚██████╔╝╚██████╔╝██║LL██╗██████╔╝██║███████║██║LLLLL███████╗██║LL██║LLL██║LLL
 *    ╚═════╝LL╚═════╝LL╚═════╝L╚═╝LL╚═╝╚═════╝L╚═╝╚══════╝╚═╝LLLLL╚══════╝╚═╝LL╚═╝LLL╚═╝LLL
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

function getBookList(response){
    var res = [];
    response = response["results"];
    var currBook;
    for(var i = 0; i < response.length; i++){
        var bookDict = {};
        currBook = response[i];
        bookDict["id"] = currBook["id"]
        bookDict["title"] = currBook["title"]
        bookDict["isbn"] = currBook["isbn"]
        var author = currBook["author"][0]
        bookDict["author"] = author["first_name"] + " " + author["last_name"]
        bookDict["cover"] = currBook["cover"]
        bookDict["category"] = currBook["category"]["name"]
        bookDict["topic"] = currBook["topic"]["name"]
        res.push(bookDict)
    }
    console.log(res);
    return res;
}

function loadBooks(rental=false){
    var xhr = new XMLHttpRequest();
    var apiEndpoint = "http://localhost:8000/api/book/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status == 200){
                console.log(xhr.response);
                var bookList = getBookList(xhr.response);
                displayBooks(bookList, rental);
            }
        }
    };

    xhr.open("GET", apiEndpoint);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.send();
}

function displayBooks(fetchedBooks, rental=false){
    $('#bookContainer').empty()

    if(rental==true){
        for(var count=0; count<fetchedBooks.length; count++){
            var isRented = false;
            for(var i=0; i<rentedBooks.length; i++){
                if(rentedBooks[i].book == fetchedBooks[count].id){
                    isRented = true;
                }
            }
            if(isRented == false){
                fetchedBooks[count] = null
            }
        }
        var fetchedRentals = []
        for(var count=0;count<fetchedBooks.length;count++){
            if(fetchedBooks[count] != null){
                fetchedRentals.push(fetchedBooks[count])
            }
        }
        fetchedBooks = fetchedRentals
    }

    var row = 0;
    var count = 0
    while(count<fetchedBooks.length){
        //Decide wether to make a new row
        if((count) % 3 == 0){
            row = Math.floor((count) / 3);
            $('#bookContainer').append('<div class="row" id="bookRow' + row + '"></div>');
        }

        /*let author = fetchedBooks[i].author;
        let isbn = fetchedBooks[i].isbn;
        let cover = fetchedBooks[i].cover;
        let price = fetchedBooks[i].price;*/
        let bookString = makeBookCard(fetchedBooks[count], rental);
        if(count == fetchedBooks.length - 1){
            bookString += `
            <script>
                function sendBookRental(id){
                    const rentalData = {
                        book: id,
                        from_date: $("#dateFrom" + id).val(),
                        to_date: $("#dateTo" + id).val(),
                    }
                
                    var xhr = new XMLHttpRequest();
                    var url = "http://localhost:8000/api/rental/create/";
                
                    xhr.responseType = "json";
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === XMLHttpRequest.DONE){
                            //showRentals()  
                            console.log('new rental registered!')
                        };
                    };
                
                    xhr.open("POST", url);
                    xhr.setRequestHeader("Authorization", "Token " + token)
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(JSON.stringify(rentalData));
                }
            </script>
            `
        }
        $('#bookRow' + row).append(bookString);

        if(rental == true){
            for(var count=0; count<fetchedBooks.length; count++){
                for(var i=0; i<rentedBooks.length; i++){
                    $('#' + fetchedBooks[count].id).empty();
                    var rentalString = `
                    <p>From: ${rentedBooks[i].from_date}</p>
                    <p>To: ${rentedBooks[i].to_date}</p>
                    `;
                    $('#' + fetchedBooks[count].id).append(rentalString);
                }
            }
        }

        count += 1;
    };
}

function makeBookCard(book, rental){
    var bookCardString = `
    <div class="col s4 m4">
        <div class="card">
            <div class="card-image">
            <img src="${book.cover}">
            <span class="card-title"></span>
            </div>
            <div class="card-content">
            <b>${book.title}</b>
            <p>This book was written by:<b>${book.author}</b></p>
            <p>ISBN: <b>${book.isbn}</b></p>
            <p>Category: ${book.category}</p>
            <p>Topic: ${book.topic}</p>
            </div>
            <div class="card-action" id="${book.id}">
            <p>From: <input type="date" min="2018-10-31" id="dateFrom${book.id}"</p>
            <p>To: <input type="date" min="2018-10-31" id="dateTo${book.id}"</p>
            <a class="waves-effect waves-light btn-small" onclick="sendBookRental(${book.id})" id="book${book.id}">Rent this book</a>
            </div>
        </div>
    </div>
    `;

    return bookCardString;
}

/***
 *    ██████╗L███████╗███╗LLL██╗████████╗L█████╗L██╗LLLLL██████╗L██╗███████╗██████╗L██╗LLLLLL█████╗L██╗LLL██╗
 *    ██╔══██╗██╔════╝████╗LL██║╚══██╔══╝██╔══██╗██║LLLLL██╔══██╗██║██╔════╝██╔══██╗██║LLLLL██╔══██╗╚██╗L██╔╝
 *    ██████╔╝█████╗LL██╔██╗L██║LLL██║LLL███████║██║LLLLL██║LL██║██║███████╗██████╔╝██║LLLLL███████║L╚████╔╝L
 *    ██╔══██╗██╔══╝LL██║╚██╗██║LLL██║LLL██╔══██║██║LLLLL██║LL██║██║╚════██║██╔═══╝L██║LLLLL██╔══██║LL╚██╔╝LL
 *    ██║LL██║███████╗██║L╚████║LLL██║LLL██║LL██║███████╗██████╔╝██║███████║██║LLLLL███████╗██║LL██║LLL██║LLL
 *    ╚═╝LL╚═╝╚══════╝╚═╝LL╚═══╝LLL╚═╝LLL╚═╝LL╚═╝╚══════╝╚═════╝L╚═╝╚══════╝╚═╝LLLLL╚══════╝╚═╝LL╚═╝LLL╚═╝LLL
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

function loadRentalList(){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/rental/list/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response);
            rentedBooks = xhr.response;
            loadBooks(true);
        };
    };

    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Token " + token)
    xhr.send();
}

/***
 *    ██████╗L██╗LLL██╗███╗LLL██╗L█████╗L███╗LLL███╗██╗L██████╗██████╗LLLLLLL████████╗L██████╗██╗LL██╗
 *    ██╔══██╗╚██╗L██╔╝████╗LL██║██╔══██╗████╗L████║██║██╔════╝██╔══██╗▄L██╗▄╚══██╔══╝██╔════╝██║LL██║
 *    ██║LL██║L╚████╔╝L██╔██╗L██║███████║██╔████╔██║██║██║LLLLL██████╔╝L████╗LLL██║LLL██║LLLLL███████║
 *    ██║LL██║LL╚██╔╝LL██║╚██╗██║██╔══██║██║╚██╔╝██║██║██║LLLLL██╔══██╗▀╚██╔▀LLL██║LLL██║LLLLL██╔══██║
 *    ██████╔╝LLL██║LLL██║L╚████║██║LL██║██║L╚═╝L██║██║╚██████╗██████╔╝LL╚═╝LLLL██║LLL╚██████╗██║LL██║
 *    ╚═════╝LLLL╚═╝LLL╚═╝LL╚═══╝╚═╝LL╚═╝╚═╝LLLLL╚═╝╚═╝L╚═════╝╚═════╝LLLLLLLLLL╚═╝LLLL╚═════╝╚═╝LL╚═╝
 *    LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
 */

$('#feedButton').click(function(){
    wipePage();
    initializeSearch();
    loadBooks();
    loadBooksBool = true;
    $('#myAccount').removeClass('disabled');
})

function wipePage(){
    $('#bookContainer').empty();
    $('#newBookContainer').empty();
    $('#newBookContainer').removeClass('z-depth-4')
    $('#changeUserContainer').empty();
    $('#changeUserContainer').addClass('z-depth-4')
    $('#searchBarContainer').empty();
    $('#searchBarContainer').addClass('z-depth-1')
    $('#rentalContainer').empty();
    $('#rentalContainer').removeClass('z-depth-4')
}