import { log } from 'console';
import Redis from 'ioredis';
import Redlock, { Lock } from 'redlock';

const redis = new Redis(); 
// let's get going and use redlock where we lock any proccessed request 
const redlock = new Redlock([redis], {
    retryCount: 3,
    retryDelay: 200,
    retryJitter: 50,
});

export class LockService {
    private readonly expirationMilliseconds: number;

    constructor(expirationMilliseconds = 60000) {
        this.expirationMilliseconds = expirationMilliseconds;
    }

    /**
     * Acquire a distributed lock for a specific key.
     * Returns the lock object if successful, otherwise null.
     */
    async acquireLock(key: string): Promise<Lock | null> {
        try {
            const lock = await redlock.acquire([`locks:${key}`], this.expirationMilliseconds);
            return lock;
        } catch (err) {
            if (err instanceof Error) {
                if (err.name === 'ExecutionError') {
                    console.error(`Failed to acquire lock for key: ${key} - Quorum not achieved`);
                } else {
                    console.error(`Failed to acquire lock for key: ${key} - ${err.message}`);
                }
            }
            return null;
        }
    }

    /**
     * Release a distributed lock.
     */
    async releaseLock(lock: Lock): Promise<void> {
        try {
            await lock.release();
        } catch (err) {
            console.error(`Failed to release lock`, err);
        }
    }

    /**
     * Check if an idempotency key exists in Redis.
     * Returns the cached response if the key exists.
     */
    async checkIdempotencyKey(key: string): Promise<string | null> {
        return await redis.get(`idempotency:${key}`);
    }

    /**
     * Save an idempotency key and response to Redis.
     */
    async saveIdempotencyKey(key: string, response: object): Promise<void> {
        await redis.set(
            `idempotency:${key}`,
            JSON.stringify(response),
            'EX',
            this.expirationMilliseconds / 1000 // Convert to seconds for Redis
        );
    }
}