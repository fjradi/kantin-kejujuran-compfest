import prisma from "../../lib/db";
import bcrypt from "bcrypt";

const saltRounds = 10;

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { studentID, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    prisma.user
      .create({
        data: {
          id: studentID,
          password: hashedPassword,
        },
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
  } else if (req.method === "GET") {
    const { student_id: studentID } = req.query;
    prisma.user
      .findOne({
        where: {
          id: studentID,
        },
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
  }
};

export default handler;
