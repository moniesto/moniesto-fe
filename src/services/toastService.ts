import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { openToast, ToastState } from "../store/slices/toastSlice";

class toast {
    private dispatch!: Dispatch<AnyAction>;
    constructor() { }
    setDispatch(dispatch: Dispatch<AnyAction>) {
        this.dispatch = dispatch
    }
    open(params: ToastState) {
        this.dispatch(openToast(params))
    }

}
export default new toast()