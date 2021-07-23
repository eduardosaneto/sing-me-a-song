import connection from "../../src/database";

export async function insertSong (name: string, link: string) {
  const data = {
    name: name,
    link: link,
    score: 1
  };

  const song = await connection.query(
    `INSERT INTO songs (name,link,score) VALUES ($1, $2, $3) RETURNING *`,
    [data.name, data.link, data.score]
  );

  return song;
}