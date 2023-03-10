import { User } from "models";
import { v4 as uuidv4 } from "uuid";

const fs = require("fs");
// users in JSON file for simplicity, store in a db for production applications
let users = require("data/users.json");

export const usersRepo = {
  getAll: () => {
    return users;
  },
  getById: (id: string) => {
    return users.find((x: User) => x.id.toString() === id.toString());
  },
  find: (x: any) => users.find(x),
  create,
  update,
  delete: _delete,
};

function create(user: User) {
  // generate new user id
  user.id = uuidv4();
  // set date created and updated
  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString();
  // genarate another data
  user.note = user.note || "";
  // add and save user
  users.push(user);
  saveData();
}

function update(id: string, params: any) {
  const user = users.find((user: User) => user.id === id);

  // set date updated
  user.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(user, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: string) {
  // filter out deleted user and save
  users = users.filter((x: any) => x.id.toString() !== id.toString());
  saveData();
}

// private helper functions

function saveData() {
  fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4));
}
