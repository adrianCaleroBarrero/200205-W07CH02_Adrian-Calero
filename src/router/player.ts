import { Router } from 'express';
import {
    deleteController,
    getController,
    getControllerId,
    patchController,
    postController,
} from '../controllers/player.controller';
import { iPlayer } from '../interfaces/player';

export const playerRouter = Router();

let players: Array<iPlayer> = [];
playerRouter.get('/', getController);

playerRouter.get('/:id', getControllerId);

playerRouter.post('/', postController);

playerRouter.patch('/:id', patchController);

playerRouter.delete('/:id', deleteController);
