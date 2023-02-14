import jwt_decode from "jwt-decode";

export type StorageState = {
    theme_mode: ThemeMode,
    token: string,
}

export const emptyStorage: StorageState = {
    theme_mode: "light",
    token: ""
}
export type DecodeToken = {
    id: string
    user: {
        username: string
        id: string
    },
    issued_at: string
    expired_at: string
}
export type ThemeMode = "light" | "dark"

class localStorageService {

    private storage: StorageState = emptyStorage;

    constructor() {
        const data = localStorage.getItem("moniesto-local");
        if (!data) localStorage.setItem("moniesto-local", JSON.stringify(emptyStorage))
        else this.storage = JSON.parse(data)
    }
    getStorage() {
        return this.storage;
    }
    setStorage(_storage: StorageState) {
        localStorage.setItem("moniesto-local", JSON.stringify(_storage))
    }
    async getDecodedToken(): Promise<DecodeToken> {
        return new Promise(async (resolve, reject) => {
            let decoded: DecodeToken = {
                id: "",
                user: {
                    username: "",
                    id: ""
                },
                issued_at: "",
                expired_at: ""
            };
            try {
                decoded = await jwt_decode(this.getStorage().token) as DecodeToken
            } catch (error) {
                console.error(error)
            }
            resolve(decoded)

        })

    }
}

export default new localStorageService()