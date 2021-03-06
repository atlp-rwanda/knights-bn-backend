# Barefoot Nomad

[![Build Status](https://travis-ci.org/Stackup-Rwanda/knights-bn-backend.svg?branch=develop)](https://travis-ci.org/Stackup-Rwanda/knights-bn-backend)
[![Coverage Status](https://coveralls.io/repos/github/Stackup-Rwanda/knights-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/Stackup-Rwanda/knights-bn-backend?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/4e8b55c7609550d3abb2/maintainability)](https://codeclimate.com/github/Stackup-Rwanda/knights-bn-backend/maintainability)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

## Vision
#### Making company travel and accommodation easy and convenient.


## Description
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

### Technonlogies
- Environment : [Nodejs](https://nodejs.org/)
- Package Manager : [NPM](https://www.npmjs.com)
- Compiler : [Babel](https://babeljs.io/)
- Testing : [Mocha and Chai](https://mochajs.org/)
- Linting : [ESLint](https://eslint.org/)
- Object-relational mapping (ORM) : [Sequelize](https://sequelize.org/)
- Database : [postgresql](https://www.postgresql.org/)

### Requirements and Installation steps

#### You need the following to be able to run the application

[Node](https://nodejs.org/en/download/) a runtime environment for JavaScript

[Postman](https://www.getpostman.com/downloads/) to test the Api endpoints

[Visual studio code](https://code.visualstudio.com/download) for editing and running the app

[PostgreSQL](https://www.postgresql.org/download/) for Database

### Installation

##### A. Clone the project
1. From your computer, open terminal 
2. Run `git clone https://github.com/andela/knights-bn-backend` to clone the repository OR [Download](https://github.com/andela/knights-bn-backend/archive/develop.zip) the project

##### B. Setting up the environment
1. Create a file and name it `.env` in root directory
2. Find a file named `.env.example`
3. use `.env.example` as a blueprint for your `.env`
4. Provide values to all environmental variables in `.env` file.

### Run commands

Open terminal from your computer
1. Run `npm install` to install all dependencies.
2. Run `CREATE DATABASE databasename;` to create your database.
3. Run `npm run createTables` to create your database tables.
4. Run `npm test` to test automatically if the is functioning properly as expected
5. Run `npm start` to run the app in development environment. 
6. copy URL`https://knights-bn-backend-staging.herokuapp.com/api/v1/docs` to the browser for the API Documentation.

7. copy URL`https://knights-bn-backend-staging.herokuapp.com/api/v1/` to postman to start testing the endpoints.
### API endpoints
`- POST /auth/signup - Create user account`

`- POST /auth/login - Signing In a registered user`

`- POST /auth/login/google - Sign-in with Google`

`- POST /auth/login/facebook - Sign-in with Facebook`

`- POST /reset_pw/user -resetting password`

`- PATCH /password/reset/:id/:token - for new password`

`- PATCH /auth/logout - Logout a user`

`- PATCH /users/setUserRole - Set/update a user's role`

`- POST /trips/returnTrip - create a two-way trip request`

`- GET /trips/myRequest - view all my request history`

`- GET /user/profile - get user profile information`

`- PATCH /edit/user/profile - For editing user profile`

`- GET /trips/pendingApproval - view Avail Requests for Approval`

`- GET /remembered - For editing user profile`

`- PATCH /trips/reject/?requestId - view all my request history`

`- POST /trips/request/multicity - For requesting multiple destinations at once`

`- GET /trips/search?filterKey=your search -find Requests through the search functionality`

`- GET /notifications -For checking new notifications`

`- PATCH /notifications -For marking all notification as read`
`- GET /trips/view/request/{id} for viewing single request`

`- GET /trips/edit/request/{id} for editing single request`

`- PATCH /trips/edit/:requestId - For a user to edit an open request. `

`- PATCH /trips/approve/:requestId - For a manager to approve a request and send notification to the user. `

`- GET /trips/request/:requestId - For a user to view specific trip request. `

`- GET /chat:requestId - For Viewing the past chats. `

`- GET /rooms/accommodations/:3 - For viewing available room in an accommodation. `

`- POST /book/accommodations - For booking an accommodation. `

`- GET /bookings - For viewing my bookings. `

`- GET /trips/stats/:date? - For a manager and a user to get statistics of the trips made.`

`- GET /accommodation/comment/:id? - For commenting on accommodation.`

`- GET /most/traveled - For viewing most travelled destinations.`

`- GET /accommodation/like/:id? - For liking accommodation.`

`- GET /accommodation/dislike/:id? - For disliking accommodation.`

`- GET /api/v1/users - For superAdmin to get all Users on the system`

`- /api/v1/users/:email - For superAdmin to get one User`

### Raising an issue
Click [here](https://github.com/andela/knights-bn-backend/issues/new) to create an issue about this app

# Author
 ### code-knights-12

 [Ishimwe William](https://github.com/T2Wil)

[Maxime Kagorora](https://github.com/Kagorora)

 [Eugene Munyampundu](https://github.com/EugeneMunya)

 [Moise Rwibutso](https://github.com/Moise1)

 [Niyonsenga Eric](https://github.com/Niyonsengaeric)


 ### TTL

 [David Muhanguzi](https://github.com/MuhanguziDavid)

 [Kagabo Faustin](https://github.com/kagabof)
 