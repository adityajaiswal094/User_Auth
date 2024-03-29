const { getUser, addUser } = require("../db/queries/queries");
const {hashPassword} = require("../utils/helper");

const user_registration = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const {
        user_name = "",
        first_name = "",
        last_name = "",
        email_id = "",
        password = "",
      } = req.body;

      if (
        user_name === "" ||
        first_name === "" ||
        last_name === "" ||
        email_id === "" ||
        password === ""
      ) {
        return res
          .status(400)
          .json({ title: "Bad Request", message: "Missing required fields" });
      }

      const checkUserExist = await getUser(user_name);

      if (checkUserExist !== undefined) {
        return res.status(400).json({
          title: "Bad Request",
          message: "User with the following details already exists!",
        });
      } else {
        const hashedPassword = await hashPassword(password);

        const userDetails = {
          user_name,
          first_name,
          last_name,
          email_id,
          hashedPassword,
        };
        const registerUser = await addUser(userDetails);

        return res.status(200).json({title: "User Registered Successfully", details: registerUser});
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

module.exports = user_registration;
