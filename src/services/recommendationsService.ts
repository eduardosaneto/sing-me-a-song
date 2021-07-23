import * as recommendationsRepository from "../repositories/recommendationsRepository";

export async function upScore(id: number) {
    let score = await recommendationsRepository.score(id);
    let newScore = score + 1; 
    await recommendationsRepository.upScore(id, newScore);
}

export async function downScore(id: number) {
    let score = await recommendationsRepository.score(id);
    let newScore = score - 1; 

    if(newScore < -4) {
        await recommendationsRepository.deleteSong(id);        
    }
    await recommendationsRepository.downScore(id, newScore);
}

export async function load () {
    const limit = Math.random();
    const checkSongs = await recommendationsRepository.checkSongs();
    let songsObj = {};
    let songs = null;

    if(checkSongs !== 0) {
        if(limit > 0.3) {
            const percentage = 70;
            songs = await recommendationsRepository.load(percentage);
        } else if (limit < 0.3){
            const percentage = 0;
            songs = await recommendationsRepository.load(percentage);      
        } else {
            const percentage = 0;
            songs = await recommendationsRepository.load(percentage);   
        }
        songsObj = songs.map((i) => {
            return {
                id: i.id,
		        name: i.name,
		        youtubeLink: i.youtubeLink,
		        score: i.score
            };
        });     

        return songsObj;
    } else return false;    
}

export async function loadTop(amount: number) {
    return await recommendationsRepository.loadTop(amount);
}