const express = require("express");

const dotenv = require("dotenv");
const user_registration = require("./src/apis/user_registration");
const user_login = require("./src/apis/user_login");
const user_logout = require("./src/apis/user_logout");
const upload_image = require("./src/apis/upload_image");

dotenv.config();

const app = express();

app.use(express.json());

// apis

user_registration(app);
user_login(app);
user_logout(app);
upload_image(app);

//

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
