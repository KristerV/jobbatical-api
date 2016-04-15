// Use Expresses built in router
router = express.Router();

// Define route1
router.get('/', function(req, res) {
    res.json({ message: 'tsau' });
});

// Register routes
app.use('/', router);