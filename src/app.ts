import express from 'express';
import morgan from 'morgan';
import { playerRouter } from './router/player.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/player', playerRouter);
