_ = require('underscore');

// Required packages
express = require('express');
app = express();
async = require("async");
var pg = require('pg');

// Database init
var pgURL = process.env.DATABASE_URL || 'postgres://postgres:pass@localhost:5432/jobb';
pgClient = function() {
	return new pg.Client(pgURL)
}
// Insert data
require('./db/createTables.js');

// Init router
require('./router.js');

// Start server
var port = 3000;
app.listen(port);
console.log('Server started on port ' + port);