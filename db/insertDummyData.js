Database.insertDummyData = function() {
	var client = this.newClient();

	var dataExistsQuery = client.query('SELECT * FROM users');

	dataExistsQuery.on('end', function(result){
		if (result.rowCount === 0) {

			console.log("Insert Dummy Data");
			var insert = client.query(`
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
					(2, '2015-01-17 15:00', 'Carl & Co'),
					(3, '2015-01-17 15:00', 'Jobb'),
					(4, '2015-01-17 15:00', 'Toitla')
				;

				insert into teams (company_id, user_id, contact_user) values
					(1, 1, TRUE),
					(2, 3, FALSE),
					(2, 4, TRUE),
					(3, 4, TRUE),
					(4, 4, FALSE)
				;

				insert into listings (id, created_at, created_by, name, description) values
					(1, '2015-01-15 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
					(2, '2015-02-15 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
					(3, '2016-02-15 11:00', 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
					(4, '2016-02-15 11:00', 2, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
					(5, '2016-03-15 11:00', 2, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
					(6, '2016-03-15 11:00', 4, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
					(7, '2016-04-15 11:00', 4, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
					(8, '2016-05-15 11:00', 4, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
					(9, '2016-06-15 11:00', 3, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
				;

				insert into applications (created_at, user_id, listing_id, cover_letter) values
					('2015-01-1 12:00', 2, 1, 'Hello, ...'),
					('2015-01-2 12:00', 2, 2, 'Hello, ...'),
					('2015-01-3 12:00', 2, 3, 'Hello, ...'),
					('2015-01-4 12:00', 2, 4, 'Hello, ...'),
					('2016-02-5 12:00', 2, 5, 'Hello, ...'),
					('2016-02-6 12:00', 1, 6, 'Hello, ...'),
					('2016-03-7 12:00', 1, 7, 'Hello, ...'),
					('2016-04-8 12:00', 1, 8, 'Hello, ...'),
					('2016-07-9 12:00', 3, 9, 'Hello, ...')
				;
			`);

			insert.on('end', () => {
				client.end();
				console.log("Inserting Dummy Data DONE");
				Database.denormalizeUserActivity();
			});

		} else {
			console.log("No need for Dummy Data");
			client.end();
			Database.denormalizeUserActivity();
		}
	});
};