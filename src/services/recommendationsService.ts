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
