import api from "./api";
class config {
    errors: string[] = [];
    initialize() {
        api.asset.error_codes().then((res) => this.errors = res)
    }

}
export default new config()