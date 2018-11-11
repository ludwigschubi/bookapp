# API documentation

## Authentication -> /api/auth/

* register/
Allowed method: POST
Required attributes: username, first_name, last_name, password, email

* login/
Allowed method: POST
Required attributes: username, password

* logout/
Allowed method: POST
Required attributes: NONE


## User Addresses -> /api/userAddress/

* show/
Allowed method: GET
Required attributes: NONE

* create/
Allowed method: POST
Required attributes: sex, street, street_number, postal_code, city, country, telephone

* update/
Allowed method: PUT
Required attributes: sex, street, street_number, postal_code, city, country, telephone


## User Payment -> /api/payment/

### User Payment Credit Card -> /api/payment/creditCard/

* show/
Allowed method: GET
Required attributes: NONE

* create/
Allowed method: POST
Required attributes: card_company, card_number, card_holder_name, expire_date_month, expire_date_year, cvv

* update/
Allowed method: PUT
Required attributes: card_company, card_number, card_holder_name, expire_date_month, expire_date_year, cvv


## Books -> /api/book/

* list/
Allowed method: GET
Required attributes: NONE

* listOwn/
Allowed method: GET
Required attributes: NONE

* show/<bookId>/
Allowed method: GET
Required attributes: bookId

* create/
Allowed method: POST
Required attributes: isbn, title, author, cover, price

* update/
Allowed method: PUT
Required attributes: isbn, title, author, cover, price

* destroy/<bookId>/
Allowed method: GET
Required attributes: bookId

* search/               # NOT IMPLEMENTED #
Allowed method: GET
Required attributes:


## Rental -> /api/rental/

* list/
Allowed method: GET
Required attributes: NONE
Description: Returns rental list of authenticated user

* show/<rentalId>/
Allowed method: GET
Required attributes: rentalId
Description: Returns details of requested rental entry, including the owner, renter and book details

* create/
Allowed method: POST
Required attributes: book, from_date, to_date
Description: Creates rental of requested book
Example (json): {"book": 2, "from_date": "2019-01-01", "to_date": "2019-01-15"}