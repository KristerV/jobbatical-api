// Required packages
express = require('express');
app = express();
var pg = require('pg');

// Database init
var pgURL = process.env.DATABASE_URL || 'postgres://postgres:pass@localhost:5432/jobb';
pgClient = function() {
	return new pg.Client(pgURL)
}
// Insert data
require('./db/createTables.js')
require('./db/insertDummyData.js')

// Init router
require('./initRouter.js')

// Start server
var port = 3000;
app.listen(port);
console.log('Server started on port ' + port);