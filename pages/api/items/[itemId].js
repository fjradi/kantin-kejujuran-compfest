const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { itemId: id } = req.query;

    prisma.item
      .delete({
        where: {
          id,
        },
      })
      .then((item) => {
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
  } else if (req.method === "GET") {
    const { itemId: id } = req.query;

    await prisma.item
      .findUnique({
        where: {
          id,
        },
      })
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
  }
};

export default handler;
