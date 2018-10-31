$("#create-book").click(function() {
    const bookData = {
        title: $("#title").val(),
        author: $("#author").val(),
        isbn: $("#isbn").val(),
        price: $("#price").val(),
        owning_customer_id: 1
    }

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/book/create/";

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response);
        };
    };

    xhr.open("create", url);
    xhr.send(bookData);
});