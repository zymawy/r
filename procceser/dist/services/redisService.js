"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisService {
    constructor() {
        this.client = new ioredis_1.default();
    }
    async set(key, value, expirationSeconds) {
        const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
        await this.client.set(key, valueToStore, 'EX', expirationSeconds);
    }
    async get(key) {
        return await this.client.get(key);
    }
    async del(key) {
        await this.client.del(key);
    }
}
exports.RedisService = RedisService;
