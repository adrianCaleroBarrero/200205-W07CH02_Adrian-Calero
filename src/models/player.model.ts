/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';
import { mongoConnect } from '../db/mongo.js';
import { iPlayer } from '../interfaces/player.js';

export class PlayerModel implements iPlayer {
    id: number;
    constructor(
        public name: string = '',
        public team: string = '',
        public points: number = 0,
        public sickless: boolean = false
    ) {
        this.id = 0;
    }

    async findAll() {
        const { connect, collection } = await mongoConnect('NBA', 'Players');
        const cursor = collection.find();
        const result = (await cursor.toArray()) as unknown as Promise<
            Array<iPlayer>
        >;
        connect.close();
        return result;
    }

    async find(id: string) {
        const { connect, collection } = await mongoConnect('NBA', 'Players');
        const dbId = new ObjectId(id);
        const result = (await collection.findOne({
            _id: dbId,
        })) as unknown as iPlayer;
        if (result === null) return undefined;
        connect.close();
        return result;
    }

    async create(data: Partial<iPlayer>) {
        const { connect, collection } = await mongoConnect('NBA', 'Players');
        const result = (await collection.insertOne(data)) as unknown as iPlayer;
        connect.close();
        return result;
    }

    async update(id: string, data: Partial<iPlayer>) {
        const { connect, collection } = await mongoConnect('NBA', 'Players');

        const dbId = new ObjectId(id);
        const result = (await collection.findOneAndUpdate(
            { _id: dbId },
            { $set: { ...data } }
        )) as unknown as iPlayer;
        connect.close();

        return result;
    }

    async delete(id: string) {
        const { connect, collection } = await mongoConnect('NBA', 'Players');
        const dbId = new ObjectId(id);
        const result = await collection.findOneAndDelete({ _id: dbId });

        connect.close();
        if (!result.value) return { status: 404 };

        return { status: 202 };
    }
}
