import prisma from "../../../lib/db";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = await new Promise((resolve, reject) => {
      const form = formidable();

      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

    await cloudinary.uploader.upload(data.files.image.filepath, {folder: "kantin-kejujuran-compfest"}, async (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        try {
          const item = await prisma.item.create({
            data: {
              name: data.fields.name,
              price: parseInt(data.fields.price),
              imageUrl: result.url,
              description: data.fields.description,
              createdAt: undefined,
            },
          });
          res.status(200).send();
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    });
  } else if (req.method === "GET") {
    const { sort_by: sortBy, order } = req.query;

    await prisma.item
      .findMany({
        orderBy: {
          [sortBy]: order,
        },
      })
      .then((items) => {
        res.status(200).json(items);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
  }
};

export default handler;
