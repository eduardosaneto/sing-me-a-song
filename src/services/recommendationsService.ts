import * as recommendationsRepository from "../repositories/recommendationsRepository";

export async function upvote (id: number) {
    let score = await recommendationsRepository.score(id);

    let newScore = score + 1; 

    await recommendationsRepository.upvote(id, newScore);
}