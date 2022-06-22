import { Request, Response } from 'express';
import fs from 'fs/promises';

import {
    dbPlayerType,
    deleteController,
    getController,
    getControllerId,
    patchController,
    postController,
} from './player.controller';

jest.mock('fs/promises');

describe('Given the controllers functions', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let result: string;
    let mockItem: dbPlayerType;

    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
            body: {},
        };
        mockItem = {
            players: [
                {
                    id: 1,
                    name: 'pepe',
                    team: 'isdi',
                    points: 1,
                    sickless: false,
                },
            ],
        };
        resp = { setHeader: jest.fn(), end: jest.fn(), status: jest.fn() };
        result = JSON.stringify(mockItem) as string;

        (fs.readFile as jest.Mock).mockResolvedValue(result);
    });

    describe('When the function getController is called', () => {
        test('Then resp.end should be called good', async () => {
            await getController(req as Request, resp as Response);

            expect(resp.end).toHaveBeenCalled();
        });
    });

    describe('When the function getControllerId is called', () => {
        test('Then resp.end should be called good', async () => {
            await getControllerId(req as Request, resp as Response);

            expect(resp.end).toHaveBeenCalled();
        });

        test('Then resp.end should be called bad', async () => {
            req = {
                params: {
                    id: '3',
                },
            };
            await getControllerId(req as Request, resp as Response);

            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
    describe('When the function postControllerId is called', () => {
        test('Then resp.end and resp.status should be called', async () => {
            req = {
                body: {
                    name: 'juan',
                    team: 'isdi',
                    points: 4,
                    sickless: false,
                },
            };
            await postController(req as Request, resp as Response);

            expect(resp.end).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(201);
        });
    });
    describe('When the function patchControllerId is called', () => {
        test('Then resp.end and resp.status should be called good', async () => {
            req = {
                params: { id: '1' },
                body: {
                    name: 'juan',
                    team: 'isdi',
                    points: 4,
                    sickless: true,
                },
            };
            await patchController(req as Request, resp as Response);

            expect(resp.end).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(200);
        });

        test('Then resp.end and resp.status should be called bad', async () => {
            req = {
                params: { id: '3' },
                body: {
                    name: 'juan',
                    team: 'isdi',
                    points: 4,
                    sickless: true,
                },
            };
            await patchController(req as Request, resp as Response);

            expect(resp.end).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(200);
        });
    });
    describe('When the function deleteControllerId is called', () => {
        test('Then resp.end and resp.status should be called good', async () => {
            req = {
                params: { id: '1' },
            };
            await deleteController(req as Request, resp as Response);

            expect(resp.end).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(202);
        });
        test('Then resp.end and resp.status should be called good', async () => {
            req = {
                params: { id: '3' },
            };
            await deleteController(req as Request, resp as Response);

            expect(resp.end).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});
