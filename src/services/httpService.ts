import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { Dispatch } from "react";
import { setUser } from "../store/slices/userSlice";
import { emptyUser } from "../interfaces/user";
import localStorageService from "./localStorageService";
import toastService from "./toastService";
import configService from "./configService";
import { setToken } from "../store/slices/localStorageSlice";
import { setInMaintenance } from "../store/slices/globalSlice";
import { API_URL } from "./environment";

class http {
  private dispatch!: Dispatch<AnyAction>;
  private instance!: AxiosInstance;
  private BASE_URL = API_URL;
  constructor() {
    this.createInstance(localStorageService.getStorage().token);
  }
  get<Type>(url: string, params?: {}): Promise<Type> {
    return this.instance.get(url, { params });
  }
  post<Type>(url: string, params?: {}): Promise<Type> {
    return this.instance.post(url, params);
  }
  patch<Type>(url: string, params?: {}): Promise<Type> {
    return this.instance.patch(url, params);
  }
  put<Type>(url: string, params?: {}): Promise<Type> {
    return this.instance.put(url, params);
  }
  delete<Type>(url: string, id: string): Promise<Type> {
    return this.instance.delete(`${url}/${id}`);
  }
  setDispatch(dispatch: Dispatch<AnyAction>) {
    this.dispatch = dispatch;
  }
  createInstance(token: string) {
    this.instance = axios.create({
      baseURL: this.BASE_URL,
      validateStatus: (status) => {
        return status >= 200 && status < 400;
      },
    });

    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    this.instance.interceptors.response.use(
      (response) => {
        return Promise.resolve(response.data);
      },
      (error) => {
        const Maintenance_Code = "General_Maintenance";
        const code = error?.response?.data?.error_code;
        if (!code) {
          return Promise.reject("no error code");
        }
        if (Maintenance_Code === code) {
          this.dispatch(setInMaintenance(true));
          return Promise.reject(error?.response?.data);
        }

        const message = configService.translatedErrors.includes(code)
          ? "server.error." + code
          : (configService.configs.error_codes[code] as string);

        toastService.open({ severity: "error", message });

        if (error.response.status === 401) {
          this.dispatch(setUser(emptyUser));
          this.dispatch(setToken(""));
        }

        return Promise.reject(error?.response?.data);
      }
    );
  }
}

export default new http();
