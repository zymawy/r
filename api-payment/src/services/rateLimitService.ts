import Redis from 'ioredis';

const redis = new Redis();

export class RateLimitService {
    private readonly windowSeconds: number;
    private readonly maxRequests: number;

    constructor(windowSeconds = 60, maxRequests = 10) {
        this.windowSeconds = windowSeconds;
        this.maxRequests = maxRequests;
    }

    async isRateLimited(key: string): Promise<boolean> {
        const redisKey = `rate_limit:${key}`;
        const currentCount = await redis.incr(redisKey);

        if (currentCount === 1) {
            // let check If this is the first request, set the expiration time
            await redis.expire(redisKey, this.windowSeconds);
        }

        return currentCount > this.maxRequests;
    }

    async getRemainingRequests(key: string): Promise<number> {
        const redisKey = `rate_limit:${key}`;
        const currentCount = await redis.get(redisKey);
        return this.maxRequests - (parseInt(currentCount || '0', 10));
    }
}