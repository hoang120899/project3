export { errorHandler };

function errorHandler(err: any, res: any) {
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    console.error("UnauthorizedError");
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  console.error(err);
  return res.status(500).json({ message: err.message });
}
