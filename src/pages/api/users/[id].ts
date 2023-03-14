import { apiHandler, omit, usersRepo } from "helpers/api";

const bcrypt = require("bcryptjs");

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

function getById(req: any, res: any) {
  const user = usersRepo.getById(req.query.id);

  if (!user) throw "User Not Found";

  return res.status(200).json(omit(user, "hash"));
}

function update(req: any, res: any) {
  const user = usersRepo.getById(req.query.id);

  if (!user) throw "User Not Found";

  // split out password from user details
  const { password, ...params } = req.body;

  // validate
  if (
    user.username !== params.username &&
    usersRepo.find((x: any) => x.username === params.username)
  )
    throw `User with the username "${params.username}" already exists`;

  // only update hashed password if entered
  if (password) {
    user.hash = bcrypt.hashSync(password, 10);
  }

  usersRepo.update(req.query.id, params);
  return res.status(200).json({});
}

function _delete(req: any, res: any) {
  usersRepo.delete(req.query.id);
  return res.status(200).json({});
}
