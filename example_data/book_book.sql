INSERT INTO public.book_book(id, isbn, title, author, publisher, cover, category, topic, edition, release_date, language)
	VALUES (1, '123-1-1', 'JavaScript - The Definitive Guide', 'author1', 'O''Reilly', 'https://books.google.de/books/content?id=vJGlu9t9LNYC&printsec=frontcover&img=1&zoom=5&edge=curl&img', 'STS', 'STS', 1, to_date('2019-01-01', 'YYYY-MM-DD'), 'EN');

	INSERT INTO public.book_book(
	id, isbn, title, author, publisher, cover, category, topic, edition, release_date, language)
	VALUES (2, '123-1', 'LINUX - IN A NUTSHELL', 'author2', 'O''Reilly', 'https://books.google.de/books/content?id=zVqe3d19_D4C&printsec=frontcover&img=1&zoom=5&edge=curl&img', 'SE', 'SE', 1, to_date('2019-01-01', 'YYYY-MM-DD'), 'EN');

	INSERT INTO public.book_book(
	id, isbn, title, author, publisher, cover, category, topic, edition, release_date, language)
	VALUES (3, '123', 'Docker - Up & Running', 'author3', 'O''Reilly', 'https://books.google.de/books/content?id=IDvcCQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&img', 'ID', 'ID', 1, to_date('2019-01-01', 'YYYY-MM-DD'), 'EN');