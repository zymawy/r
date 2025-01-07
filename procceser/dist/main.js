"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queueManager_1 = require("./services/queueManager");
// let's have some exmaple just have POC 
const csvFiles = ['./data/file1.csv', './data/file2.csv'];
(async () => {
    for (const filePath of csvFiles) {
        await (0, queueManager_1.addToQueue)(filePath);
    }
    console.log('CSV files added to queue');
})();
