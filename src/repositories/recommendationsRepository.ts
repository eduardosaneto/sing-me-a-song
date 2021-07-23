import connection from "../database";

export async function insert(name: string, youtubeLink: string) {
  const recommendation = await connection.query(`
  INSERT INTO songs (name,link,score) VALUES ($1, $2, $3)
  `, [name, youtubeLink, 0]);

  return recommendation.rows;
}

export async function score(id: number) {
  const actualScore = await connection.query(`SELECT * FROM songs WHERE id = $1
  `, [id]);
  
  return actualScore.rows[0].score;
}

export async function upScore(id: number, newScore: number) {
  const upvote = await connection.query(`UPDATE songs SET score = $1 WHERE id = $2
  `, [newScore, id]);

  return upvote.rows;
}

export async function downScore(id: number, newScore: number) {
  const downvote = await connection.query(`
  UPDATE songs SET score = $1 WHERE id = $2
  `, [newScore, id]);

  return downvote.rows;
}

export async function deleteSong(id: number) {
  const deleted = await connection.query(`DELETE FROM songs WHERE id = $1
  `, [id]);

  return deleted.rows;
}