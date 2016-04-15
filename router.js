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
	var limit = 10;

	// Query users
    var client = pgClient();
    client.connect();
    var query = client.query(`
    	SELECT
    		*, 
    		(
    			SELECT COUNT(*) FROM applications 
    			WHERE created_at > NOW() - INTERVAL '7 days' 
    			AND users.id=applications.user_id
	    	) ,
    		ARRAY(
    			SELECT created_at 
    			FROM listings 
    			WHERE users.id=listings.created_by
    			ORDER BY created_at DESC 
    			LIMIT 1
    		) AS listings
    	FROM users 
    	ORDER BY listings.created_at 
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