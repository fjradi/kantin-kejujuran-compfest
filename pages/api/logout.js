import { removeTokenCookie } from "../../lib/auth-cookies";

const handler = (req, res) => {
  removeTokenCookie(res);
  res.writeHead(302, { Location: "/" });
  res.end();
};

export default handler;
