import { mongoConnect } from '../db/mongo.js';
import { PlayerModel } from './player.model.js';

jest.mock('../db/mongo.js');

describe('Given a instantiated model Notes', () => {
    let model: PlayerModel;

    let mockItem = { id: 1, test: 'test' };
    const mockFind = jest.fn();
    const mockFindOne = jest.fn();
    const mockInsertOne = jest.fn();
    const mockFindOneAndUpdate = jest.fn();
    const mockFindOneAndDelete = jest.fn();

    beforeEach(() => {
        (mongoConnect as jest.Mock).mockReturnValue({
            connect: { close: jest.fn() },
            collection: {
                find: mockFind,
                findOne: mockFindOne,
                insertOne: mockInsertOne,
                findOneAndUpdate: mockFindOneAndUpdate,
                findOneAndDelete: mockFindOneAndDelete,
            },
        });
        model = new PlayerModel('test-db');
    });
    describe('When method findAll is called', () => {
        test('Then collection.find() should be called', async () => {
            mockFind.mockReturnValue({
                toArray: jest.fn().mockResolvedValue({}),
            });
            await model.findAll();
            expect(mockFind).toHaveBeenCalled();
        });
    });
    describe('When method find is called', () => {
        test('Then collection.findOne() should be called', async () => {
            mockFindOne.mockResolvedValue({});
            await model.find('62b4ad0c52108a31996e764c');
            expect(mockFindOne).toHaveBeenCalled();
        });

        test('Then collection.findOne() should be undefined', async () => {
            mockFindOne.mockResolvedValue(null);
            await model.find('62b4ad0c52108a31996e764c');
            expect(mockFindOne).toHaveBeenCalled();
        });
    });

    describe('When method create is called', () => {
        test('Then collection.insertOne should be called', async () => {
            mockInsertOne.mockResolvedValue({});
            await model.create({});
            expect(mockInsertOne).toHaveBeenCalled();
        });
    });

    describe('When method update is called', () => {
        test('Then collection.findOneAndUpdate should be called', async () => {
            mockFindOneAndUpdate.mockResolvedValue({});
            await model.update('62b4ad0c52108a31996e764c', {});
            expect(mockFindOneAndUpdate).toHaveBeenCalled();
        });
    });
    describe('When method delete is called', () => {
        test('Then collection.findOneAndDelete should be called', async () => {
            mockFindOneAndDelete.mockResolvedValue({ value: {} });
            await model.delete('62b4ad0c52108a31996e764c');
            expect(mockFindOneAndDelete).toHaveBeenCalled();
        });
        test('Then collection.findOneAndDelete should be called and return status 404', async () => {
            mockFindOneAndDelete.mockResolvedValue({ value: null });
            await model.delete('62b4ad0c52108a31996e764c');
            expect(mockFindOneAndDelete).toHaveBeenCalled();
        });
    });
});
