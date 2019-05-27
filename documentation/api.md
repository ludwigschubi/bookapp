# API documentation

## Authentication -> /

* login/
Forwards to the Google oauth2 login screen.
The login returns the cookies sessionId and csrftoken. For reading of the API only the sessionId cookie is required.
For write access the csrftoken must be given in the header X-CSRFToken.

* logout/
Removes the session from the Django authentication system.


## UserProfile -> /api/userProfile

* /
Allowed method: GET
Required arguments: None
Optional arguments: None
Description: Returns details about the logged in user.


## Books -> /api/book

* /<bookId>/
Allowed method: GET
Required arguments: None
Optional arguments: bookId
Description: Returns a list of all books or a single book.

* /cover/<bookId>/
Allowed method: GET
Required arguements: bookId
Optional arguements: None
Description: Returns the cover of a single book. If book doesn't exist or field in database is empty it returns an http 404 error.


## Search -> /api/search

* /<searchTerm>/
Allowed method: GET
Required arguments: searchTerm
Optional arguments: None
Description: Returns a full text search of books in the database.


## Loan -> /api/loan

* /<bookCopyId>/
Allowed method: GET
Required arguments: NONE
Optional arguments: bookCopyId
Description: Returns list of all or a single loan.

* /
Allowed method: POST
Required arguments: bookCopyId, from_date, to_date
Optional arguments: None
Description: Creates loan of requested copy of a book.
Example (json): {"book": 2, "from_date": "2019-01-01", "to_date": "2019-01-15"}

* /<loanId>/
Allowed method: DELETE
Required arguments: loanId
Optional arguments: None
Description: Deletes loan of a given copy of a book.

* /loanOwn/
Allowed method: GET
Required arguments: None
Optional arguements: None
Description: Returns a list with all the loans of the logged in user.