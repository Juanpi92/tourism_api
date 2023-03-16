import { openDb } from "../infra/configDB.js";

export async function validateAdminEmail(email) {
  return openDb().then((db) => {
    return db.get(`SELECT * FROM admin WHERE email="${email}"`);
  });
}
