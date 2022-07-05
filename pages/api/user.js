import { getLoginSession } from "../../lib/auth";
import prisma from "../../lib/db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const session = await getLoginSession(req);

      if (!session)
       return res.status(401).json(null);

      await prisma.user
      .findUnique({
        where: {
          id: session.id,
        },
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
    //   const user = (session && (await findUser(session))) ?? null;

      // res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).end("Authentication token is invalid, please log in");
    }
  }
};

export default handler;
