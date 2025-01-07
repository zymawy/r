import { addToQueue } from './services/queueManager';

// let's have some exmaple just have POC 
const csvFiles = ['./data/file1.csv', './data/file2.csv'];

(async () => {
    for (const filePath of csvFiles) {
        await addToQueue(filePath);
    }
    console.log('CSV files added to queue');
})();