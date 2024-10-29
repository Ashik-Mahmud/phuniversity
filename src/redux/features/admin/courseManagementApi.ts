import { BaseApi } from "../../api/BaseApi";

const courseManagementApi = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (body) => ({
                url: `/courses/create-course`,
                method: 'POST',
                body,
            })
        }),

        getAllCourses: builder.query({
            query: (params) => ({
                url: `/courses`,
                method: 'GET',
                params,
            })
        }),

        getSingleCourse: builder.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'GET',

            })
        }),

        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'DELETE',

            })
        }),


        updateCourse: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.id}`,
                method: 'PATCH',
                body: data.body
            })
        }),

        assignFaculty: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.id}/assign-faculties`,
                method: 'PUT',
                body: data.body
            })
        }),


        getCourseFaculties: builder.query({
            query: (data) => ({
                url: `/courses/${data.id}/get-faculties`,
                method: 'GET',
                params: data.params,
            })
        }),

        removeFaculties: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}/remove-faculties`,
                method: 'DELETE',

            })
        }),
    })
})


export const { useCreateCourseMutation } = courseManagementApi;