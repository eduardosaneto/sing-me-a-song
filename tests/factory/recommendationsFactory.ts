import connection from "../../src/database";

export function generateBody () {
  return {
    name: 'Falamansa - Xote dos Milagres',
    youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
  };
}

async function generateSong(score: number) {
  const song = generateBody ();
  const insertedSong = await connection.query(`
  INSERT INTO songs (name, link, score) VALUES ($1, $2, $3) RETURNING *
  `, [song.name, song.youtubeLink, score]);

  return insertedSong.rows[0]
}

export async function upScore() {   
  const insertedSong = await generateSong(0);
  const actualScore = insertedSong.score;    
  let newScore = actualScore + 1; 

  const score = await updateScore(newScore, insertedSong);
  
  return score;
}

export async function downScore() {   
  const insertedSong = await generateSong(0);
  const actualScore = insertedSong.score;    
  let newScore = actualScore + 1; 

  const score = await updateScore(newScore, insertedSong);

  return score;
}

async function updateScore(newScore: number, insertedSong: any) {
  const score = await connection.query(`
  UPDATE songs SET score = $1 WHERE link = $2
  `, [newScore, insertedSong.link]);

  return score;
}

export async function load() {

  await generateSong(0);   

  const songs = await connection.query(`SELECT * FROM songs ORDER BY RANDOM() LIMIT 1`);

  return songs.rows[0];
}

export async function checkSongs() {
  const response = await connection.query(`SELECT COUNT(*) AS RowCnt FROM songs`);
  return response.rowCount;
}

export async function loadTop() {

  await generateSong(17);

  const getTop = await connection.query(`
  SELECT * FROM recommendations
  ORDER BY score DESC LIMIT $1`, [17]);

  return getTop.rows;     
}