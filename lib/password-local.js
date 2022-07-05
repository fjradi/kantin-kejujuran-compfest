import Local from "passport-local";
import prisma from "./db";
import bcrypt from "bcrypt";

const validatePassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);

  return isValid;
};

const localStrategy = new Local.Strategy(
  {
    usernameField: "studentID",
    passwordField: "password"
  },
  (username, password, done) => {
    prisma.user
      .findUnique({
        where: {
          id: username,
        },
      })
      .then((user) => {
        return validatePassword(password, user.password).then((isValid) => {
          if (isValid) {
            done(null, user);
          } else {
            done(new Error("Invalid username and password combination"));
          }
        });
      })
      .catch((err) => {
        done(err);
      });
  }
);

export default localStrategy;
