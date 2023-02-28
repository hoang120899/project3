import { apiHandler, omit, usersRepo } from "helpers/api";
import { User } from "models";

export default apiHandler({
  get: getUsers,
});

function getUsers(req: any, res: any) {
  // return users without hashed passwords in the response
  const response = usersRepo.getAll().map((x: User) => omit(x, "hash"));
  return res.status(200).json(response);
}