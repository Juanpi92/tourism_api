import sqlite3 from "sqlite3";
import { open } from "sqlite";

//Conect to the dtabase
// you would have to import / invoke this in another file
export async function openDb() {
  return open({
    filename: process.env.DATABASE,
    driver: sqlite3.Database,
  });
}
