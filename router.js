
// Use Express's built in router
router = express.Router();

// Test route, just to see if anything is working
router.get('/', function(req, res) {
    res.json({ message: 'all is well' });
});

// API GET top active users
router.get('/topActiveUsers', function(req, res) {
    Database.getTopActiveUsers(req.query.page, res);
});

// API GET user info
router.get('/users', function(req, res) {
    Database.getUserInfo(req.query.id, res);
});

// Register routes
app.use('/', router);