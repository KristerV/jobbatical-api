
// Use Expresses built in router
router = express.Router();

// Test route, just to see if anything is working
router.get('/', function(req, res) {
    res.json({ message: 'all is well' });
});

// API GET top active users
router.get('/topActiveUsers', function(req, res) {
    var users = [];

	// Pagination
    var page = 0;
	var limit = 2;
    var reqPage = req.query.page;
    if (Number(reqPage)) // check that it is a number
        page = reqPage * limit;

	// Query users
    var client = pgClient();
    client.connect();
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
    	res.json({users: users});
    	client.end();
    });
});

// API GET user info
router.get('/users', function(req, res) {

    var userId = req.query.id;
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
        callback => queryString('listings', `SELECT * FROM listings WHERE created_by='${userId}'`, callback),
        callback => queryString('applications', `SELECT * FROM applications WHERE user_id='${userId}'`, callback)
    ], (err, results) => {
        if (err)
            console.warn(err);
        else {
            var obj = {};
            for (var i = 0; i < results.length; i++)
                obj = _.extend(obj, results[i]);

            _.extend(obj, obj.users[0]);
            delete obj.users
            res.json(obj);
        }
    });

});

// Register routes
app.use('/', router);

function queryString(name, string, callback) {
    var client = pgClient();
    client.connect();
    var query = client.query(string);
    var rows = [];
    query.on('row', row => rows.push(row));
    query.on('end', () => callback(null, {[name]: rows}));
}