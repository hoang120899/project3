import { errorHandler, jwtMiddleware } from "helpers/api";

export { apiHandler };

function apiHandler(handler: any) {
  return async (req: Request, res: any) => {
    const method = req.method.toLowerCase();
    console.log(method);
    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler[method](req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
