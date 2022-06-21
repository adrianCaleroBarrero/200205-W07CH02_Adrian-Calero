import { Request, Response } from 'express';
import fs from 'fs/promises';
import { iPlayer } from '../interfaces/player.js';

const dataFilePath = './src/server/db.json';
type dbPlayerType = {
    players: Array<iPlayer>;
};

export const getController = async (req: Request, resp: Response) => {
    req;
    const players = await fs.readFile(dataFilePath, { encoding: 'utf-8' });
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(JSON.parse(players) as dbPlayerType));
};

export const getControllerId = async (req: Request, resp: Response) => {
    resp.setHeader('Content-type', 'application/json');
    const players = await fs.readFile(dataFilePath, { encoding: 'utf-8' });
    const search = JSON.parse(players) as dbPlayerType;
    const result = search.players.find(
        (player: iPlayer) => player.id === +req.params.id
    );
    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
};

export const postController = async (req: Request, resp: Response) => {
    const players = await fs.readFile(dataFilePath, { encoding: 'utf-8' });
    const search = JSON.parse(players) as dbPlayerType;
    const newPlayer = {
        ...req.body,
        id: search.players[search.players.length - 1].id + 1,
    };
    search.players.push(newPlayer);
    fs.writeFile(dataFilePath, JSON.stringify(search));
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(JSON.stringify(newPlayer));
};

export const patchController = async (req: Request, resp: Response) => {
    const players = await fs.readFile(dataFilePath, { encoding: 'utf-8' });
    const search = JSON.parse(players) as dbPlayerType;
    let modifyPlayer;
    search.players = search.players.map((player) => {
        if (player.id === +req.params.id) {
            modifyPlayer = { ...player, ...req.body };
            return modifyPlayer;
        } else {
            return player;
        }
    });
    fs.writeFile(dataFilePath, JSON.stringify(search));
    resp.setHeader('Content-type', 'application/json');
    resp.status(200);
    resp.end(JSON.stringify(modifyPlayer));
};

export const deleteController = async (req: Request, resp: Response) => {
    const players = await fs.readFile(dataFilePath, { encoding: 'utf-8' });
    const search = JSON.parse(players) as dbPlayerType;
    const prevLength = search.players.length;
    search.players = search.players.filter(
        (player) => player.id !== +req.params.id
    );

    fs.writeFile(dataFilePath, JSON.stringify(search));
    resp.status(prevLength === search.players.length ? 404 : 202);
    resp.end(JSON.stringify({}));
};
