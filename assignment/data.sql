
insert into users (id, created_at, name) values
	(1, '2015-01-13 15:30', 'Mark'),
	(2, '2015-01-13 15:30', 'John'),
	(3, '2016-01-01 10:30', 'Melinda'),
	(4, '2016-01-17 23:30', 'Carl'),
	(5, '2016-02-02 16:30', 'Tim'),
	(6, '2016-02-02 16:30', 'Jessica')
;

insert into companies (id, created_at, name) values
	(1, '2015-01-13 15:00', 'Facewall'),
	(2, '2015-01-17 15:00', 'Carl & Co')
;

insert into teams (company_id, user_id, contact_user) values
	(1, 1, TRUE),
	(2, 3, FALSE),
	(2, 4, TRUE)
;

insert into listings (id, created_at, created_by, name, description) values
	(1, '2015-01-15 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
	(1, '2015-01-15 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
	(1, '2016-02-15 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
	(1, '2016-02-16 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
	(1, '2016-02-17 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
	(1, '2016-02-18 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
	(1, '2016-02-19 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
	(1, '2016-02-20 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
	(1, '2016-02-21 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
;

insert into applications (created_at, user_id, listing_id, cover_letter) values
	('2015-01-1 12:00', 2, 1, 'Hello, ...')
	('2015-01-2 12:00', 2, 2, 'Hello, ...')
	('2015-01-3 12:00', 2, 3, 'Hello, ...')
	('2015-01-4 12:00', 2, 4, 'Hello, ...')
	('2016-02-5 12:00', 2, 5, 'Hello, ...')
	('2016-02-6 12:00', 1, 6, 'Hello, ...')
	('2016-03-7 12:00', 1, 7, 'Hello, ...')
	('2016-04-8 12:00', 1, 8, 'Hello, ...')
	('2016-04-9 12:00', 3, 9, 'Hello, ...')
;
