import { Router } from 'express';
import { playerController } from '../controllers/player.controller.js';
import { PlayerModel } from '../models/player.model.js';

export const playersController = new playerController(new PlayerModel('db'));
export const playerRouter = Router();

playerRouter.get('/', playersController.getAllController);

playerRouter.get('/:id', playersController.getControllerId);

playerRouter.post('/', playersController.postController);

playerRouter.patch('/:id', playersController.patchController);

playerRouter.delete('/:id', playersController.deleteController);
