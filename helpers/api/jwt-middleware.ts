import { expressjwt } from "express-jwt";
import getConfig from "next/config";

const util = require("util");

const { serverRuntimeConfig } = getConfig();
console.log("getConfig", getConfig());

function jwtMiddleware(req: Request, res: Response) {
  const middleware = expressjwt({
    secret: serverRuntimeConfig.mySecret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/register",
      "/api/authenticate",
    ],
  });

  return util.promisify(middleware)(req, res);
}

export { jwtMiddleware };
