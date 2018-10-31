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
Required attributes: user, sex, street, street_number, postal_code, city, country, telephone

* update/
Allowed method: PUT
Required attributes: user, sex, street, street_number, postal_code, city, country, telephone


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
Required attributes: isbn, title, author, cover, price, owner

* update/
Allowed method: PUT
Required attributes: isbn, title, author, cover, price, owner

* destroy/<bookId>/
Allowed method: GET
Required attributes: bookId

* search/               # NOT IMPLEMENTED #
Allowed method: GET
Required attributes: