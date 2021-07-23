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

export async function load(percentage: number) {
    let songs = null;

    if (percentage === 70) songs = await connection.query(`
            SELECT * FROM songs WHERE score >= 10          
        `);
    else if(percentage === 30) songs = await connection.query(`
            SELECT * FROM songs WHERE score BETWEEN -5 AND 10                  
        `);
    else songs = await connection.query(`
            SELECT * FROM songs ORDER BY RANDOM() LIMIT 1
        `);
    return songs.rows;
}

export async function checkSongs() {
  const response = await connection.query(`SELECT COUNT(*) AS RowCnt FROM songs`);
  return response.rowCount;
}

export async function loadTop(amount: number) {
  const getTopRecommendations = await connection.query(`
  SELECT * FROM recommendations ORDER BY score DESC LIMIT $1`, [amount]);
  return getTopRecommendations.rows;
}