import { openDb } from "../infra/configDB.js";

export async function validateEmail(email) {
  return openDb().then((db) => {
    return db.get(`SELECT * FROM users WHERE email="${email}"`);
  });
}

export async function patchUser(id, user) {
  const user_property = Object.keys(user)[0];
  let value = user[user_property];
  if (user_property === "images") {
    value = value.join(",");
  }
  return openDb().then((db) => {
    return db.run(`UPDATE users SET ${user_property}=? WHERE user_id=${id}`, [
      value,
    ]);
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

export async function comprar(compra) {
  return openDb().then((db) => {
    db.run(
      "INSERT INTO compras(id_user,id_product,data_compra,data_tour,tickets)VALUES(?,?,?,?,?)",
      [
        compra.id_user,
        compra.id_product,
        compra.data_compra,
        compra.data_tour,
        compra.tickets,
      ]
    );
  });
}
