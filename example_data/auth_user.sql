/* passwords: test1234 */
INSERT INTO auth_user (username, password, first_name, last_name, email, is_superuser, is_staff, is_active, date_joined) VALUES
('max.mustermann', 'pbkdf2_sha256$100000$H54BLXUAGmVX$d/JnK9oEtJ666TcFsSrJDwIjdssXRCw1oknAK8ouyPc=', 'Max', 'Mustermann', 'max.mustermann@domain.de', 0, 0, 1, '2018-10-28 23:47:53.962286'),
('erika.mustermann', 'pbkdf2_sha256$100000$H54BLXUAGmVX$d/JnK9oEtJ666TcFsSrJDwIjdssXRCw1oknAK8ouyPc=', 'Erika', 'Mustermann', 'erika.mustermann@domain.de', 0, 0, 1, '2018-10-28 23:47:53.962286');