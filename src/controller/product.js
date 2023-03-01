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

export async function insertProduct(product) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO products(name,price,description,located,cordinates,included,capacity,sold,imagens)VALUES(?,?,?,?,?,?,?,?,?)",
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
      ]
    );
  });
}
