import { openDb } from "../infra/configDB.js";

export async function selectAllProduct() {
  return openDb().then((db) => {
    return db.all("SELECT * FROM products");
  });
}
