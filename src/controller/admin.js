import { openDb } from "../infra/configDB.js";

export async function validateAdminEmail(email) {
  return openDb().then((db) => {
    return db.get(`SELECT * FROM admin WHERE email="${email}"`);
  });
}

export async function getAllUser() {
  return openDb().then((db) => {
    return db.get(`SELECT * FROM users`);
  });
}

export async function getCompras() {
  return openDb().then((db) => {
    return db.all(
      `SELECT id_compras,products.name as tour,products.located,imagens,data_compra,data_tour,payment,users.name FROM compras 
INNER JOIN products ON compras.id_product=products.id INNER JOIN users ON compras.id_user=users.user_id`
    );
  });
}
