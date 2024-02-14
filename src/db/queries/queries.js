const pool = require("../dbConfig");

const getUser = async (user_name) => {
  const query =
    "SELECT user_id, user_name, first_name, last_name, email_id, password FROM users WHERE user_name=$1";

  const result = await pool.query(query, [user_name]);

  return result.rows[0];
};

const addUser = async (userDetails) => {
  const { user_name, first_name, last_name, email_id, hashedPassword } =
    userDetails;

  const query =
    "INSERT INTO users (user_name, first_name, last_name, email_id, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  const result = await pool.query(query, [
    user_name,
    first_name,
    last_name,
    email_id,
    hashedPassword,
  ]);

  const registrationDetails = {
    user_id: result.rows[0].user_id,
    user_name: result.rows[0].user_name,
  };

  return registrationDetails;
};

const checkUserLoggedIn = async (user_id) => {
  const query = "SELECT session_id, user_id FROM sessions WHERE user_id=$1";

  const result = await pool.query(query, [user_id]);

  return result.rows[0];
};

const userLogin = async (user_id) => {
  const query = "INSERT INTO sessions (user_id) VALUES ($1) RETURNING *";

  const result = await pool.query(query, [user_id]);

  const loginDetails = {
    session_id: result.rows[0].session_id,
    user_id: result.rows[0].user_id,
  };

  return loginDetails;
};

const userLogout = async (user_id) => {
  const query = "DELETE FROM sessions WHERE user_id=$1 RETURNING *";

  const result = await pool.query(query, [user_id]);

  const logoutDetails = {
    session_id: result.rows[0].session_id,
    user_id: result.rows[0].user_id,
  };

  return logoutDetails;
};

const addImagePath = async (imageInfo) => {
  const { user_id, path } = imageInfo;

  const query =
    "INSERT INTO images (user_id, image_path) VALUES ($1, $2) RETURNING *";

  const result = await pool.query(query, [user_id, path]);

  return result.rows[0];
};

module.exports = {
  getUser,
  addUser,
  userLogin,
  userLogout,
  checkUserLoggedIn,
  addImagePath,
};
