# Jobbatical assignment

## Start server

Start server with `npm start` and go to http://localhost:3000

## Results

**Backend** tasks were completed in 10 hours.

**Frontend** tasks were completed in X hours.

Timing is pretty precise and honest. The backend took me a lot longer than a properly experienced developer would have spent. More details in "Development notes".

## Development notes

#### Time spent

I had experience with npm and other parts of Node.js thanks to experience with Meteor.js, but it turns out they're completely different so I've decided to remove Node.js from my CV. I'll get my head around it quickly, it's not really a problem, but just to be honest about my skills.

 I've used SQL for years, but last time was many years ago, so getting back from MongoDB took a good while. Things that I'm used to being incredibly simple are not in SQL (like json formatting). Plus I was not aware of new features in PostgreSQL (like json_build_object()). With every task I tried using SQL as much as possible (and manual JavaScript as little as possible) - this took multiple tries for each task.

 #### Structure

 I realize this program is full of spaghetthy code. Production code should be more thought through.

 #### Denormalization

 Didn't find a way for SQL to `ORDER BY` last activity (based on info from multiple tables) so I denormalized the data into users.last_activity.