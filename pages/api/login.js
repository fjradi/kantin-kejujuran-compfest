import localStrategy from "../../lib/password-local";
import passport from "passport";
import nextConnect from "next-connect";
import { setLoginSession } from "../../lib/auth";

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });

passport.use(localStrategy);

const handler = nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate("local", req, res);
      const session = { ...user };

      await setLoginSession(res, session);

      res.status(200).send({ done: true });
    } catch (err) {
      console.log(err.message);
      res.status(401).json({ error: err.message });
    }
  });

export default handler;
