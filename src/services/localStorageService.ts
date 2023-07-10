import jwt_decode from "jwt-decode";

export type StorageState = {
  theme_mode: ThemeMode;
  token: string;
  language: string;
};

export const emptyStorage: StorageState = {
  theme_mode: "light",
  token: "",
  language: "en",
};
export type DecodeToken = {
  id: string;
  user: {
    username: string;
    id: string;
  };
  issued_at: string;
  expired_at: string;
};
export type ThemeMode = "light" | "dark";

class localStorageService {
  private storage_key: string = "moniesto-local";
  private storage: StorageState = emptyStorage;

  getStorage() {
    const data = localStorage.getItem(this.storage_key);
    if (!data) {
      localStorage.setItem(this.storage_key, JSON.stringify(emptyStorage));
      this.storage = emptyStorage;
    } else this.storage = JSON.parse(data);
    return this.storage;
  }
  setStorage(_storage: StorageState) {
    localStorage.setItem(this.storage_key, JSON.stringify(_storage));
  }
  async getDecodedToken(): Promise<DecodeToken> {
    return new Promise(async (resolve, reject) => {
      let decoded: DecodeToken = {
        id: "",
        user: {
          username: "",
          id: "",
        },
        issued_at: "",
        expired_at: "",
      };
      try {
        decoded = (await jwt_decode(this.getStorage().token)) as DecodeToken;
      } catch (error) {
        reject(error);
      }
      resolve(decoded);
    });
  }
}

export default new localStorageService();
