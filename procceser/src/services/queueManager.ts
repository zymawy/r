import Queue from 'bull';
import { processCsv } from '../processors/streamProcessor';
import milliseconds from "milliseconds";

const scheduler = new Queue('scheduler_users', { redis: { host: '127.0.0.1', port: 6378 //6379 
} });

export async function addToQueue(filePath: string): Promise<void> {
    console.log('Adding Files ' + filePath)
    const job = await scheduler.add(
        { filePath }, { 
            attempts: 3, 
            backoff: 5000,
            delay: milliseconds.seconds(4) // if you wanna runn it instantly just comment out this line
        });

    console.log(`Job added to queue: ${job.id}, File: ${filePath}`);

}

scheduler.process(async (job, done) => {
    const { filePath } = job.data;
    console.log(`Processing file from queue: ${filePath}`);
    await processCsv(filePath);
    console.log(`Completed file: ${filePath}`);
    done()
});