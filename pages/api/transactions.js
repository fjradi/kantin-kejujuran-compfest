import prisma from "../../lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { amount } = req.body;

    const {
      _sum: { amount: balance },
    } = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
    });

    if (balance + amount < 0)
      return res.status(400).json({ error: "Insufficient balance" });

    await prisma.transaction
      .create({
        data: {
          id: undefined,
          amount,
          date: undefined,
        },
      })
      .then((transaction) => {
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
  } else if (req.method === "GET" && req.query.agg === "sum") {
    await prisma.transaction
      .aggregate({
        _sum: {
          amount: true,
        },
      })
      .then((transaction) => {
        res.status(200).json({ balance: transaction._sum.amount });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
  }
};

export default handler;
