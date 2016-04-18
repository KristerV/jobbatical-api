# Jobbatical assignment

## Start server

Start server with `npm start` and go to [http://localhost:3000](http://localhost:3000)

## Results

**Backend** tasks were completed in 10h:10m.

**Frontend** tasks were completed in 1h:50m.

Timing precision is 10m. The backend took me a lot longer than a proper Node.js developer would have spent. More details in "Development notes".

## Development notes

#### Time spent

Node.js and SQL took a lot of time.

I have experience with npm and other parts of Node.js thanks to working with Meteor.js, but it turns out they're completely different so I've decided to remove Node.js from my CV. I'll get my head around it quickly, it's not really a problem, but just to be honest about my skills.

Figuring out SQL after years of MongoDB took a while. I have years of experience with SQL, but none lately. I also was not aware of new PostgreSQL features like json_build_object() so the manual work took it's toll. I also made effort to do as much in SQL and as little data crunching in JavaScript as possible - was not worth the time consumed and reverted to JS in many cases in the end.

 #### Structure

 I realize this program is full of spaghetti code. Production code should be more thought through.

 #### Denormalization

 After spending many hours on it I didn not find a way for SQL to `ORDER BY` users last activity (based on info from multiple tables) so I denormalized the data into users.last_activity. I wonder if SQL knows a better way of doing it.

 ## Feedback is welcome!

 What was good and what could have been done better? Either open an issue on GitHub or send it to krister.viirsaar@gmail.com