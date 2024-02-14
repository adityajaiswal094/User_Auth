const { getUser, userLogin, checkUserLoggedIn } = require("../db/queries/queries");
const { comparePassword } = require("../utils/helper");

const user_login = (app) => {
  app.post("/login", async (req, res) => {
    try {
      const { user_name = "", password = "" } = req.body;

      if (user_name === "" || password === "") {
        return res
          .status(400)
          .json({ title: "Bad Request", message: "Missing required fields" });
      }

      const checkUserExist = await getUser(user_name);

      if (checkUserExist === undefined) {
        return res.status(404).json({
          title: "User Not Found",
          message: "User with the following username does not exist",
        });
      } else {
        const userLoggedIn = await checkUserLoggedIn(checkUserExist.user_id);

        if (userLoggedIn !== undefined) {
          return res
            .status(200)
            .json({ title: "Success", message: "User already logged in" });
        } else {
          const storedPassword = checkUserExist.password;
          const matchPassword = await comparePassword(password, storedPassword);

          if (matchPassword) {
            const loginUser = await userLogin(checkUserExist.user_id);

            return res
              .status(200)
              .json({ title: "User Logged In", details: loginUser });
          }
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        title: "Internal Server Error",
        message: "Something went wrong!",
      });
    }
  });
};

module.exports = user_login;
