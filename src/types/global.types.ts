import { BaseQueryApi } from "@reduxjs/toolkit/query";

type Meta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}
export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};

export interface IResponse<T> {
    error?: TError;
    success: boolean;
    message: string;
    meta?: Meta,
    data?: T;
}

export type TResponseRedux<T> = IResponse<T> & BaseQueryApi;