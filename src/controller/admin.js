import { openDb } from "../infra/configDB.js";

export async function validateAdminEmail(email) {
  return openDb().then((db) => {
    return db.get(`SELECT * FROM admin WHERE email="${email}"`);
  });
}

export async function getAllUser() {
  return openDb().then((db) => {
    return db.all(`SELECT * FROM users`);
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

//Update the data and price of product
export async function patchProduct(id, product) {
  const product_property = Object.keys(product)[0];
  let value = product[product_property];
  if (product_property === "price") {
    return openDb().then((db) => {
      return db.run(`UPDATE products SET price=? WHERE id=${id}`, [value]);
    });
  }
  if (product_property === "Date") {
    return openDb().then((db) => {
      return db.run(`UPDATE products SET Date=?,sold=? WHERE id=${id}`, [
        value,
        0,
      ]);
    });
  }
  throw new Error("cant access database");
}
