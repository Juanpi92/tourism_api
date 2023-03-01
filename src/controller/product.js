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

export async function deleteOneProduct(id) {
  openDb().then((db) => {
    db.run(`DELETE FROM products WHERE id=${id}`);
  });
}
export async function updateOneProduct(id) {
  openDb().then((db) => {
    db.run(`DELETE FROM products WHERE id=${id}`);
  });
}

export async function insertProduct(product) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO products(name,price,description,located,cordinates,included,capacity,sold,imagens,region)VALUES(?,?,?,?,?,?,?,?,?,?)",
      [
        product.name,
        product.price,
        product.description,
        product.located,
        product.cordinates,
        product.included,
        product.capacity,
        product.sold,
        product.imagens,
        product.region,
      ]
    );
  });
}
