Database.getTopActiveUsers = function(requestedPage, response) {
	var users = [];

	// Pagination
	var page = 0;
	var limit = 10;
	if (Number(requestedPage)) // check that it is a number
		page = requestedPage * limit;

	// Query users
	var client = Database.newClient();
	var query = client.query(`
    	SELECT
    		users.id,
			users.created_at,
			users.name,
			last_activity,
			COUNT(applications.listing_id) AS count,
			array_agg(listings.created_at) AS listings
    	FROM users
    	LEFT JOIN applications ON users.id=applications.user_id AND applications.created_at > NOW() - INTERVAL '7 days'
    	LEFT JOIN listings ON users.id=listings.created_by
    	GROUP BY users.id
    	ORDER BY last_activity DESC
    	LIMIT ${limit}
    	OFFSET ${page}
    	`);
	query.on('row', row => users.push(row));
	query.on('end', () => {
		response.json({users: users});
		client.end();
	});
};

Database.getUserInfo = function(userId, response) {
	if (!Number(userId))
		throw new Error(401, 'User id needs to be a number');

	async.parallel([
		callback => queryString('users', `SELECT * FROM users WHERE id='${userId}'`, callback),
		callback => queryString('companies', `
            SELECT
                companies.*,
                teams.contact_user
            FROM teams
            RIGHT JOIN companies ON teams.company_id=companies.id
            WHERE teams.user_id='${userId}'
        `, callback),
		callback => queryString('createdListings', `SELECT * FROM listings WHERE created_by='${userId}'`, callback),
		callback => queryString('applications', `
            SELECT
                applications.*,
                json_build_object(
                    'id', li.id,
                    'name', li.name,
                    'description', li.description
                ) AS createdListings
            FROM applications
            LEFT JOIN listings li ON li.id=applications.listing_id
            WHERE user_id='${userId}'
        `, callback)
	], (err, results) => {
		if (err)
			console.warn(err);
		else {
			var obj = {};
			for (var i = 0; i < results.length; i++)
				obj = _.extend(obj, results[i]);

			_.extend(obj, obj.users[0]);
			delete obj.users;
			response.json(obj);
		}
	});
};

function queryString(name, string, callback) {
	var client = Database.newClient();
	var query = client.query(string);
	var rows = [];
	query.on('row', row => rows.push(row));
	query.on('end', () => callback(null, {[name]: rows}));
}