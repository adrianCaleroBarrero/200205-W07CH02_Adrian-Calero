import { iPlayer } from '../interfaces/player';
import { Request, Response } from 'express';

let players: Array<iPlayer> = [];

export const getController = (req: Request, resp: Response) => {
    req;
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(players));
};

export const getControllerId = (req: Request, resp: Response) => {
    resp.setHeader('Content-type', 'application/json');
    const result = players.find((player) => player.id === +req.params.id);
    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
};

export const postController = (req: Request, resp: Response) => {
    const newPlayer = { ...req.body, id: players[players.length - 1].id + 1 };
    players.push(newPlayer);

    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(JSON.stringify(newPlayer));
};

export const patchController = (req: Request, resp: Response) => {
    let modifyPlayer;
    players = players.map((player) => {
        if (player.id === +req.params.id) {
            modifyPlayer = { ...player, ...req.body };
            return modifyPlayer;
        } else {
            return player;
        }
    });
};

export const deleteController = (req: Request, resp: Response) => {
    const prevLength = players.length;
    players = players.filter((player) => {
        player.id !== +req.params.id;
    });
    resp.status(prevLength === players.length ? 404 : 202);
    resp.end(JSON.stringify({}));
};
