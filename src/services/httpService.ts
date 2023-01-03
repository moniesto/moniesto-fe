import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios"
import { Dispatch } from "react";
import { setUser } from "../store/slices/userSlice";
import { emptyUser } from "../interfaces/user";
import localStorageService from "./localStorageService";
import { openToast } from "../store/slices/toastSlice";
import { ErrorCodes } from "./error_codes";


// export const instance = axios.create({
//     baseURL: 'http://localhost:8080/',
//     validateStatus: (status) => {
//         console.log("status :", status)
//         //TODO check statuses and if unauth then logout it
//         return status >= 200 && status < 400;
//     }
// });

// instance.defaults.headers.common['Authorization'] = `Bearer ${authService.getToken()}`;
// instance.interceptors.response.use((response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data

//     //TODO show toast if response has code

//     console.log("response :", response)
//     return Promise.resolve(response.data);
// }, (error) => {
//     //TODO show toast if response has code
//     if (error.response.status === 401) authService.logOut()

//     console.log("error :", error)
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error

//     return Promise.reject(error.response.data);
// });
// instance.interceptors.request.use(function () {/*...*/});

class http {
    private dispatch!: Dispatch<AnyAction>;
    private instance!: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:8080/',
            validateStatus: (status) => {
                return status >= 200 && status < 400;
            }
        });

        this.instance.defaults.headers.common['Authorization'] = `Bearer ${localStorageService.getStorage().token}`;
        this.instance.interceptors.response.use((response) => {
            console.log("response :", response)
            return Promise.resolve(response.data);
        }, (error) => {
            console.log("error :", error)
            const code = error.response.data.error_code;
            this.dispatch(openToast({ props: { severity: "error", message: ErrorCodes[code] } }))
            if (error.response.status === 401) this.dispatch(setUser(emptyUser))

            return Promise.reject(error.response.data);
        });

    }
    get(url: string, params?: {}) {
        return this.instance.get(url, params)
    }
    post<Type>(url: string, params?: {}): Promise<Type> {
        return this.instance.post(url, params)
    }
    put(url: string, params?: {}) {
        return this.instance.put(url, params)
    }
    delete(url: string, id: string) {
        return this.instance.delete(`${url}/${id}`)
    }
    setDispatch(dispatch: Dispatch<AnyAction>) {
        this.dispatch = dispatch
    }
}

export default new http()