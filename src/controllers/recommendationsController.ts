import { Request, Response } from "express";
import { recommendationsSchema } from "../schemas/recommendationsSchema";

import * as recommendationsRepository from "../repositories/recommendationsRepository";
import * as recommendationsService from "../services/recommendationsService";

export async function insert(req: Request, res: Response) {
    try {
        const validBody = recommendationsSchema.validate(req.body);
        const { name, youtubeLink } = req.body;

        if (!validBody.error) {
            await recommendationsRepository.insert(name, youtubeLink);
        } else {
            res.sendStatus(422);
        }
        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }        
}

export async function upvote(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await recommendationsService.upvote(id);
        res.send(result);      

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}