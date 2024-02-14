# User Authentication

## About this application

An Express.js application that allows user to sign up, login, logout and upload images.

## Features

1. Register, login, logout.
2. Password is stored through hashing using bcrypt.
3. Efficient error handling.
4. Only logged in users can upload images.
5. Image is stored locally in the project and the path to the file is stored in db.

## Setting up

1. Download and install PostgreSQL (v13.11) and pgAdmin4 (v7.2) in your system.
2. Download and install Git in your system.
3. Clone this repo in your system and open in your IDE (eg: VSCode).
4. Open your psql terminal and create a DB in your postgres engine named **user_auth**. Use postgres as your user.

   - `psql -U postgres -d postgres`

   - `CREATE DATABASE user_auth;`

   - `\c user_auth`

   After this you will be connected to the `user_auth` DB.

5. **.env** file config:

   - Create a `.env` file in your root directory and enter the following details as written here:
     - PORT=8080
     - DB_USER='postgres'
     - DB_HOST='localhost'
     - DB_DATABASE='user_auth'
     - DB_PASSWORD='your_password' (write your postgres server password in place of 'your_password')
     - DB_PORT=5432

6. Create a dir named `uploadedImages` in `src`.

7. Run `npm install` in your root directory to install all the necessary dependencies.

## Getting started

1. Run the following command in root directory to run the schema migration:

   - `npx knex migrate:latest --env development`

2. Now, in your root directory, run the command `npm run dev` to start the server.
3. Finally, use Postman to test the APIs.

## APIs

Base URL = `http://localhost:8080`

1. `POST` route to register user. The request accepts a JSON body with the following keys: user_name, first_name, last_name, email_id and password.

   If a user with the given username already exists, then the system will return an error message saying the user already exists.

   - Endpoint: `/register`
   - Example: `http://localhost:8080/register`

   JSON body example: {
   "user_name": "babayaga",
   "first_name": "John",
   "last_name": "Wick",
   "email_id": "<john_wick@gmail.com>",
   "password": "john@12345"
   }

2. `POST` route to login. The request accepts a JSON body with the following keys: user_name and password.

   If the user is already logged in, then the system will return a success message saying the user is already logged in.

   - Endpoint: `/login`
   - Example: `http://localhost:8080/login`

   JSON body example: {
   "user_name": "babayaga",
   "password": "john@12345"
   }

3. `POST` route to logout. The request accepts a JSON body with the following details: user_id.

   If the user is not logged in, and someone tries to logout, then the system will return a 404 error saying user is not logged in.

   - Endpoint: `/logout`
   - Example: `http://localhost:8080/logout`

   JSON body example: {
   "user_id": 5
   }

4. `POST` route to upload image. The request accepts a JSON body with the following details: `form_data` with the **key** name as **image** where user will attach image to be uploaded, and the request will accept a header with the **key** name as **user_id**.

   If the user_id is not provided, the request will return an error message saying header 'user_id' is missing.

   If the user with the provided user_id, the request will return an error message saying the user should be logged in.

   - Endpoint: `/upload-image`
   - Example: `http://localhost:8080/upload-image`

   header: {'user_id': 5}

   form-data: {'image': \*file to be uploaded\*}

## Sample cURLs

1. curl --location '<http://localhost:8080/register>' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "user_name": "babayaga",
   "first_name": "John",
   "last_name": "Wick",
   "email_id": "<john_wick@gmail.com>",
   "password": "john@12345"
   }'

2. curl --location '<http://localhost:8080/login>' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "user_name": "babayaga",
   "password": "john@12345"
   }'

3. curl --location '<http://localhost:8080/logout>' \
   --header 'Content-Type: application/json' \
   --data '{
   "user_id": 5
   }'

4. curl --location '<http://localhost:8080/upload-image>' \
   --header 'user_id: 5' \
   --form 'image=@"/C:/Users/aditya/Desktop/onboarding1.jpg"'

## Knex migration commands

1. To apply latest migration:

   - `npx knex migrate:latest --env development`

2. To rollback a migration:

   - `npx knex migrate:rollback`

3. To create new migration file:
   - `npx knex migrate:make 00X_action_name`
   - Example: `npx knex migrate:make 001_create_schema_users`, `npx knex migrate:make 002_make_user_name_unique`
