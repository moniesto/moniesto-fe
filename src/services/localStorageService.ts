export type StorageState = {
    theme_mode: ThemeMode,
    token: string,
}

export const emptyStorage: StorageState = {
    theme_mode: "light",
    token: ""
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
}

export default new localStorageService()