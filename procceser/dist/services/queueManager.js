"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToQueue = addToQueue;
const bull_1 = __importDefault(require("bull"));
const streamProcessor_1 = require("../processors/streamProcessor");
const milliseconds_1 = __importDefault(require("milliseconds"));
const scheduler = new bull_1.default('scheduler_users', { redis: { host: '127.0.0.1', port: 6378 //6379 
    } });
async function addToQueue(filePath) {
    console.log('Adding Files ' + filePath);
    const job = await scheduler.add({ filePath }, {
        attempts: 3,
        backoff: 5000,
        delay: milliseconds_1.default.seconds(4) // if you wanna runn it instantly just comment out this line
    });
    console.log(`Job added to queue: ${job.id}, File: ${filePath}`);
}
scheduler.process(async (job, done) => {
    const { filePath } = job.data;
    console.log(`Processing file from queue: ${filePath}`);
    await (0, streamProcessor_1.processCsv)(filePath);
    console.log(`Completed file: ${filePath}`);
    done();
});
