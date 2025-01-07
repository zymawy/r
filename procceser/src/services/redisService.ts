import Redis from 'ioredis';

export class RedisService {
    private client: Redis;

    constructor() {
        this.client = new Redis();
    }

    async set(key: string, value: object | string, expirationSeconds: number): Promise<void> {
        const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
        await this.client.set(key, valueToStore, 'EX', expirationSeconds);
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}