import { openDb } from "../infra/configDB.js";

export async function validateEmail(email) {
  return openDb().then((db) => {
    return db.get(`SELECT * FROM users WHERE email="${email}"`);
  });
}

export async function registerUser(user) {
  return openDb().then((db) => {
    db.run(
      "INSERT INTO users(name,email,password,idioms,profession,located,tel1,tel2,about,images,image_banner,image_profile)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        user.name,
        user.email,
        user.password,
        user.idioms,
        user.profession,
        user.located,
        user.tel1,
        user.tel2,
        user.about,
        user.images,
        user.image_banner,
        user.image_profile,
      ]
    );
  });
}
export async function loginUser(user) {
  return openDb().then((db) => {
    return db.get(
      `SELECT * FROM users WHERE email="${user.email}" AND password="${user.password}"`
    );
  });
}
