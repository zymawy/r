"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCsv = processCsv;
const fs_1 = require("fs");
const promises_1 = require("stream/promises");
const stream_1 = require("stream");
const csv_parser_1 = __importDefault(require("csv-parser"));
const database_1 = __importDefault(require("../database"));
const User_1 = __importDefault(require("../database/models/User"));
async function processCsv(filePath) {
    const transformStream = new stream_1.Transform({
        objectMode: true,
        highWaterMark: 10,
        async transform(row, encoding, callback) {
            const transaction = await database_1.default.transaction(); // Start a transaction
            try {
                // we might doe some valdatoin here before we procced ... 
                const exists = await User_1.default.findOne({ where: { id: row.id }, transaction });
                if (exists) {
                    console.log(`Row already processed: ${row.id}`);
                    callback(null, row);
                    await transaction.rollback();
                    return;
                }
                await User_1.default.create({ id: row.id, name: row.name, age: row.age }, { transaction });
                // const m = JSON.stringify(row)
                console.log(`Saved row:`, row);
                await transaction.commit();
                callback(null, row);
            }
            catch (error) {
                // lets hnadle the failures 
                console.error(`Error saving row:`, error);
                callback(null, error);
            }
        },
    });
    try {
        await (0, promises_1.pipeline)((0, fs_1.createReadStream)(filePath), // let's handle back pressure 
        (0, csv_parser_1.default)(), transformStream);
        console.log(`Finished processing: ${filePath}`);
    }
    catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}
