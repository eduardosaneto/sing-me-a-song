import connection from "../database";

export async function insert(name: string, youtubeLink: string) {
  const recommendation = await connection.query(`
  INSERT INTO songs (name,link,score) VALUES ($1, $2, $3)
  `, [name, youtubeLink, 0]);

  return recommendation.rows;
}

export async function score (id: number) {
  const actualScore = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);
  // console.log(getScore.rows[0].score)
  return actualScore.rows[0].score;
}

export async function upvote (id: number, newScore: number) {
  const upvote = await connection.query(`
  UPDATE songs SET score = $1 WHERE id = $2
  `, [newScore, id]);

  return upvote.rows;
}