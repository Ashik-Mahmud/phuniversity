import { BaseApi } from "../../api/BaseApi";

const authApi = BaseApi.injectEndpoints({
    endpoints: (builders) => ({
        onLogin: builders.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo
            }),
            invalidatesTags: ['getMe']
        }),

        changePassword: builders.mutation({
            query: (pwdInfo) => ({
                url: "/auth/change-password",
                method: "POST",
                body: pwdInfo
            }),
        }),

        forgetPassword: builders.mutation({
            query: (userInfo) => ({
                url: "/auth/forget-password",
                method: "POST",
                body: userInfo
            }),
        }),

        resetPassword: builders.mutation({
            query: (userInfo) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: userInfo
            }),
        })
    })
})


export const { useOnLoginMutation, useChangePasswordMutation, useForgetPasswordMutation, useResetPasswordMutation } = authApi
export default authApi;