import { BaseApi } from "../../api/BaseApi";

const usersApi = BaseApi.injectEndpoints({
    endpoints: (builders) => ({

        createStudent: builders.mutation({
            query: (body) => ({
                url: "/users/create-student/",
                method: "POST",
                body
            })
        }),

        createFaculty: builders.mutation({
            query: (body) => ({
                url: "/users/create-faculty/",
                method: "POST",
                body
            })
        }),




        createAdmin: builders.mutation({
            query: (body) => ({
                url: "/users/create-admin/",
                method: "POST",
                body
            })
        }),

        getMe: builders.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ['getMe']
        }),

        changeUserStatus: builders.mutation({
            query: (body) => ({
                url: `/users/change-status/${body.id}`,
                method: "GET",
                body: body.body
            }),
        }),
    })
})


export const { useCreateStudentMutation, useGetMeQuery, useCreateAdminMutation, useCreateFacultyMutation, useChangeUserStatusMutation } = usersApi;