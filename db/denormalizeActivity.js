Database.denormalizeUserActivity = function() {
	function columnExists() {

		console.log("Does last_activity exist?");
		var client = Database.newClient();

		var query = client.query(`
			SELECT TRUE
			FROM information_schema.columns
			WHERE table_name='users' and column_name='last_activity';
		`);

		query.on('end', results => {
			client.end();
			if (results.rowCount == 0)
				insertColumn();
			else {
				console.log("last_activity column exists");
				denormalize();
			}
		});
	}

	function insertColumn() {

		console.log("Add last_activity column");
		var client = Database.newClient();

		var query = client.query(`ALTER TABLE users ADD last_activity TIMESTAMP;`);

		query.on('end', results => {
			client.end();
			denormalize();
		});
	}

	function denormalize() {

		console.log("Denormalize user actions into last_activity");
		var client = Database.newClient();

		var usersQuery = client.query(`
			SELECT
				id,
				last_activity,
				(SELECT created_at FROM listings WHERE users.id=created_by ORDER BY created_at DESC LIMIT 1) AS last_listing,
				(SELECT created_at FROM applications WHERE users.id=user_id ORDER BY created_at DESC LIMIT 1) AS last_application
			FROM users
		`);

		var users = [];
		usersQuery.on('row', user => {
			if (!user.last_activity) {
				console.log("Denormalize user:", user.id);
				console.log("user.last_listing", user.last_listing);
				console.log("user.last_application", user.last_application);

				var latestActivity = user.last_listing;
				if (latestActivity < user.last_application)
					latestActivity = user.last_application;

				var timestamp = toTimestamp(latestActivity);

				var updateClient = pgClient();
				updateClient.connect();
				updateClient.query(`
					UPDATE users
					SET last_activity='${timestamp}'
					WHERE id='${user.id}';
				`);

				updateClient.on('end', results => updateClient.close())
			}
		});
	}

	function toTimestamp(date) {
		if (!date)
			return '1972-01-01 00:00';
		return date.getUTCFullYear() + '-' +
			('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
			('00' + date.getUTCDate()).slice(-2) + ' ' +
			('00' + date.getUTCHours()).slice(-2) + ':' +
			('00' + date.getUTCMinutes()).slice(-2);
	}

	columnExists();
};