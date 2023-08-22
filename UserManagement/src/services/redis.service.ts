import { UserApp } from "../bootstrap/app";

class RedisStorage {
  async insertKeyInRedis(key: string, value: any) {
    try {
      if (!key || !value) return {};
      console.log(key, value);
      value = JSON.stringify(value);
      const result = await UserApp.client.set(key, value);
      return result;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async getKeyFromRedis(key: string) {
    try {
      if (!key) return;
      const result: any = await UserApp.client.get(key);
      return JSON.parse(result);
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async deleteKeyFromRedis(key: string) {
    try {
      if (!key) return;
      const result = await UserApp.client.del(key);
      return result;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}

export const redisStorage = new RedisStorage();
