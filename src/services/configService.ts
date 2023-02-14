import httpService from "./httpService"


class config {

    errors: string[] = [];
    constructor() { }
    initialize() {
        httpService.get<string[]>("/assets/error-codes").then((res) => this.errors = res)
    }

}
export default new config()