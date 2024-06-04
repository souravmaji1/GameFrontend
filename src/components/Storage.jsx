import { createClient } from 'redis';

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.log('Redis Client Error', err));

export async function initRedisClient() {
    await client.connect();
}

export class TonConnectStorage {
    constructor(chatId) {
        this.chatId = chatId;
    }

    getKey(key) {
        return this.chatId.toString() + key;
    }

    async removeItem(key) {
        await client.del(this.getKey(key));
    }

    async setItem(key, value) {
        await client.set(this.getKey(key), value);
    }

    async getItem(key) {
        return (await client.get(this.getKey(key))) || null;
    }
}
