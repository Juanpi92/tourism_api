import { openDb } from "../infra/configDB.js";

export async function selectAllProduct() {
  return openDb().then((db) => {
    return db.all("SELECT * FROM products ORDER BY rating DESC");
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
export async function updateOneProduct(id, product) {
  openDb().then((db) => {
    db.run(
      `UPDATE products SET name=?,price=?,description=?,located=?,cordinates=?,included=?,capacity=?,sold=?,imagens=?,region=?,rating=? WHERE id=?`,
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
        product.rating,
        id,
      ]
    );
  });
}

export async function insertProduct(product) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO products(name,price,description,located,cordinates,included,capacity,sold,imagens,region,rating)VALUES(?,?,?,?,?,?,?,?,?,?,?)",
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
        product.rating,
      ]
    );
  });
}
