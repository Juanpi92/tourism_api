import { openDb } from "../infra/configDB.js";

export async function selectAllProduct() {
  return openDb().then((db) => {
    return db.all("SELECT * FROM products");
  });
}
export async function selectOneProduct(id) {
  return openDb().then((db) => {
    return db.get(`SELECT * FROM products WHERE id=${id}`);
  });
}
