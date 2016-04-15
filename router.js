// Use Expresses built in router
router = express.Router();

// Test route, just to see if server is working
router.get('/', function(req, res) {
    res.json({ message: 'all is well' });
});

// API active users
router.get('/topActiveUsers', function(req, res) {
    var users = [];

	// Pagination
	var page = req.query.page || 0;
	var limit = 2;

	// Query users
    var client = pgClient();
    client.connect();
    var query = client.query(`
    	SELECT
    		users.id,
			users.created_at,
			users.name,
			COUNT(applications.listing_id) AS count,
			array_agg(listings.created_at) AS listings
    	FROM users 
    	LEFT JOIN applications ON users.id=applications.user_id AND applications.created_at > NOW() - INTERVAL '7 days'
    	LEFT JOIN listings ON users.id=listings.created_by
    	GROUP BY users.id
    	LIMIT ${limit} 
    	OFFSET ${page}
    	`);
    query.on('row', row => users.push(row));
    query.on('end', () => {
    	res.json({users: users});
    	client.end();
    });
});

// Register routes
app.use('/', router);
