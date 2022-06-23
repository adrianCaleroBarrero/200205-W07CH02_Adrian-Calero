/* eslint-disable no-unused-vars */
import fs from 'fs/promises';
import { iPlayer } from '../interfaces/player.js';

export class PlayerModel {
    data: Array<iPlayer>;
    path: string;
    constructor(private fileName: string) {
        this.data = [];
        this.path = `./src/server/${this.fileName}.json`;
    }

    private async readFile(): Promise<Array<iPlayer>> {
        return JSON.parse(await fs.readFile(this.path, { encoding: 'utf-8' }));
    }

    private async writeFile(data: Array<iPlayer>) {
        return fs.writeFile(this.path, JSON.stringify(data));
    }

    async findAll(): Promise<Array<iPlayer>> {
        return this.readFile();
    }

    async find(id: string): Promise<iPlayer | undefined> {
        const fileData = await this.readFile();
        const item = fileData.find((player: iPlayer) => player.id === +id);
        return item;
    }

    async create(data: Partial<iPlayer>): Promise<iPlayer> {
        const fileData = await this.readFile();
        const newPlayer = {
            ...data,
            id: fileData[fileData.length - 1].id + 1,
        };
        fileData.push(newPlayer as iPlayer);
        this.writeFile(fileData);
        return newPlayer as iPlayer;
    }

    async update(id: string, data: Partial<iPlayer>): Promise<iPlayer> {
        let fileData = await this.readFile();
        if (data.id) delete data.id;

        let modifyPlayer;
        fileData = fileData.map((player) => {
            if (player.id === +id) {
                modifyPlayer = { ...player, ...data };
                return modifyPlayer;
            } else {
                return player;
            }
        });
        this.writeFile(fileData);
        return modifyPlayer as unknown as iPlayer;
    }

    async delete(id: string) {
        let fileData = await this.readFile();
        const prevLength = fileData.length;
        fileData = fileData.filter((player) => player.id !== +id);
        if (prevLength === fileData.length) return { status: 404 };
        this.writeFile(fileData);
        return { status: 202 };
    }
}
