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

export async function upScore(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        await recommendationsService.upScore(id);
        res.sendStatus(200);     
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function downScore(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        await recommendationsService.downScore(id);
        res.sendStatus(200);     
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}