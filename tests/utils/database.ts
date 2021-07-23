import connection from "../../src/database";

export async function clearDatabase () {
  await connection.query(`TRUNCATE "songs" RESTART IDENTITY`);
  // await connection.query(`DELETE FROM "songs"`);
}

export async function closeConnection () {
  await connection.end();
}