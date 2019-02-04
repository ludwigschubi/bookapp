INSERT INTO public.book_loan(
	id, user_id, book_id, from_date, to_date)
	VALUES (1, 1, 1, to_date('2019-01-01', 'YYYY-MM-DD'), to_date('2019-01-05', 'YYYY-MM-DD'));

INSERT INTO public.book_loan(
	id, user_id, book_id, from_date, to_date)
	VALUES (2, 1, 2, to_date('2019-01-05', 'YYYY-MM-DD'), to_date('2019-01-10', 'YYYY-MM-DD'));