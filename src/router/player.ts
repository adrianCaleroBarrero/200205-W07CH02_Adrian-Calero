import { Router } from 'express';
import {
    deleteController,
    getController,
    getControllerId,
    patchController,
    postController,
} from '../controllers/player.controller.js';

export const playerRouter = Router();

playerRouter.get('/', getController);

playerRouter.get('/:id', getControllerId);

playerRouter.post('/', postController);

playerRouter.patch('/:id', patchController);

playerRouter.delete('/:id', deleteController);
