/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import fs from 'fs/promises';
import { iPlayer } from '../interfaces/player.js';
import { PlayerModel } from '../models/player.model.js';

const dataFilePath = './src/server/db.json';
export type dbPlayerType = {
    players: Array<iPlayer>;
};

export class playerController {
    constructor(public model: PlayerModel) {}

    getAllController = async (req: Request, resp: Response) => {
        req;

        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(await this.model.findAll()));
    };

    getControllerId = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');

        const result = await this.model.find(req.params.id);

        if (result) {
            resp.end(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.end(JSON.stringify({}));
        }
    };

    postController = async (req: Request, resp: Response) => {
        const newPlayer = await this.model.create(req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify(newPlayer));
    };

    patchController = async (req: Request, resp: Response) => {
        const modifyPlayer = await this.model.update(req.params.id, req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.status(200);
        resp.end(JSON.stringify(modifyPlayer));
    };
    deleteController = async (req: Request, resp: Response) => {
        const { status } = await this.model.delete(req.params.id);
        resp.status(status);
        resp.end(JSON.stringify({}));
    };
}
