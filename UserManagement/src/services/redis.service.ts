import { UserApp } from "../bootstrap/app";

class RedisStorage {
  constructor(public userApp = new UserApp()) {}
  async insertKeyInRedis(key: string, value: any) {
    try {
      if (!key || !value) return {};
      console.log(key, value);
      value = JSON.stringify(value);
      const result = await this.userApp.client.set(key, value);
      return result;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async getKeyFromRedis(key: string) {
    try {
      if (!key) return;
      const result:any = await this.userApp.client.get(key);
      return JSON.parse(result);
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async deleteKeyFromRedis(key: string) {
    try {
      if (!key) return;
      const result = await this.userApp.client.del(key);
      return result;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}

export const redisStorage = new RedisStorage();
