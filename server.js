
// Required packages
_ = require('underscore');
express = require('express');
app = express();
async = require("async");

// Init database and insert fake data if DB empty
require('./db/init.js');

// Init router
require('./router.js');

// Start server
var port = 3000;
app.listen(port);
console.log('Server started on port ' + port);