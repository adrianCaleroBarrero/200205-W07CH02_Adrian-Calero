import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export async function mongoConnect(db: string, collectionName: string) {
    const url = process.env.URL_MONGO;
    const mongoClient = new MongoClient(url as string);

    const connect = await mongoClient.connect();
    const collection = connect.db(db).collection(collectionName);

    return { connect, collection };
}
