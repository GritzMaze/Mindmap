# Mindmap server


### Set up server

**Note: This commands will set up only the server! To run the whole project refer to main [Readme](https://github.com/GritzMaze/Mindmap#readme) file**
- Copy `.env.example` to `.env` and fill in the variables.
- Run `npm install` in the root directory first to install all the dependencies.
- Run `npm install` in this to install all the server dependencies.
- Run `npm run db:client:generate` to generate the database client.
- Run `npm run db:migrate` to migrate the database.
- Run `npm start` to start the server.


## Some Useful Commands

### Run tests
- Run `npm run test` to run the tests.
- Run `npx jest --coverage` to run the tests with coverage.

### Run linter
- Run `npm run lint` to run the linter.

### Create migration
- Run `npm run db:migration:create -- --name <migration_name>` to create a migration.

### Generate database client
- Run `npm run db:client:generate` to generate the database client.

### Migrate database
- Run `npm run db:migrate` to migrate the database.
