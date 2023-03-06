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
      `UPDATE products SET name=?,price=?,description=?,located=?,included=?,capacity=?,sold=?,imagens=?,region=?,latitude=?,longitude=?,rating=?,date=? WHERE id=?`,
      [
        product.name,
        product.price,
        product.description,
        product.located,
        product.included,
        product.capacity,
        product.sold,
        product.imagens,
        product.region,
        product.latitude,
        product.longitude,
        product.rating,
        product.date,
        id,
      ]
    );
  });
}

export async function insertProduct(product) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO products(name,price,description,located,included,capacity,sold,imagens,region,longitude,latitude,rating,date)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        product.name,
        product.price,
        product.description,
        product.located,
        product.included,
        product.capacity,
        product.sold,
        product.imagens,
        product.region,
        product.latitude,
        product.longitude,
        product.rating,
        product.date,
      ]
    );
  });
}
