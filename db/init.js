var pg = require('pg');

Database = {
	pgURL: process.env.DATABASE_URL || 'postgres://postgres:pass@localhost:5432/jobb',
	newClient: function() {
		var client = new pg.Client(this.pgURL);
		client.connect();
		return client;
	}
};

require('./createTables.js');
require('./insertDummyData.js');
require('./denormalizeActivity.js');
require('./api.js');

Database.createTables(); // waterfalls info insertDummyData.js and denormalizeActivity.js
