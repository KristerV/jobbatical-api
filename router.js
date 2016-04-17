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
    var client = pgClient();
    client.connect();

    var userId = req.query.id;
    if (!Number(userId))
        throw new Error(401, 'User id needs to be a number');

    var query = client.query(`
    	SELECT *
    	FROM users
    	WHERE id='${userId}'
    `);

    var user;
    query.on('row', row => user = row);
    query.on('end', () => {
    	res.json(user);
    	client.end();
    });
});

// Register routes
app.use('/', router);
