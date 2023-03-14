import { apiHandler, omit, usersRepo } from "helpers/api";
import { User } from "src/models";

export default apiHandler({
  get: getUsers,
});

function getUsers(req: any, res: any) {
  // return users without hashed passwords in the response
  console.log(1111111);
  const response = usersRepo.getAll().map((x: User) => omit(x, "hash"));
  return res.status(200).json(response);
}
