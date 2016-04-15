client = pgClient()
client.connect();

console.log("INSERT TABLES")
var query = client.query(`
	create table IF NOT EXISTS users (
		id serial primary key,
		created_at timestamp default current_timestamp,
		name character varying(64)
	);

	create table IF NOT EXISTS companies (
		id serial primary key,
		created_at timestamp default current_timestamp,
		name character varying(64)
	);

	create table IF NOT EXISTS teams (
		id serial primary key,
		company_id integer references companies (id),
		user_id integer references users (id),
		contact_user boolean default false
	);

	create table IF NOT EXISTS listings (
		id serial primary key,
		created_at timestamp default current_timestamp,
		created_by integer references users (id),
		name character varying(64),
		description text
	);

	create table IF NOT EXISTS applications (
		id serial primary key,
		created_at timestamp default current_timestamp,
		user_id integer references users (id),
		listing_id integer references listings (id),
		cover_letter text
	);
`);

// Terminate connection
query.on('end', function() {
	client.end();
	console.log("INSERT TABLES DONE")
	require('./insertDummyData.js')
});