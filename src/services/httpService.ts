import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    validateStatus: function (status) {
        console.log("status :", status)
        //TODO check statuses and if unauth then logout it
        return true
    }
});
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('moniestoToken')}`;
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    //TODO show toast if response has code

    console.log("response :", response)
    return response;
}, function (error) {
    //TODO show toast if response has code

    console.log("error :", error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
// instance.interceptors.request.use(function () {/*...*/});

class http {
    constructor() {

    }
    get(url: string, params?: {}) {
        return instance.get(url, params)
    }
    post<Type>(url: string, params?: {}): Promise<Type> {
        return instance.post(url, params) 
    }
    put(url: string, params?: {}) {
        return instance.put(url, params)
    }
    delete(url: string, id: string) {
        return instance.delete(`${url}/${id}`)
    }
}

export default new http()