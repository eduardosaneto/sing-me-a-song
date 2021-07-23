import connection from "../../src/database";

export function generateBody () {
  return {
    name: 'Falamansa - Xote dos Milagres',
    youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
  };
}

async function generateSong() {
  const song = generateBody ();
  const insertedSong = await connection.query(`
  INSERT INTO songs (name, link, score) VALUES ($1, $2, $3) RETURNING *
  `, [song.name, song.youtubeLink, 0]);

  return insertedSong.rows[0]
}

export async function upScore() {   
  const insertedSong = await generateSong();
  const actualScore = insertedSong.score;    
  let newScore = actualScore + 1; 

  const score = await updateScore(newScore, insertedSong);
  
  return score;
}

export async function downScore() {   
  const insertedSong = await generateSong();
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