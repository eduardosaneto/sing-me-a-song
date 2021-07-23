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
            return res.sendStatus(400);
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

export async function load(_: Request, res: Response) {
    try {
        const songs = await recommendationsService.load();
        if(!songs) res.sendStatus(404);
        res.send(songs);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function loadTop(req: Request, res: Response) {
    try {
        const amount = Number(req.params.amount);
        const topSongs = await recommendationsService.loadTop(amount);
        if(!topSongs) res.sendStatus(404);
        res.send(topSongs);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

