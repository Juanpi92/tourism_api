import { openDb } from "../infra/configDB.js";

export async function selectAllRegion() {
  return openDb().then((db) => {
    return db.all("SELECT DISTINCT region FROM products ORDER BY region DESC");
  });
}
